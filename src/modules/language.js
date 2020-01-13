import * as actions from './actions';

const languageReducer = (state={}, action)=> {
    switch (action.type) {
        case actions.SWITCH_LANGUAGE:
            return Object.assign({}, state, {language: action.payload})
        default: 
            return state
    }
}

export const handlerLanguage = (payload)=> ({
    type: actions.SWITCH_LANGUAGE,
    payload
})

export default languageReducer;