import React from 'react';
import '../../public/css/index.pcss';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import Shop from '../shop/Index';
import demo from '../demo/Index';
const Index = () =>
    <HashRouter>
        <div>
            <div className="nav">
                <NavLink to="/" activeClassName="selected" exact>首页</NavLink>
                <NavLink to="/Shop" activeClassName="selected" exact>商城</NavLink>
            </div>
            <Route exact path="/" component={() =><div>11111</div>}/>
            <Route path="/Shop" component={Shop}/>
            <Route path="/demo" component={demo}/>
        </div>
    </HashRouter>

export default Index;