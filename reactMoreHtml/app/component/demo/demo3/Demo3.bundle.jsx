import React from 'react';
import {HashRouter, Route, NavLink,Redirect} from 'react-router-dom'
import Dome2 from '../demo2/Demo2.bundle'
const Index = () =>
    <HashRouter>
        <div className="content">
            <div className="nav">
                <NavLink to="/Dome2" activeClassName="selected" exact>去往demo2</NavLink>
            </div>
            <div>我是demo3</div>
            {/* <Route path="/Dome2" component={Dome2}/> */}
        </div>
    </HashRouter>
;
export default Index;