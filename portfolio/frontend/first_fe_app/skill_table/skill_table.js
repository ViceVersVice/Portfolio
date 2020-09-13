import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph} from './styledComponents.js';
import {SkillPopup} from './skill_popup.js';
import {CommentButton} from './commentButton.js';
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js';


class EndOfPage extends React.Component {
    render() {
        let isVisible = this.props.dataIsLoading ? 'visible': 'hidden';
        return ReactDOM.createPortal(
            <StyledEndOfPage ref={this.props.innerRef} isVisible={isVisible}>
                <h1>Loading data.....</h1>
                <img src={`${staticFolderUrl}/gifs/loading1.gif`}></img>
            </StyledEndOfPage>, document.body);
    };
};

const EndOfPageRef = React.forwardRef((props, ref) => {
    return <EndOfPage {...props} innerRef={ref}></EndOfPage>
})


class SkillCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: false};
        this.togglePopup = this.togglePopup.bind(this);
        this.highlightCard = this.highlightCard.bind(this);
        this.unHighlightCard = this.unHighlightCard.bind(this);
    };

    togglePopup(e) {
        if (this.props.onClick) {
            const isFormRelatedTag = ['FORM', 'INPUT'].indexOf(e.target.tagName) > -1;
            if (!isFormRelatedTag) {
                this.props.onClick(this.props.skillData);
            };
        };
    };

    highlightCard(e) {
        this.setState({highlight: true});
    };

    unHighlightCard(e) {
        this.setState({highlight: false});
    };

    getProps() {
        const boxIncreaseShadow = this.state.highlight ? '20px 20px 4px 1px #e5e5e5': '10px 10px 4px 1px #e5e5e5';
        return {
           borderStyle: '0.2rem solid #d8e1f4',
           borderRadius: '5px',
           justifyContent: 'space-evenly', 
           flex: '1',
           boxShadow: boxIncreaseShadow

        };
    };

    render() {
        return (
            <StyledFlexCardInlineRow onClick={this.togglePopup} onMouseEnter={this.highlightCard} onMouseLeave={this.unHighlightCard}  {...this.getProps()}>
                {this.props.children}
            </StyledFlexCardInlineRow>
        );
    }
}


function EndlessPaginationHoc(WrappedComponent, fetchUrl, observedElementRef) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                dataCountStart: 0,
                dataIsLoading: false
            };

            this.observedElement = React.createRef(null);
            this.getAPIData = this.getAPIData.bind(this);

            this.Reffed = React.forwardRef((props, ref) => {
                const WrappedProps = {
                    ...props,
                    observedElementRef: observedElementRef,
                    apiData: this.state.data,
                    dataIsLoading: this.state.dataIsLoading
                };
                return <WrappedComponent hocRef={ref} {...WrappedProps}></WrappedComponent>
            });
        };

        getAPIData(getNextPage) {
            // If nextPage is requested, it just adds next page data to actual data --> not refetches all data
            this.setState({...this.state, dataIsLoading: true });
            const count = 4;
            const start = getNextPage ? this.state.dataCountStart + count: this.state.dataCountStart;
            fetch(`${fetchUrl}/?start=${start}&count=${count}`)
                .then(response => response.json())
                .then(data => this.setState({
                    data: [...this.state.data, ...data],
                    dataCountStart: start,
                    dataIsLoading: false
                }));
        };

        handlePaginationObserver(entities, observer) {
            // Tracks visibility of EndOfPage element and fetches additional data if EndOfPage becomes visible
            if (this.state.data.length && entities.length && entities[0].isIntersecting) {
                this.getAPIData(true);
            };
        }; 

        componentDidMount() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            };
    
            this.paginationObserver = new IntersectionObserver(
                this.handlePaginationObserver.bind(this),
                observerOptions,
            );
            
            if (this.observedElement) {
                console.log('LOL', this.observedElement, this.observedElement.current)
                this.paginationObserver.observe(this.observedElement.current);
            }
            
            this.getAPIData();
        };
        
        render() {
            return <this.Reffed ref={this.observedElement} {...this.props}></this.Reffed>
        };
    };
};


class SkillTable extends React.Component {
    constructor(props) {
        super(props);
        this.observedElementRef = props.observedElementRef;
        this.hocRef = props.hocRef;
        
        this.state = {
            // EndlessPaginationHoc data
            data: props.apiData,
            dataIsLoading: props.dataIsLoading,
            // Own state
            showPopup: false, 
            popupData: {},
        };

        this.maxElementsInRow = 2;
        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    };

    componentDidUpdate(prevProps) {
        if (this.props.apiData !== prevProps.apiData) {
            this.setState({
               data: this.props.apiData,
               dataIsLoading: this.props.dataIsLoading 
            })
        }
    }

    getBlankColumns(start, blanksCount) {
        let blankColumns = [];
        
        for (let i=0; i < blanksCount; i++) {
            blankColumns.push(<BlankColumn key={start + i}></BlankColumn>);
        };

        return blankColumns;
    };

    togglePopup(skillData) {
        this.setState({showPopup: true, popupData: skillData});
    };

    closePopup() {
        this.setState({showPopup: false})
    };
        
    render () {
        const data = this.state.data;
        const skillsListLength = data.length;
        // Keys is must be here, and must be unique, to prevent React from re-rendering this component 
        // and fail of paginationObserver to track endOfPage position`
        const ObservedElement = this.observedElementRef;
        const endOfPage = <ObservedElement key={-1} ref={this.hocRef} dataIsLoading={this.state.dataIsLoading}></ObservedElement>;
        
        if (!skillsListLength) {
            return endOfPage;
        } else {
            let maxRowsCount = Math.floor(skillsListLength / this.maxElementsInRow) + 1;
            let rows = [];

            for (let rowNumber=0; rowNumber < (maxRowsCount); rowNumber++) {
                let start = rowNumber * this.maxElementsInRow;
                let end = (rowNumber + 1) * this.maxElementsInRow;
                let rowData = data.slice(start, end);
                let textColumnRightBorder = '-25px 0px 0px -22px black'
                let columns = rowData.map(
                    (skillData, i) => {
                        const truncatedDescription = `${skillData.description.slice(0, 80)}...`
                        return(                         
                            <SkillCard skillData={skillData} onClick={this.togglePopup} key={rowNumber * this.maxElementsInRow + i}>
                                <StyledFlexInlineRow flexDirection={'column'} justifyContent={'space-evenly'}>
                                    <StyledFlexColumn backgroundColor={'#f9f9f9'} margin-right={'0'}>
                                        <StyledHeader marginLeft={'30px'} marginTop={'20px'}>
                                            {skillData.name}
                                        </StyledHeader>
                                    </StyledFlexColumn>
                                    <StyledFlexInlineRow justifyContent={'space-around'} flexGrow={'4'}>
                                        <StyledSkillCardImage src={skillData.image}></StyledSkillCardImage>
                                        <StyledFlexColumn key={1} boxShadow={textColumnRightBorder}>
                                            <StyledSkillCardText marginTop={'20px'} marginLeft={'10px'} fontSize={'20px'}>{truncatedDescription}</StyledSkillCardText>
                                        </StyledFlexColumn>
                                    </StyledFlexInlineRow>
                                    {/* Abusing box-shadow to create borders....*/}
                                    <StyledFlexInlineRow justifyContent={'flex-start'} boxShadow={'-1px -36px 0px -33px black'}>
                                        <CommentButton margin={'5% 0% 10% 5%'}><b>{this.props.commentsCount || 0}</b> Comments</CommentButton>
                                    </StyledFlexInlineRow>
                                </StyledFlexInlineRow>
                            </SkillCard>

                        )
                    }
                )
                
                if (rowNumber + 1 == maxRowsCount && rowData.length < this.maxElementsInRow) {
                    let blanksCount = this.maxElementsInRow - rowData.length;
                    columns.push(this.getBlankColumns(skillsListLength, blanksCount));
                };
                
                rows.push(
                    <StyledRow key={rowNumber} margin={'5%'}>
                        {columns}
                    </StyledRow>
                );
            };

            if (this.state.showPopup) {
                const closePopupButton = <button onClick={this.closePopup}>Close</button>;
                rows.push(<SkillPopup data={this.state.popupData} closeButton={closePopupButton} key={this.state.data.length + 1}></SkillPopup>);
            };
            rows.push(endOfPage);
            return rows;
        };
    };
};

const EndlessTable = EndlessPaginationHoc(SkillTable, `${baseUrl}/${skillApiBaseNameUrl}`, EndOfPageRef)


export {EndlessTable};
