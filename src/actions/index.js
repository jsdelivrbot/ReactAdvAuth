import axios from 'axios';
import { createBrowserHistory } from 'history';

import history from '../services/history';
import * as ActionTypes from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser(email, password) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //Update our state
                dispatch({ type: ActionTypes.SIGN_IN });

                //store JWT
                localStorage.setItem('auth_token', response.data.token);

                //redirect to protected resource
                history.push('/feature');
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
                localStorage.setItem('auth_token', response.data.token);

                //redirect to protected resource
                history.push('/feature');
            })
            .catch(({ response }) => {
                dispatch(authError(response.data.error));
            });
    }
}

export function signOutUser() {
    localStorage.removeItem('auth_token');

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

export function fetchMessage() {
    return (dispatch) => {
        axios.get(ROOT_URL, { headers: { authorization: localStorage.getItem('auth_token') } })
            .then(response => {
                dispatch({
                    type: ActionTypes.FETCH_API_MESSAGE,
                    payload: response.data.message
                });
            });

    }
}