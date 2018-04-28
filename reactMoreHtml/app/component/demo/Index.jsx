import React from 'react';
import {HashRouter, Route, NavLink,Redirect} from 'react-router-dom'
import {Bundle,BundleFun} from '../common/Bundle'
import Dome1 from '../demo/demo1/Demo1.bundle'
import Dome2 from '../demo/demo2/Demo2.bundle'
import Dome3 from '../demo/demo3/Demo3.bundle'
const Index = () =>
    <HashRouter>
        <div className="content">
            <div className="nav">
                <NavLink to="/Dome1" activeClassName="selected" exact>demo1</NavLink>
                <NavLink to="/Dome2" activeClassName="selected">demo2</NavLink>
                <NavLink to="/Dome3" activeClassName="selected">demo3</NavLink>
            </div>
            <Route exact path="/"
                   render={() => (<Redirect to="/Dome1"/>)}/>
            <Route path="/Dome1" component={()=> BundleFun(Dome1)}/>
            <Route path="/Dome2" component={(props)=> BundleFun(Dome2,props)}/>
            <Route path="/Dome3" component={()=> BundleFun(Dome3)}/>
        </div>
    </HashRouter>
;
export default Index;
