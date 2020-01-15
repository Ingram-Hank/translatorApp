import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import middlewares from './middleware/';
import App from './container/App';
import reducers from './modules';

const store = applyMiddleware(...middlewares)(createStore)(reducers);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)