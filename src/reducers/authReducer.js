import * as ActionTypes from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ActionTypes.SIGN_IN:
            return { ...state, authenticated: true, error: '' };
        case ActionTypes.SIGN_OUT:
            return { ...state, authenticated: false };
        case ActionTypes.SIGN_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}