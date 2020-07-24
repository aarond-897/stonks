import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/login/Login'
import Register from './Components/register/Register';
import Portfolio from './Components/portfolio/Portfolio';
import Stock from './Components/stock/Stock';

export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/portfolio' component={Portfolio}/>
        <Route path='/register' component={Register}/>
        <Route path='/stock/:ticker' component={Stock}/>
    </Switch>
)