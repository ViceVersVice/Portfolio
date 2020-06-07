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
        console.log('LOOL', this.state.data, this)
        
        if (this.state.data.length) {
            const lol = this.state.data.map((skill) => <SkillElement {...skill}/>);
            return lol;
        } else {
            return <h1>ERRR!</h1>;
        }

    }
}


class SkillElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
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
