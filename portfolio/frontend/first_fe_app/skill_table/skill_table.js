import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, StyledCommentButton, BaseParagraph} from './styledComponents.js';
import {SkillPopup} from './skill_popup.js';
import {MainCommentForm} from './commentForms.js';
import {CommentButton} from './commentButton.js';
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl, mediaFolderUrl} from '../base/baseUrls.js';


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

const EndOfPageRef = React.forwardRef((props, ref) => <EndOfPage {...props} innerRef={ref}></EndOfPage>)


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


class SkillTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], 
            showPopup: false, 
            popupData: {},
            dataCountStart: 0,
            loadNewPage: false,
            dataIsLoading: true
        };
        this.maxElementsInRow = 2;
        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.endOfPage = React.createRef();
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
        
        if (this.endOfPage) {
            this.paginationObserver.observe(this.endOfPage);
        }
        
        this.getAPIData();
    }

    getAPIData(getNextPage) {
        // If nextPage is requested, it just adds next page data to actual data --> not refetches all data
        this.setState({ dataIsLoading: true });
        const count = 4;
        const start = getNextPage ? this.state.dataCountStart + count: this.state.dataCountStart;
        fetch(`${baseUrl}/${skillApiBaseNameUrl}/?start=${start}&count=${count}`)
            .then(response => response.json())
            .then(data => this.setState({
                data: [...this.state.data, ...data],
                dataCountStart: start,
                dataIsLoading: false
            }))
    }

    handlePaginationObserver(entities, observer) {
        // Tracks visibility of EndOfPage element and fetches additional data if EndOfPage becomes visible
        if (this.state.data.length && entities.length && entities[0].isIntersecting) {
            this.getAPIData(true);
        };
    } 

    getBlankColumns(start, blanksCount) {
        let blankColumns = [];
        
        for (let i=0; i < blanksCount; i++) {
            blankColumns.push(<BlankColumn key={start + i}></BlankColumn>);
        };

        return blankColumns;
    }

    togglePopup(skillData) {
        this.setState({showPopup: true, popupData: skillData});
    }

    closePopup() {
        this.setState({showPopup: false})
    }
        
    render () {
        let data = this.state.data
        let skillsListLength = data.length
        // Keys is must be here, and must be unique, to prevent React from re-rendering this component 
        // and fail of paginationObserver to track endOfPage position`
        const endOfPage = <EndOfPageRef key={-1} ref={endOfPage => this.endOfPage = endOfPage} dataIsLoading={this.state.dataIsLoading}></EndOfPageRef>;
        
        if (skillsListLength) {
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
        } else {
            return endOfPage;
        };

    };
};

export {SkillTable};
