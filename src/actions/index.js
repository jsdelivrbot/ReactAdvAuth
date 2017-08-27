import * as ActionTypes from './types';

export function authenticate(isLoggedIn) {
    return {
        type: ActionTypes.CHANGE_AUTH,
        payload: isLoggedIn
    }
}
