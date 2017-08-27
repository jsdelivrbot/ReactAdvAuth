import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    componentWillMount() {
        //call some init action
    }

    render() {
        return (
            <div>
                Home Page
            </div>
        );
    }
}

export default connect(
    state => ({  }),
    { }
)(Home);



