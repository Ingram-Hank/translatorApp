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
        case actions.UI_SET_WHOLE_FONT_FAMILY:
            return Object.assign({}, state, { wholeFonFamily: action.payload })
        case actions.UI_SET_WHOLE_FONT_SIZE:
            return Object.assign({}, state, { wholeFontSize: action.payload })
        case actions.UI_SET_WHOLE_FONT_COLOR:
            return Object.assign({}, state, { wholeFontColor: action.payload })
        case actions.UI_SET_WHOLE_FONT_TEXT_ALIGN:
            return Object.assign({}, state, { wholeFontTextAlign: action.payload })
        case actions.UI_SET_WHOLE_FONT_LINEHEIGHT:
            return Object.assign({}, state, { wholeFontLineHeight: action.payload })
        case actions.UI_SET_GLOBAL_FONT_STYLE:
            return Object.assign({}, state, { globalHasFontItalic: !action.payload })
        case actions.UI_SET_GLOBAL_FONT_WEIGHT:
            return Object.assign({}, state, { globalHasFontWeight: !action.payload })
        case actions.UI_SET_GLOBAL_FONT_DIRECTION:
            return Object.assign({}, state, { globalFontDirection: action.payload })
        case actions.UI_SET_GLOBAL_FONT_TEXT_CASE:
            return Object.assign({}, state, { globalFontTextCase: action.payload })
        case actions.UI_SET_CORRECT_TRANSL_RESULT:
            return Object.assign({}, state, { hasCorrect: !action.payload })
        case actions.UI_ZOOM_CANVAS_BECH:
            return Object.assign({}, state, { zoomCanvasValue: action.payload })
        case actions.UI_SET_START_NUMBER:
            return Object.assign({}, state, { startNumber: action.payload })
        case actions.UI_HANDLER_SET_FONT:
            return Object.assign({}, state, { font: action.payload })
        case actions.UI_HANDLER_CLEAR_SET_FONT:
            return Object.assign({}, state, { font: {} })
        case actions.UI_RECEIVED_CURRENT_SELECTED_ITEM:
            return Object.assign({}, state, { currentSelectedItem: action.payload })
        case actions.UI_RECEIVED_CURRENT_TRANSLATION_ORDERID:
            return Object.assign({}, state, { currentTranslationOrderId: action.payload })
        case actions.UI_RECEIVED_ERROR_MESSAGE:
            return Object.assign({}, state, { notificationMsg: action.payload })
        case actions.UI_RECEIVED_ORDER_NUMBER:
            return Object.assign({}, state, { orderNo: action.payload })
        case actions.UI_OPEN_MODAL:
            return Object.assign({}, state, { modalOpen: true, modalId: action.payload })
        case actions.UI_CLOSE_MODAL:
            return Object.assign({}, state, { modalOpen: false })
        case actions.UI_START_PREVIEW:
            return Object.assign({}, state, { startPreview: true })
        case actions.UI_CLOSE_PREVIEW:
            return Object.assign({}, state, { startPreview: false })
        case actions.UI_LOADING_START:
            return Object.assign({}, state, { loading: true })
        case actions.UI_LOADING_COMPLETE:
            return Object.assign({}, state, { loading: false })
        case actions.UI_SET_CLEAR_PRETRANSL_RESULT:
            return Object.assign({}, state, { clearPreTranslResult: true })
        case actions.UI_SET_STOP_CLEAR_PRETRANSL_RESULT:
            return Object.assign({}, state, { clearPreTranslResult: false })
        case actions.UI_UPDATE_MASK_BACKGROUND_START:
            return Object.assign({}, state, { updateBackground: true })
        case actions.UI_UPDATE_MASK_BACKGROUND_COMPLETE:
            return Object.assign({}, state, { updateBackground: false })
        case actions.UI_SET_IS_BACKTO_TRANSLATE_PAGE:
            return Object.assign({}, state, { isBackToTranslPage: true })
        case actions.UI_SET_IS_NOT_BACKTO_TRANSLATE_PAGE:
            return Object.assign({}, state, { isBackToTranslPage: false })
        case actions.UI_SET_IS_TO_SELECT_CHAPTER:
            return Object.assign({}, state, { selectedChapterId: action.payload })
        case actions.UI_UPDATE_SELECTED_TRANSL_IMAGE:
            return Object.assign({}, state, { isUpdateTranslImage: true })
        case actions.UI_CLEAR_SELECTED_TRANSL_IMAGE:
            return Object.assign({}, state, { isUpdateTranslImage: false })
        case actions.UI_UPDATED_FEED_BACKMSG:
            return Object.assign({}, state, { isUpdateFeedBackMsg: true })
        case actions.UI_STOP_UPDATED_FEED_BACKMSG:
            return Object.assign({}, state, { isUpdateFeedBackMsg: false })
        case actions.UI_SET_CREATE_CROPED_MARQUEE:
            return Object.assign({}, state, { hasCropedMarquee: true })
        case actions.UI_SET_DELETE_CROPED_MARQUEE:
            return Object.assign({}, state, { hasCropedMarquee: false })
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

export const setGlobalFontFamily = (payload) => ({
    type: actions.UI_SET_WHOLE_FONT_FAMILY,
    payload
});

export const setWholeFontSize = (payload) => ({
    type: actions.UI_SET_WHOLE_FONT_SIZE,
    payload
});

export const setWholeFontColor = (payload) => ({
    type: actions.UI_SET_WHOLE_FONT_COLOR,
    payload
});

export const setWholeFontTextAlign = (payload) => ({
    type: actions.UI_SET_WHOLE_FONT_TEXT_ALIGN,
    payload
});

export const setWholeFontLineHeight = (payload) => ({
    type: actions.UI_SET_WHOLE_FONT_LINEHEIGHT,
    payload
});

export const setGlobalFontStyle = (payload) => ({
    type: actions.UI_SET_GLOBAL_FONT_STYLE,
    payload
});

export const setGlobalFontWeight = (payload) => ({
    type: actions.UI_SET_GLOBAL_FONT_WEIGHT,
    payload
});

export const setGlobalFontDirection = (payload) => ({
    type: actions.UI_SET_GLOBAL_FONT_DIRECTION,
    payload
});

export const setGlobalFontTextCase = (payload) => ({
    type: actions.UI_SET_GLOBAL_FONT_TEXT_CASE,
    payload
});

export const receivedCurrentSelectedItem = (payload)=> ({
    type: actions.UI_RECEIVED_CURRENT_SELECTED_ITEM,
    payload
});
export const receivedCurrenttranslationOrderId = (payload)=> ({
    type: actions.UI_RECEIVED_CURRENT_TRANSLATION_ORDERID,
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

export const handlerClearUiFont = () => ({
    type: actions.UI_HANDLER_CLEAR_SET_FONT
});

export const openModal = (payload) => ({
    type: actions.UI_OPEN_MODAL,
    payload
})

export const receivedErrorMsg = (payload) => ({
    type: actions.UI_RECEIVED_ERROR_MESSAGE,
    payload
})

export const receivedOrderNo = (payload) => ({
    type: actions.UI_RECEIVED_ORDER_NUMBER,
    payload
})

export const closeModal = () => ({
    type: actions.UI_CLOSE_MODAL
})

export const openPreviewMoal = ()=> ({
    type: actions.UI_START_PREVIEW
});

export const closePreviewModal = ()=> ({
    type: actions.UI_CLOSE_PREVIEW
});

export const uiloadingStart = ()=> ({
    type: actions.UI_LOADING_START
});

export const uiloadingComplete = ()=> ({
    type: actions.UI_LOADING_COMPLETE
});

export const setClearPreTranslResult = ()=> ({
    type: actions.UI_SET_CLEAR_PRETRANSL_RESULT
});

export const setStopClearPreResultContainer = ()=> ({
    type: actions.UI_SET_STOP_CLEAR_PRETRANSL_RESULT
});

export const updateMaskBackgroundStart = ()=> ({
    type: actions.UI_UPDATE_MASK_BACKGROUND_START
});

export const updateMaskBackgroundComplete = ()=> ({
    type: actions.UI_UPDATE_MASK_BACKGROUND_COMPLETE
});

export const backToTransl = ()=> ({
    type: actions.UI_SET_IS_BACKTO_TRANSLATE_PAGE
});

export const isNotBackToTransl = ()=> ({
    type: actions.UI_SET_IS_NOT_BACKTO_TRANSLATE_PAGE
});

export const setIsToSelectChapter = (payload) => ({
    type: actions.UI_SET_IS_TO_SELECT_CHAPTER,
    payload
});

export const createCropedMarquee = () => ({
    type: actions.UI_SET_CREATE_CROPED_MARQUEE
});

export const deleteCropedMarquee = () => ({
    type: actions.UI_SET_DELETE_CROPED_MARQUEE
});

export const updateSelectedTranslImage = () => ({
    type: actions.UI_UPDATE_SELECTED_TRANSL_IMAGE
});

export const clearSelectedTranslImage = () => ({
    type: actions.UI_CLEAR_SELECTED_TRANSL_IMAGE
});

export const updateFeedBackMsg = () => ({
    type: actions.UI_UPDATED_FEED_BACKMSG
});

export const stopUpdatedFeedBackMsg = () => ({
    type: actions.UI_STOP_UPDATED_FEED_BACKMSG
});



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
        dispatch(handlersetFont(resultFont))
    }
};

export default uiReducer;