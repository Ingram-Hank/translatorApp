import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import {createBrowserHistory} from 'history';
import App from '../container/App';
import Contrast from '../container/Contrast';
const history = createBrowserHistory();

class Routers extends Component {
    render(){
        return(
            <Router history={ history }>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/contrast" exact component={Contrast}></Route>
                </Switch>
            </Router> 
        )
    }   
}
export default Routers;