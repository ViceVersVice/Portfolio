import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, BlankColumn, StyledSkillCardText, 
        StyledEndOfPage, StyledSkillCardImage, StyledHeader, BaseDiv, StyledCloseButton, BaseSpan, BaseIcon} from './styledComponents.js';
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


const CharacteristicLevels = (props) => {
    // Characteristics level as stars
    const { characteristics, trackedSize } = props
    const fontSize = trackedSize > 0 ? trackedSize / (props.sizeCoefficient || 15) : 20;
    
    const charsList = characteristics.map(
        (characteristic, i) => {
            const starLevel = []
            const maxStars = 5
            
            for (let stars=0; stars < maxStars; stars++){
                const starProps = {
                    key: stars,
                    color: '#ff6200',
                    fontSize: `${Math.max(fontSize, 10)}px`
                }

                if(stars < characteristic.level) {
                    starLevel.push(<BaseIcon className={"fas fa-star"} {...starProps}></BaseIcon>)
                } else {
                    starLevel.push(<BaseIcon className={"far fa-star"} {...starProps}></BaseIcon>)
                }
            }
            
            return(
                <BaseDiv display={'inline-flex'} justifyContent={'space-between'} key={i}>
                    <BaseSpan fontSize={`${Math.max(fontSize, 10)}px`}>{characteristic.name}</BaseSpan>
                    <BaseDiv marginLeft={'10px'}>{starLevel}</BaseDiv>
                </BaseDiv>
            )
        }
    )
    return <BaseDiv display={'inline-flex'} flexDirection={'column'} >{charsList}</BaseDiv>
}


const SkillDescripton = SizeTrackerHoc(
    (props) => {
        const textColumnRightBorder = '-2px 0px 0px 0px black'
        const fontSize = props.trackedSize > 0 ? props.trackedSize / 20: 20;

        const [showCharacteristics, setShowCharacteristics] = useState(false)

        const displayCharacteristics = (e) => {
            setShowCharacteristics(true)
        }

        const undisplayCharacteristics = (e) => {
            setShowCharacteristics(false)
        }
        
        const containerProps_ = {
            ref: props.trackSizeRef, 
            boxShadow: textColumnRightBorder, 
            width: '100%',
            paddingLeft: '10px',
            onMouseEnter: displayCharacteristics,
            onMouseLeave: undisplayCharacteristics,
            ...props
        }

        const textProps = {
            marginBlockStart: '0em',
            fontSize: `${Math.max(fontSize, 10)}px`,
            ...props
        }

        return(
            <BaseDiv key={1} {...containerProps_}>
                {showCharacteristics && props.characteristics.length ? 
                <CharacteristicLevels {...props}></CharacteristicLevels> :
                <StyledSkillCardText {...textProps}></StyledSkillCardText>}
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
                        const truncatedDescription = `${skillData.description.slice(0, 160)}...`
                        return(                         
                            <SkillCard skillData={skillData} onClick={this.togglePopup} key={rowNumber * this.maxElementsInRow + i}>
                                <StyledFlexInlineRow flexDirection={'column'} justifyContent={'space-evenly'} flex={'1'}>
                                    <StyledFlexInlineRow flex={'1'} justifyContent={"space-evenely"} margin={'0% 0% 2% 0%'}>
                                        <BaseSpan marginLeft={'30px'} marginTop={'20px'} fontFamily={"'Coda Caption', sans-serif"} fontSize={'40px'}>
                                            {skillData.name}
                                        </BaseSpan>
                                    </StyledFlexInlineRow>
                                    <StyledFlexInlineRow  flex={'5'} justifyContent={'space-evenely'} background={'linear-gradient(#f0f3f7, #d8e1f4)'} borderRadius={'10px'} margin={'0% 2% 0% 2%'}>
                                        <StyledSkillCardImage src={skillData.image}></StyledSkillCardImage>
                                        <SkillDescripton margin={'5%'} characteristics={skillData.characteristics}>{truncatedDescription}</SkillDescripton>
                                    </StyledFlexInlineRow>
                                    {/* Abusing box-shadow to create borders....*/}
                                    <StyledFlexInlineRow flex={'1'} justifyContent={'flex-start'}>
                                        <GenericButton margin={'2% 0% 2% 3%'} display={'inline-flex'} buttonImage={`${staticFolderUrl}icons/comment.svg`}><b>{skillData.commentsCount || 0}</b> Comments</GenericButton>
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



export {SkillTableWithTableFormat, CharacteristicLevels};
