import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {SkillPopup} from '../popup/skill_popup.js';

const baseUrl = window.location.origin
const skillApiBaseNameUrl = 'skill_api/skills/'



const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px;
`


const StyledFlexColumn = styled.div`
`


const StyledFlexInlineRow = styled(StyledRow)`
    display: inline-flex;
    justify-content: center;
    background-color: yellow;
    flex: 1;
    margin: 30px;
`


const BlankColumn = styled.div`
    flex: 1;
    margin: 30px;
`


class FlexInlineRow extends React.Component {
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
        return <StyledFlexInlineRow onClick={this.togglePopup}>{this.props.children}</StyledFlexInlineRow>
    }
}


class SkillTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], showPopup: false, popupData: {}};
        this.togglePopup = this.togglePopup.bind(this);
    };

    componentDidMount() {
        fetch(`${baseUrl}/${skillApiBaseNameUrl}`)
            .then(response => response.json())
            .then(data => this.setState({data: data}))
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
        console.log('STT:', this.state);
    }
        

    render () {
        let data = this.state.data
        let skillsListLength = data.length
        if (skillsListLength) {
            let maxElementsInRow = 3
            let maxRowsCount = Math.floor(skillsListLength / maxElementsInRow) + 1
            let rows = []

            for (let rowNumber=0; rowNumber < (maxRowsCount); rowNumber++) {
                let start = rowNumber * maxElementsInRow;
                let end = (rowNumber + 1) * maxElementsInRow;
                let rowData = data.slice(start, end);
                let columns = rowData.map(
                    (skillData, i) => {
                        return(                         
                            <FlexInlineRow skillData={skillData} onClick={this.togglePopup} key={rowNumber * maxElementsInRow + i}>
                                <StyledFlexColumn>
                                    <p>Skill Descr...</p>
                                    <p>{skillData.name}</p>
                                    <p>{skillData.level}</p>
                                    <p>{skillData.description}</p>
                                </StyledFlexColumn>
                            </FlexInlineRow>

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
                rows.push(<SkillPopup data={this.state.popupData}></SkillPopup>);
            }

            return (
                rows
            )
        } else {
            return <h1>Please wait...</h1>;
        }

    }
}



ReactDOM.render(
    <SkillTable />,
    document.getElementById('root')
);
