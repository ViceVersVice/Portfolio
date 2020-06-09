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
                console.log('ROW KEY??', i);
                rows.push(<SkillRow key={i} rowData={rowData}/>);
            };

            return rows.map((e) => e);

        } else {
            return <h1>Please wait...</h1>;
        }

    }
}


class SkillRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                {this.props.rowData.map((skillData) => <SkillColumn key={skillData.id} {...skillData} />)}
            </div>
        );
    }
}


class SkillColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="column">
                <SkillCard key={this.props.id} {...this.props}/>
            </div>
        );
    }
}


class SkillCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="card">
                <p>Skill Descr...</p>
                <p>{this.props.name}</p>
                <p>{this.props.description}</p>
                <p>{this.props.level}</p>
            </div>
        );
    }
}


ReactDom.render(
    <SkillTable />,
    document.getElementById('root')
);
