import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { authenticate } from '../actions';

class Header extends Component {
    onAuthButtonClick = event => {
        this.props.authenticate(!this.props.authenticated);
    }

    authButton() {
        return (
            <button className="" onClick={this.onAuthButtonClick}>
                {this.props.authenticated ? 'Sign Out' : 'Sign In'}
            </button>
        )
    }

    render() {
        return (
            <nav className="navbar">
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        {this.authButton()}
                    </li>
                </ul>
            </nav>
        );
    }
}

export default connect(
    state => ({ authenticated: state.authenticated }),
    { authenticate }
)(Header);