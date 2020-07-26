import React from 'react';
import ReactDOM from 'react-dom';
import {SkillTable} from '../skill_table/skill_table.js'

const App = () => {
    return (
        <SkillTable />
    )
} 


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
