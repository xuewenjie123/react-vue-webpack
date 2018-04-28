import React from 'react';
import {HashRouter, Route, NavLink,Redirect} from 'react-router-dom'
import Dome3 from '../demo3/Demo3.bundle'
const Index = () =>
    <HashRouter>
        <div className="content">
            <div className="nav">
                <NavLink to="/Dome3" activeClassName="selected" exact>去往demo3</NavLink>
            </div>
            {/* <Route path="/Dome3" component={Dome3}/> */}
            <div>我是demo1</div>
        </div>
    </HashRouter>
;

export default Index;
