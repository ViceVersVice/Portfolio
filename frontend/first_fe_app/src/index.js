import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkillTablePage } from '../skill_table/skillTable.js';
import { Navbar } from '../navbar/navbar.js';
import { AboutMePage } from '../about_me/about_me.js';
import { BaseDiv } from '../base/styledComponents.js';
import { LoginStatusContext } from '../login/loginContext.js';
import { getCurrentUserData } from '../login/currentUserData.js';
import { ProjectsTablePage } from '../projects/projects.js';
import { PrivacyPolicy } from '../privacy_policy/privacyPolicy.js';


const App = () => {
    const [userCtx, setUserCtx] = useState({'username': ''})

    
    const getContextData = (response) => {
        response.json().then(data => {
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
                    <Route path="/main/" element={<AboutMePage />}/>
                    <Route path="/main/about-me/" element={<AboutMePage />}/>
                    <Route path="/main/tech/" element={<SkillTablePage />}/>
                    <Route path="/main/projects/" element={<ProjectsTablePage />}/>
                    <Route path="/main/privacy-policy/" element={<PrivacyPolicy />}/>
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
