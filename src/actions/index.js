import axios from 'axios';
import { createBrowserHistory } from 'history';

import * as ActionTypes from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser(email, password) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //Update our state
                dispatch({ type: ActionTypes.SIGN_IN });

                //store JWT
                localStorage.setItem('token', response.data.token);

                //redirect to protected resource
                const browserHistory = createBrowserHistory();
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signUpUser(email, password) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                //Update our state
                dispatch({ type: ActionTypes.SIGN_IN });

                //store JWT
                localStorage.setItem('token', response.data.token);

                //redirect to protected resource
                const browserHistory = createBrowserHistory();
                browserHistory.push('/feature');
            })
            .catch(({ response }) => {
                dispatch(authError(response.data.error));
            });
    }
}

export function signOutUser() {
    localStorage.removeItem('token');

    return {
        type: ActionTypes.SIGN_OUT
    };
}

export function authError(error) {
    return {
        type: ActionTypes.SIGN_ERROR,
        payload: error
    };
}
