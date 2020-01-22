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
        case actions.UI_SELECT_IMAGE:
            return Object.assign({}, state, {selectedImg: action.payload})
        case actions.UI_ZOOM_CANVAS_BECH:
            return Object.assign({}, state, {zoomCanvasValue: action.payload})
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

export const handlerSelectImage = (payload)=> ({
    type: actions.UI_SELECT_IMAGE,
    payload
});

export const handlerZoomCanvasBech = (payload)=> ({
    type: actions.UI_ZOOM_CANVAS_BECH,
    payload
});

export const handlerZoomCanvasPlus = (value) => {
    return (dispatch, getState) => {
        let payload = (Number(value) + 0.1).toFixed(1);
        if(payload > 1.5) {
            payload = 1.5
        }
        dispatch(handlerZoomCanvasBech(payload))
    }
}

export const handlerZoomCanvasMinus = (value) => {
    return (dispatch, getState) => {
        let payload = (Number(value) - 0.1).toFixed(1);
        if(payload < 0.5) {
            payload = 0.5
        }
        dispatch(handlerZoomCanvasBech(payload))
    }
}


export default uiReducer;