import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';

const baseUrl = window.location.origin
const skillApiBaseNameUrl = 'skill_api/skills/'

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

    getRow(chunk) {
        console.log('CHUNK!!', chunk);
        return (
            <div className="row">
                {chunk.map((skillData) => <SkillElement key={skillData.id} {...skillData}/>)}
            </div>
        )
    }

    getRows(skillsList) {
        let skillsListLength = skillsList.length
        let maxElementsInRow = 3
        let rows = []

        for (let i=0; i <= (Math.floor(skillsList.length / maxElementsInRow) + 1); i++) {
            let start = i * maxElementsInRow;
            let end = (i + 1) * maxElementsInRow;
            let chunk = skillsList.slice(start, end);
            rows.push(this.getRow(chunk));
        };

        return rows;
    }

    render () {
        
        let data = this.state.data
        console.log('LOOL', data, this)
        if (data.length) {
            return this.getRows(data).map((e) => e);
        } else {
            return <h1>Please wait...</h1>;
        }

    }
}


class SkillElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="column">
                <div className="card">
                    <p>Skill Descr...</p>
                    <p>{this.props.name}</p>
                    <p>{this.props.description}</p>
                    <p>{this.props.level}</p>
                </div>
            </div>
        );
    }
}


ReactDom.render(
    <SkillTable />,
    document.getElementById('root')
);
