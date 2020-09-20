import React from 'react';
import ReactDOM from 'react-dom';
import {SkillTableWithTableFormat} from '../skill_table/skillTable.js'
import {Navbar} from '../navbar/navbar.js'

const App = () => {
    return (
        <>
            <Navbar/>
            <SkillTableWithTableFormat />
        </>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
