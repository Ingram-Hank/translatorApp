import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './container/App';
import reducers from './modules';

const store = createStore(reducers, applyMiddleware(thunk))　　　

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)