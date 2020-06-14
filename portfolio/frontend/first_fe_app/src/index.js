import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';

const baseUrl = window.location.origin
const skillApiBaseNameUrl = 'skill_api/skills/'



const StyledRow = styled.div`
    background-color: #FFF;
    margin: 50px;
    display: flex;
`


const StyledRowEelement = styled.div`
    background-color: yellow;
    flex: 1;
    margin: 30px;

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

    render () {
        let data = this.state.data
        let skillsListLength = data.length

        if (skillsListLength) {
            let maxElementsInRow = 3
            let rows = []

            for (let i=0; i <= (Math.floor(skillsListLength / maxElementsInRow) + 1); i++) {
                let start = i * maxElementsInRow;
                let end = (i + 1) * maxElementsInRow;
                let rowData = data.slice(start, end);
                console.log('ROW DATA', rowData);
                rows.push(
                    <StyledRow>
                        {rowData.map(function(skillData){
                            return(
                                <StyledRowEelement key={i}>
                                    <p>Skill Descr...</p>
                                    <p>{skillData.name}</p>
                                    <p>{skillData.description}</p>
                                    <p>{skillData.level}</p>
                                </StyledRowEelement>
                            )
                        })}      
                    </StyledRow>
                );
            };

            return (
                rows.map((e) => e)
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
