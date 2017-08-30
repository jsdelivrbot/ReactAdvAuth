import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signInUser } from '../../actions';

export class SignIn extends Component {
    handleFormSubmit = ({ email, password }) => {
        this.props.signInUser(email, password)
    }

    renderField(field) {
        return (
            <fieldset className='form-group'>
                <label>{field.label}: </label>
                <input {...field.input} type={field.type} className='form-control' />
            </fieldset>
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field name="email" label="Email" component={this.renderField} />
                <Field name="password" label="Password" type="password" component={this.renderField} />
                {this.renderAlert()}
                <button action='submit' className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

export default reduxForm({ form: 'signin' })(
    connect(state => ({ errorMessage: state.auth.error }), { signInUser })(SignIn)
);