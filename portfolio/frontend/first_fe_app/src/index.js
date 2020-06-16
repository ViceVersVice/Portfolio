import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const baseUrl = window.location.origin
const skillApiBaseNameUrl = 'skill_api/skills/'



const StyledRow = styled.div`
    margin: 50px;
    display: flex;
`


const StyledRowEelement = styled.div`
    background-color: yellow;
    flex: 1;
    margin: 30px;

`


const BlankRowElement = styled.div`
    flex: 1;
`


class SkillTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    };


    componentDidMount() {
        fetch(`${baseUrl}/${skillApiBaseNameUrl}`)
            .then(response => response.json())
            .then(data => this.setState({data: data}))
    }

    getBlankColumns(blanksCount) {
        let blankColumns = [];
        
        for (let i=0; i < blanksCount; i++) {
            blankColumns.push(<BlankRowElement></BlankRowElement>);
        };

        return blankColumns;
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
                    function(skillData){
                        return(
                            <StyledRowEelement key={rowNumber}>
                                <p>Skill Descr...</p>
                                <p>{skillData.name}</p>
                                <p>{skillData.description}</p>
                                <p>{skillData.level}</p>
                            </StyledRowEelement>
                        )
                    }
                )
                
                if (rowNumber + 1 == maxRowsCount && rowData.length < maxElementsInRow) {
                    let blanksCount = maxElementsInRow - rowData.length;
                    columns.push(this.getBlankColumns(blanksCount));
                };

                rows.push(
                    <StyledRow>
                        {columns}
                    </StyledRow>
                );
                
            };

            return (
                rows
            )
        } else {
            return <h1>Please wait...</h1>;
        }

    }
}



ReactDom.render(
    <SkillTable />,
    document.getElementById('root')
);
