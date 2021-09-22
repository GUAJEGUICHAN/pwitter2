import React, { useState } from 'react';
import Navigation from './Navigation'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from '../routes/Auth';
import Profile from '../routes/Profile';
import Home from '../routes/Home';
const AppRouter = ({ isLoggedIn }) => {

    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            {isLoggedIn ? (
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/profile" exact>
                        <Profile />
                    </Route>
                </Switch>) : (
                <Switch>
                    <Route path="/" exact>
                        <Auth />
                    </Route>
                </Switch>)
            }
        </BrowserRouter>
    );
};

export default AppRouter;