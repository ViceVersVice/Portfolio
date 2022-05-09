import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkillTableWithTableFormat } from '../skill_table/skillTable.js';
import { Navbar } from '../navbar/navbar.js';
import { AboutMePage } from '../about_me/about_me.js';
import { BaseDiv } from '../base/styledComponents.js';
import { LoginStatusContext } from '../login/loginContext.js';
import { getCurrentUserData } from '../login/currentUserData.js';
import { TrackedSizeProjectsTable } from '../projects/projects.js';


const App = () => {
    const [userCtx, setUserCtx] = useState({'username': ''})

    
    const getContextData = (response) => {
        response.json().then(data => {
            console.log('USR::', data)
            if(data.username){
                setUserCtx({'username': data.username, 'firstName': data.firstName, 'lastName': data.lastName})
            }
        })


    }
    if(!userCtx.username)(
        getCurrentUserData(getContextData)
    )

    return(
        <LoginStatusContext.Provider value={userCtx}>
            <BaseDiv background={'white'}>
                <Navbar/>
                <Routes>
                    <Route path="/main-page/" element={<AboutMePage />}/>
                    <Route path="/main-page/about-me/" element={<AboutMePage />}/>
                    <Route path="/main-page/tech/" element={<SkillTableWithTableFormat />}/>
                    <Route path="/main-page/projects/" element={<TrackedSizeProjectsTable />}/>
                </Routes>
            </BaseDiv>
        </LoginStatusContext.Provider>

    )
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
