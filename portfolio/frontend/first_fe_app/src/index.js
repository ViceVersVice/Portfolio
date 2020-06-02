import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';

const baseUrl = window.location.origin
const skillApiBaseNameUrl = 'skill_api/skills/'

class SkillTable extends React.Component {
    constructor(props) {
        super(props);
    };

    render () {
        const skillsData = fetch(`${baseUrl}/${skillApiBaseNameUrl}`)
            .then(response => response.json())
            .then(data => console.log("DATATA!!", data));

        return (
            <SkillElement/>
        );
    }
}


class SkillElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <p>Skill Descr...</p>
        );
    }
}


ReactDom.render(
    <SkillTable />,
    document.getElementById('root')
);
