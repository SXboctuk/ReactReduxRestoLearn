import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import {Switch, Route} from 'react-router';
import {connect} from 'react-redux';

import Background from './food-bg.jpg';

const App = ({items}) => {
    let total = 0;
    items.forEach(item => {
        total = total + (item.price * item.amount);
    });
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={total}/>
            <Switch>
                <Route
                    path='/'
                    component={MainPage}
                    exact/>
                    <Route
                    path='/cart'
                    component={CartPage}
                    exact/>
            </Switch>
        </div>
    )
}
const mapStateToProps = ({items}) =>{
    return {
        items
    }
}

export default connect(mapStateToProps)(App);