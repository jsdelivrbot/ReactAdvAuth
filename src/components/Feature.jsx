import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMessage } from '../actions';

class Feature extends Component {
    componentDidMount() {
        if (this.props.authenticated) {
            this.props.fetchMessage();
        }
    }

    render() {
        return (
            <div>
                Message from API: {this.props.apiMessage}
            </div>
        );
    }
}

export default connect(
    state => ({ apiMessage: state.auth.apiMessage, authenticated: state.auth.authenticated }),
    { fetchMessage }
)(Feature);