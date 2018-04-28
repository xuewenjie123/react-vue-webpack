import React,{Component} from 'react'
import Greeter from './Greeter';
import {render} from 'react-dom';
import MyPage from './MyPage'
import { Router, hashHistory ,Route, IndexRoute, Link, IndexLink } from 'react-router'
import './main.css' 
    render(
        <div>
            <Router history={hashHistory}>
              <Route path="/" component={Greeter} />
           </Router> 
        </div>
       ,
    document.getElementById("root"))