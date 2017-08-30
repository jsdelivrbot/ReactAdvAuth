import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../services/history';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import RequireAuth from './auth/RequireAuth';
import SignIn from './auth/SignIn';
import SignOut from './auth/SignOut';
import SignUp from './auth/SignUp';
import Feature from './Feature';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signout" component={SignOut} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/feature" component={RequireAuth(Feature)} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps({ authenticated }) {
    return { authenticated };
}

export default connect(mapStateToProps)(App);