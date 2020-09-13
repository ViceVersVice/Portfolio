import React from 'react';
import ReactDOM from 'react-dom';
import {EndlessTable} from '../skill_table/skill_table.js'
import {Navbar} from '../navbar/navbar.js'

const App = () => {
    return (
        <>
            <Navbar/>
            <EndlessTable />
        </>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
