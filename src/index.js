import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './css/site.css';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import * as ActionTypes from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

if (localStorage.getItem('auth_token')) {
    store.dispatch({ type: ActionTypes.SIGN_IN })
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('.container')
);
