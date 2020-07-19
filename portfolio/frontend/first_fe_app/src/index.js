import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {StyledRow, StyledFlexCardInlineRow, StyledFlexInlineRow, StyledFlexColumn, BlankColumn, StyledSkillCardText, StyledEndOfPage, StyledImage} from './styledComponents.js';
import {SkillPopup} from '../popup/skill_popup.js';

const baseUrl = window.location.origin
const skillApiBaseNameUrl = 'skill_api/skills'
const staticFolderUrl = `${baseUrl}/static/`
const mediaFolderUrl = `${baseUrl}/media/`


class EndOfPage extends React.Component {
    render() {
        let isVisible = this.props.dataIsLoading ? 'visible': 'hidden';
        return ReactDOM.createPortal(
            <StyledEndOfPage ref={this.props.innerRef} isVisible={isVisible}>
                <h1>Loading data.....</h1>
                <img src={`${staticFolderUrl}/gifs/loading1.gif`}></img>
            </StyledEndOfPage>, document.body);
    }
}

const EndOfPageRef = React.forwardRef((props, ref) => <EndOfPage {...props} innerRef={ref}></EndOfPage>)


class SkillCard extends React.Component {
    constructor(props) {
        super(props);
        this.togglePopup = this.togglePopup.bind(this);
    };

    togglePopup(e) {
        if (this.props.onClick) {
            this.props.onClick(this.props.skillData);
        };
    }

    render() {
        return <StyledFlexCardInlineRow onClick={this.togglePopup} borderStyle={'0.2rem solid #d8e1f4'} borderRadius={'5px'}>{this.props.children}</StyledFlexCardInlineRow>
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
            let maxElementsInRow = 2;
            let maxRowsCount = Math.floor(skillsListLength / maxElementsInRow) + 1;
            let rows = [];

            for (let rowNumber=0; rowNumber < (maxRowsCount); rowNumber++) {
                let start = rowNumber * maxElementsInRow;
                let end = (rowNumber + 1) * maxElementsInRow;
                let rowData = data.slice(start, end);
                let columns = rowData.map(
                    (skillData, i) => {
                        const truncatedDescription = `${skillData.description.slice(0, 80)}...`
                        return(                         
                            <SkillCard skillData={skillData} onClick={this.togglePopup} key={rowNumber * maxElementsInRow + i}>
                                <StyledFlexInlineRow flexDirection={'column'} justifyContent={'space-evenly'}>
                                    <StyledFlexColumn alignSelf={'center'}>
                                        <h2>
                                            <StyledSkillCardText>{skillData.name}</StyledSkillCardText>
                                        </h2>
                                    </StyledFlexColumn>
                                    <StyledFlexInlineRow justifyContent={'space-around'} flexGrow={1}>
                                        <StyledImage src={skillData.image}></StyledImage>
                                        <StyledFlexColumn key={1}>
                                            <StyledSkillCardText>{truncatedDescription}</StyledSkillCardText>
                                        </StyledFlexColumn>
                                    </StyledFlexInlineRow>
                                </StyledFlexInlineRow>
                            </SkillCard>

                        )
                    }
                )
                
                if (rowNumber + 1 == maxRowsCount && rowData.length < maxElementsInRow) {
                    let blanksCount = maxElementsInRow - rowData.length;
                    columns.push(this.getBlankColumns(skillsListLength, blanksCount));
                };
                rows.push(
                    <StyledRow key={rowNumber}>
                        {columns}
                    </StyledRow>
                );
            };

            if (this.state.showPopup) {
                const closePopupButton = <button onClick={this.closePopup}>Close</button>;
                rows.push(<SkillPopup data={this.state.popupData} closeButton={closePopupButton}></SkillPopup>);
            }
            rows.push(endOfPage);
            return rows;
        } else {
            return endOfPage
        }

    }
}



ReactDOM.render(
    <SkillTable />,
    document.getElementById('root')
);
