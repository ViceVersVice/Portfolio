import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, BaseDiv, StyledCloseButton, BaseSpan, BaseIcon} from '../base/styledComponents.js';
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


const SKillLevelBadge = (props) => {
    const badgeProps = {
        fontFamily: "'Coda Caption', sans-serif",
        fontSize: props.trackedSize > 0 ? `${props.trackedSize / 20}px` : '20px',
        padding: '2%',
        borderRadius: '15px',
        background: `linear-gradient(0deg, ${props.levelColor}, white)`,
        border: '0.1px solid #d2ebab'
    }

    return <BaseSpan {...badgeProps}>{props.skillLevel}</BaseSpan>
}


class SkillCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {highlight: false, skillDescriptionWidth: 0};
        this.togglePopup = this.togglePopup.bind(this);
        this.highlightCard = this.highlightCard.bind(this);
        this.unHighlightCard = this.unHighlightCard.bind(this);
        this.skillData = props.skillData;
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
        return {
           borderStyle: '0.2rem solid #d8e1f4',
           borderRadius: '5px',
           justifyContent: 'space-evenly', 
           flex: '1',
           boxShadow: this.state.highlight ? '20px 20px 4px 1px #e5e5e5': '10px 10px 4px 1px #e5e5e5',
           onClick: this.togglePopup,
           onMouseEnter: this.highlightCard,
           onMouseLeave: this.unHighlightCard,
           ref: this.props.trackSizeRef,
        };
    };

    render() {
        const truncatedDescription = `${this.skillData.description.slice(0, 160)}...`
        const trackedSize = this.props.trackedSize
        const nameFontSize = trackedSize > 0 ? `${trackedSize / 15}px` : '30px'

        return (
            <StyledFlexCardInlineRow {...this.getProps()}>
                <StyledFlexInlineRow flexDirection={'column'} justifyContent={'space-evenly'} flex={'1'}>
                    <StyledFlexInlineRow flex={'1'} justifyContent={"space-between"} margin={'0% 0% 2% 0%'} padding={'3%'}>
                        <BaseSpan fontFamily={"'Coda Caption', sans-serif"} fontSize={nameFontSize} fontWeight={'bold'}>
                            {this.skillData.name}
                        </BaseSpan>
                        <SKillLevelBadge skillLevel={this.skillData.level} levelColor={this.skillData.levelColor} trackedSize={trackedSize} />
                    </StyledFlexInlineRow>
                    <StyledFlexInlineRow  flex={'5'} justifyContent={'space-evenely'} borderRadius={'10px'} margin={'0% 2% 0% 2%'}>
                        <StyledSkillCardImage src={this.skillData.image}></StyledSkillCardImage>
                        <SkillDescripton margin={'5%'} characteristics={this.skillData.characteristics}>{truncatedDescription}</SkillDescripton>
                    </StyledFlexInlineRow>
                    {/* Abusing box-shadow to create borders....*/}
                    <StyledFlexInlineRow flex={'1'} justifyContent={'flex-start'}>
                        <GenericButton margin={'2% 0% 2% 3%'} display={'inline-flex'} buttonImage={`${staticFolderUrl}icons/comment.svg`}><b>{this.skillData.commentsCount || 0}</b> Comments</GenericButton>
                    </StyledFlexInlineRow>
                </StyledFlexInlineRow>
            </StyledFlexCardInlineRow>
        );
    }
}


const TrackedSizeSkillCard = SizeTrackerHoc(SkillCard)


const SkillDescripton = SizeTrackerHoc(
    (props) => {
        const fontSize = props.trackedSize > 0 ? props.trackedSize / 20: 20;
        
        const containerProps_ = {
            ref: props.trackSizeRef,
            width: '100%',
            paddingLeft: '10px',
            ...props
        }

        const textProps = {
            marginBlockStart: '0em',
            fontSize: `${Math.max(fontSize, 10)}px`,
            ...props
        }

        return(
            <BaseDiv key={1} {...containerProps_}>
                <StyledSkillCardText {...textProps}></StyledSkillCardText>
            </BaseDiv>
        )
    }
);


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

    getPopup() {
        const closePopupButtonProps = {
            display: 'inline-flex', 
            alignSelf: 'center', 
            marginRight: '2%',
            onClick: this.closePopup, 
        }

        const closePopupButton = <StyledCloseButton {...closePopupButtonProps}></StyledCloseButton>
        
        const popupProps = {
            data: this.state.popupData,
            key: this.state.data.length + 1,
            closeButton: closePopupButton,
        }

        return <SkillPopup {...popupProps}></SkillPopup>
    }
        
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
                let columns = rowData.map(
                    (skillData, i) => {
                        return(                         
                            <TrackedSizeSkillCard skillData={skillData} onClick={this.togglePopup} key={rowNumber * this.maxElementsInRow + i} />
                        )
                    }
                )
                
                if (rowNumber + 1 == maxRowsCount && rowData.length < this.maxElementsInRow) {
                    let blanksCount = this.maxElementsInRow - rowData.length;
                    columns.push(this.getBlankColumns(skillsListLength, blanksCount));
                };
                
                rows.push(
                    <BaseDiv minHeight={'300px'} key={rowNumber} display={'flex'}>
                        {columns}
                    </BaseDiv>
                );
            };

            if (this.state.showPopup) {
                rows.push(this.getPopup.bind(this)())
            };
            rows.push(endOfPage);
            return rows
        };
    };
};


const BlackDiv = (props) => {
    return <BaseDiv backgroundColor={'black'} borderRadius={'2px'} {...props}></BaseDiv>
}


const TableFormatButtonContainer = (props) => {
    const columns_ = props.columnsNumber;
    const rows_ = columns_;
    const smallCubesSize = 16 / rows_;
    const columns = [...Array(columns_)].map((val, n) => <BlackDiv key={n} margin={'1px'} width={`${smallCubesSize}px`} height={`${smallCubesSize}px`}></BlackDiv>)
    const rows = [...Array(rows_)].map(
        (val, n) => (
            <StyledFlexInlineRow key={n} margin={'0.5px'} justifyContent={'center'} alignItems={'center'}>
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
        width: '40px',
        height: '40px',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '1%',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'solid 0.5px',
        onMouseEnter: highlightElement, 
        onMouseLeave: unHighlightElement,
        ...props
    } 
    return <StyledFlexInlineRow onClick={changeTableFormat} {...props_}>{rows}</StyledFlexInlineRow>
}


const SkillTableWithTableFormat = (props) => {
    const [TableFormat, setTableFormat] = useState(3);
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
                <TableFormatButtonContainer parentOnClick={changeTableFormat} columnsNumber={2} backgroundColor={TableFormat == 2 ? '#acc2e4' : 'white'}></TableFormatButtonContainer> 
                <TableFormatButtonContainer parentOnClick={changeTableFormat} columnsNumber={3} backgroundColor={TableFormat == 3 ? '#acc2e4' : 'white'}></TableFormatButtonContainer> 
                <TableFormatButtonContainer parentOnClick={changeTableFormat} columnsNumber={4} backgroundColor={TableFormat == 4 ? '#acc2e4' : 'white'}></TableFormatButtonContainer> 
            </StyledRow>
            <EndlessTable tableFormat={TableFormat}></EndlessTable>
        </>
    );
};



export { SkillTableWithTableFormat };
