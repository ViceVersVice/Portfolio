import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {SkillTableWithTableFormat} from '../skill_table/skillTable.js'
import {Navbar} from '../navbar/navbar.js'
import { BaseDiv } from '../skill_table/styledComponents.js';
import { LoginStatusContext } from '../login/loginContext.js';
import { getCurrentUserData } from '../login/currentUserData.js'



const App = () => {
    const [userCtx, setUserCtx] = useState({'username': ''})

    
    const getContextData = (response) => {
        response.json().then(data => {
            console.log('USR::', data)
            if(data.username){
                setUserCtx({'username': data.username})
            }
        })


    }
    if(!userCtx.username)(
        getCurrentUserData(getContextData)
    )

    return(
        <LoginStatusContext.Provider value={userCtx}>
            <BaseDiv background={'#f0f5f5'}>
                <Navbar/>
                <SkillTableWithTableFormat />
            </BaseDiv>
        </LoginStatusContext.Provider>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
