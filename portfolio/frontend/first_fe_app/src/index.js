import React from 'react';
import ReactDOM from 'react-dom';
import {SkillTable} from '../skill_table/skill_table.js'
import {Navbar} from '../navbar/navbar.js'

const App = () => {
    console.log('lool')
    return (
        <>
            <Navbar/>
            <SkillTable />
        </>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
