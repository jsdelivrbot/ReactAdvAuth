import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { signOutUser } from '../actions';

class Header extends Component {
    onSignOut = (event) => {
        event.preventDefault();
        this.props.signOutUser();
    }

    renderAuthOptions() {
        if (this.props.authenticated) {
            return (
                <li className="nav-item">
                    <Link to="/signout" className="nav-link">Sign Out</Link>
                </li>
            );
        }
        else {
            return [
                <li className="nav-item" key={1}>
                    <Link to="/signin" className="nav-link">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
            ];
        }
    }

    render() {
        return (
            <nav className="navbar">
                <Link to="/" className="navbar-brand">Home</Link>
                <ul className="nav navbar-nav">
                    {this.renderAuthOptions()}
                </ul>
            </nav>
        );
    }
}

export default connect(
    state => ({ authenticated: state.auth.authenticated }),
    { signOutUser }
)(Header);