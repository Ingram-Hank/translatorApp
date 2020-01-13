import { combineReducers } from 'redux'
import languageReducer from './language';
import uiReducer from './ui';

export default combineReducers({
    languageReducer,
    uiReducer
})
