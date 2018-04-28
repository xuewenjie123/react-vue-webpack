import React from 'react';
import {HashRouter, Route, NavLink,Redirect} from 'react-router-dom'
import Dome1 from '../demo1/Demo1.bundle'
const Index = () =>
    <HashRouter>
        <div className="content">
            <div className="nav">
                <NavLink to="/Dome1" activeClassName="selected" exact>去往demo1</NavLink>
            </div>
            <div>我是demo2</div>
        </div>
    </HashRouter>
;

export default Index;