import * as actions from './actions';

const uiReducer = (state = {}, action)=> {
    switch (action.type) {
        case actions.UI_MARQUEE:
            return Object.assign({}, state, {marquee: action.payload})
        case actions.UI_TOGGLE_AUTO_CLEAR:
            return Object.assign({}, state, {switchAutoClear: !action.payload})
        case actions.UI_TOGGLE_AUTO_OCR:
            return Object.assign({}, state, {switchAutoOCR: !action.payload})
        case actions.UI_TOGGLE_AUTO_TRANSLATE:
            return Object.assign({}, state, {switchAutoTranslate: !action.payload})
        default: 
            return state
    }
};

export const hanlerMarquee = (payload)=> ({
    type: actions.UI_MARQUEE,
    payload
});

export const handlerToggleAutoClear = (payload)=> ({
    type: actions.UI_TOGGLE_AUTO_CLEAR,
    payload
});
export const handlerToggleAutoOCR = (payload)=> ({
    type: actions.UI_TOGGLE_AUTO_OCR,
    payload
});
export const handlerToggleAutoTranslate = (payload)=> ({
    type: actions.UI_TOGGLE_AUTO_TRANSLATE,
    payload
});


export default uiReducer;