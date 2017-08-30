import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class RequireAuth extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(
        state => ({ authenticated: state.auth.authenticated })
    )(RequireAuth);
}

