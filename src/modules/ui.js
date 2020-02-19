import * as actions from './actions';

const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.UI_MARQUEE:
            return Object.assign({}, state, { marquee: action.payload })
        case actions.UI_TOGGLE_AUTO_CLEAR:
            return Object.assign({}, state, { switchAutoClear: !action.payload })
        case actions.UI_TOGGLE_AUTO_OCR:
            return Object.assign({}, state, { switchAutoOCR: !action.payload })
        case actions.UI_TOGGLE_AUTO_TRANSLATE:
            return Object.assign({}, state, { switchAutoTranslate: !action.payload })
        case actions.UI_SELECT_IMAGE:
            return Object.assign({}, state, { selectedImg: action.payload })
        case actions.UI_SET_CORRECT_TRANSL_RESULT:
            return Object.assign({}, state, { hasCorrect: !action.payload })
        case actions.UI_ZOOM_CANVAS_BECH:
            return Object.assign({}, state, { zoomCanvasValue: action.payload })
        case actions.UI_SET_START_NUMBER:
            return Object.assign({}, state, { startNumber: action.payload })
        case actions.UI_HANDLER_SET_FONT:
            return Object.assign({}, state, { font: action.payload })
        case actions.UI_OPEN_MODAL:
            return Object.assign({}, state, { modalOpen: true })
        case actions.UI_CLOSE_MODAL:
            return Object.assign({}, state, { modalOpen: false })
        default:
            return state
    }
};

export const hanlerMarquee = (payload) => ({
    type: actions.UI_MARQUEE,
    payload
});

export const handlerToggleAutoClear = (payload) => ({
    type: actions.UI_TOGGLE_AUTO_CLEAR,
    payload
});

export const handlerToggleAutoOCR = (payload) => ({
    type: actions.UI_TOGGLE_AUTO_OCR,
    payload
});

export const handlerToggleAutoTranslate = (payload) => ({
    type: actions.UI_TOGGLE_AUTO_TRANSLATE,
    payload
});

export const handlerSelectImage = (payload) => ({
    type: actions.UI_SELECT_IMAGE,
    payload
});

export const setCorrectTranslResult = (payload) => ({
    type: actions.UI_SET_CORRECT_TRANSL_RESULT,
    payload
});

export const setStartNumber = (payload) => ({
    type: actions.UI_SET_START_NUMBER,
    payload
});

export const handlerZoomCanvasBech = (payload) => ({
    type: actions.UI_ZOOM_CANVAS_BECH,
    payload
});

export const handlersetFont = (payload) => ({
    type: actions.UI_HANDLER_SET_FONT,
    payload
});

export const openModal = () => ({
    type: actions.UI_OPEN_MODAL
})

export const closeModal = () => ({
    type: actions.UI_CLOSE_MODAL
})

export const handlerZoomCanvasPlus = (value) => {
    return (dispatch, getState) => {
        let payload = (Number(value) + 0.1).toFixed(1);
        if (payload > 1.5) {
            payload = 1.5
        }
        dispatch(handlerZoomCanvasBech(payload))
    }
}

export const handlerZoomCanvasMinus = (value) => {
    return (dispatch, getState) => {
        let payload = (Number(value) - 0.1).toFixed(1);
        if (payload < 0.5) {
            payload = 0.5
        }
        dispatch(handlerZoomCanvasBech(payload))
    }
}

export const getFontsettings = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { font, ui } = state;
        const { startNumber = 0 } = ui;
        const fontInUi = ui.font;
        const resultFont = Object.assign({}, fontInUi, { [startNumber]: font });
        console.log("resultFont--------------->", resultFont);
        dispatch(handlersetFont(resultFont))
    }
};

export default uiReducer;