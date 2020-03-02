import 'babel-polyfill';
import "react-app-polyfill/ie11";
import 'react-app-polyfill/stable';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'es6-shim';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import middlewares from './middleware/';
import Routers from './Routers';
import reducers from './modules';
import 'font-awesome/css/font-awesome.css';

const store = applyMiddleware(...middlewares)(createStore)(reducers);

render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('root')
)