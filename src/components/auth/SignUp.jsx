import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signUpUser } from '../../actions';

class SignUp extends Component {
    handleFormSubmit = ({ email, password, confirmation }) => {
        this.props.signUpUser(email, password)
    }

    renderField(field) {
        const {touched, error} = field.meta;
        const fieldSetClass = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <fieldset className={fieldSetClass}>
                <label>{field.label}: </label>
                <input {...field.input} type={field.type} className='form-control' />
                <div className="text-help">{touched ? error : ''}</div>
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
                <Field name="confirmation" label="Confirm Password" type="password" component={this.renderField} />
                {this.renderAlert()}
                <button action='submit' className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.confirmation) {
        errors.confirmation = 'Please enter a password confirmation';
    }
    
    if (values.password && values.confirmation && values.password !== values.confirmation) {
        errors.password = 'Passwords must match';
        errors.confirmation = 'Passwords must match';
    }

    //if errors is empty form is safe to submit
    //if errors has any properties, redux form assume form is invalid
    return errors;
}

export default reduxForm({ form: 'signup', validate })(
    connect(state => ({ errorMessage: state.auth.error }), { signUpUser })(SignUp)
);