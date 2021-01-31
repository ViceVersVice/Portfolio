import React from 'react';
import ReactDOM from 'react-dom';
import {SkillTableWithTableFormat} from '../skill_table/skillTable.js'
import {Navbar} from '../navbar/navbar.js'
import { BaseDiv } from '../skill_table/styledComponents.js';

const App = () => {
    return(
        <BaseDiv background={'#f0f5f5'}>
            <Navbar/>
            <SkillTableWithTableFormat />
        </BaseDiv>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
