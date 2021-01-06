import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, BaseDiv, StyledCloseButton} from './styledComponents.js';
import {SkillPopup} from './skillPopup.js';
import {GenericButton} from './genericButton.js';
import {EndlessPaginationHoc} from './endlessPagination.js';
import {SizeTrackerHoc} from './sizeTracker.js';
import {baseUrl, skillApiBaseNameUrl, staticFolderUrl} from '../base/baseUrls.js';


class EndOfPage extends React.Component {
    render() {
        let isVisible = this.props.dataIsLoading ? 'visible': 'hidden';
        return ReactDOM.createPortal(
            <StyledEndOfPage ref={this.props.innerRef} isVisible={isVisible}>
                <h1>Loading data.....</h1>
                <img src={`${staticFolderUrl}/gifs/load1.svg`}></img>
            </StyledEndOfPage>, document.body);
    };
};


const EndOfPageRef = React.forwardRef((props, ref) => {
    return <EndOfPage {...props} innerRef={ref}></EndOfPage>
})


class SkillCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: false, skillDescriptionWidth: 0};
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
           boxShadow: boxIncreaseShadow,
           overflow: 'hidden',
           onClick: this.togglePopup,
           onMouseEnter: this.highlightCard,
           onMouseLeave: this.unHighlightCard,
        };
    };

    render() {
        return (
            <StyledFlexCardInlineRow {...this.getProps()}>
                {this.props.children}
            </StyledFlexCardInlineRow>
        );
    }
}



const BlackDiv = (props) => {
    return <BaseDiv backgroundColor={'black'} {...props}></BaseDiv>
}


const TableFormatButtonContainer = (props) => {
    const columns_ = props.columnsNumber;
    const rows_ = columns_;
    const smallCubesSize = 24 / rows_;
    const columns = [...Array(columns_)].map((val, n) => <BlackDiv key={n} width={`${smallCubesSize}px`} height={`${smallCubesSize}px`}></BlackDiv>)
    const rows = [...Array(rows_)].map(
        (val, n) => (
            <StyledFlexInlineRow key={n} justifyContent={'space-around'} alignItems={'center'}>
                {columns}
            </StyledFlexInlineRow>
            )
        )
    const element = React.useRef(null);

    const changeTableFormat = (e) => {
        props.parentOnClick(rows_)
    }

    const highlightElement = (e) => {
        if(element.current) {
            element.current.style.background = 'white';
            element.current.style.boxShadow = '5px 5px 5px #bdd0f2';
        }
    }
    
    const unHighlightElement = (e) => {
        if(element.current) {
            element.current.style.background = '';
            element.current.style.boxShadow = '';
        }
    }

    const props_ = {
        ref: element,
        width: '50px',
        height: '50px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: '1%',
        cursor: 'pointer',
        onMouseEnter: highlightElement, 
        onMouseLeave: unHighlightElement,
        ...props
    } 
    return <StyledFlexInlineRow onClick={changeTableFormat} {...props_}>{rows}</StyledFlexInlineRow>
} 


const SkillTableWithTableFormat = (props) => {
    const [TableFormat, setTableFormat] = useState(2);
    const [itemsPerPage, setItemsPerPage] = useState(TableFormat * 2)

    const EndlessTable = EndlessPaginationHoc(SkillTable, `${baseUrl}/${skillApiBaseNameUrl}`, EndOfPageRef, itemsPerPage)

    const changeTableFormat = (newTableformat) => {
        if(newTableformat != TableFormat){ 
            setTableFormat(newTableformat)
            setItemsPerPage(newTableformat * 2)   
        }
    };

    return (
        <>
            <StyledRow>
                <TableFormatButtonContainer parentOnClick={changeTableFormat} columnsNumber={2}></TableFormatButtonContainer> 
                <TableFormatButtonContainer parentOnClick={changeTableFormat} columnsNumber={3}></TableFormatButtonContainer> 
                <TableFormatButtonContainer parentOnClick={changeTableFormat} columnsNumber={4}></TableFormatButtonContainer> 
            </StyledRow>
            <EndlessTable tableFormat={TableFormat}></EndlessTable>
        </>
    );
};


class SkillTable extends React.Component {
    constructor(props) {
        super(props);
        // EndlessPaginationHoc refs
        this.observedElementRef = props.observedElementRef;
        this.hocRef = props.hocRef;
        
        this.state = {
            // EndlessPaginationHoc data
            data: props.apiData,
            dataIsLoading: props.dataIsLoading,
            // Own state
            showPopup: false, 
            popupData: {},
            skillDescriptionWidth: 0,
        };
        // Regulates how many cards are in one row
        this.maxElementsInRow = props.tableFormat || 2;
        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    };

    

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
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
        this.props.blockDataLoading();
        this.setState({showPopup: true, popupData: skillData});
    };

    closePopup() {
        this.props.unBlockDataLoading();
        this.setState({showPopup: false});
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
                const SkillDescriptonText = SizeTrackerHoc(
                    (props) => {
                        const textColumnRightBorder = '-25px 0px 0px -22px black'
                        const fontSize = props.trackedSize > 0 ? props.trackedSize / 20: 20;
                        return(
                            <BaseDiv key={1} ref={props.trackSizeRef} boxShadow={textColumnRightBorder} width={'100%'}>
                                <StyledSkillCardText fontSize={`${Math.max(fontSize, 10)}px`} {...props}></StyledSkillCardText>
                            </BaseDiv>
                        )
                    }
                );
                
                let columns = rowData.map(
                    (skillData, i) => {
                        const truncatedDescription = `${skillData.description.slice(0, 160)}...`
                        return(                         
                            <SkillCard skillData={skillData} onClick={this.togglePopup} key={rowNumber * this.maxElementsInRow + i}>
                                <StyledFlexInlineRow flexDirection={'column'} justifyContent={'space-evenly'} flex={'1'}>
                                    <StyledFlexInlineRow justifyContent={"space-evenely"} background={'linear-gradient(#c3d5eb, #9198e5)'} borderRadius={'10px'} margin={'2%'}>
                                        <StyledHeader marginLeft={'30px'} marginTop={'20px'}>
                                            {skillData.name}
                                        </StyledHeader>
                                    </StyledFlexInlineRow>
                                    <StyledFlexInlineRow justifyContent={'space-evenely'} background={'linear-gradient(#f0f3f7, #d8e1f4)'} borderRadius={'10px'} margin={'0% 2% 0% 2%'}>
                                        <StyledSkillCardImage src={skillData.image}></StyledSkillCardImage>
                                        <SkillDescriptonText margin={'5%'}>{truncatedDescription}</SkillDescriptonText>
                                    </StyledFlexInlineRow>
                                    {/* Abusing box-shadow to create borders....*/}
                                    <StyledFlexInlineRow justifyContent={'flex-start'}>
                                        <GenericButton margin={'2% 0% 2% 3%'} width={'30%'} buttonImage={`${staticFolderUrl}icons/comment.svg`}><b>{skillData.commentsCount || 0}</b> Comments</GenericButton>
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
                    <StyledRow key={rowNumber} margin={'0% 1% 1% 0%'}>
                        {columns}
                    </StyledRow>
                );
            };

            if (this.state.showPopup) {
                const closePopupButton = <StyledCloseButton onClick={this.closePopup} display={'inline-flex'} alignSelf={'center'} marginRight={'2%'}></StyledCloseButton>
                rows.push(<SkillPopup data={this.state.popupData} closeButton={closePopupButton} key={this.state.data.length + 1}></SkillPopup>);
            };
            rows.push(endOfPage);
            return rows;
        };
    };
};



export {SkillTableWithTableFormat};
