import * as actions from './actions';
import emptyState from '../models/emptyState.json';

const fontSettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.FONTSETTINGS_SELECT_FONT_FAMILY:
            return Object.assign({}, state, { font_family: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_SIZE:
            return Object.assign({}, state, { font_size: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_COLOR:
            return Object.assign({}, state, { font_color: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_TEXTALIGN:
            return Object.assign({}, state, { text_align: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_OUTLINE_COLOR:
            return Object.assign({}, state, { outline_color: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_SHADOW_COLOR:
            return Object.assign({}, state, { shadow_color: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_OUTLINE_SIZE:
            return Object.assign({}, state, { outline_size: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_SHADOW_SIZE:
            return Object.assign({}, state, { shadow_size: action.payload })
        case actions.FONTSETTINGS_SELECT_LINE_HEIGHT:
            return Object.assign({}, state, { lineHeight: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_DIRECTION:
            return Object.assign({}, state, { font_direction: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_TEXT_CASE:
            return Object.assign({}, state, { text_case: action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_STYLE:
            return Object.assign({}, state, { hasFontItalic: !action.payload })
        case actions.FONTSETTINGS_SELECT_FONT_WEIGHT:
            return Object.assign({}, state, { hasFontWeight: !action.payload })
        case actions.FONTSETTINGS_OPEN_POPUP_ABSORB_COLOR:
            return Object.assign({}, state, { popUp: true })
        case actions.FONTSETTINGS_CLOSE_POPUP_ABSORB_COLOR:
            return Object.assign({}, state, { popUp: false })
        case actions.FONTSETTINGS_CLEAR_PRE_FONT_SETTINGS:
            return Object.assign({}, state, emptyState.font)
        default:
            return state
    }
}

export const selectFontFamily = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_FAMILY,
    payload
});

export const selectFontSize = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_SIZE,
    payload
});

export const selectFontColor = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_COLOR,
    payload
});

export const selectFontStyle = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_STYLE,
    payload
});

export const selectFontWeight = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_WEIGHT,
    payload
});

export const selectFontTextAlign = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_TEXTALIGN,
    payload
});

export const selectFontOutlineColor = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_OUTLINE_COLOR,
    payload
});

export const selectFontShadowColor = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_SHADOW_COLOR,
    payload
});

export const selectFontOutlineSize = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_OUTLINE_SIZE,
    payload
});

export const selectFontShadowSize = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_SHADOW_SIZE,
    payload
});

export const selectLineHeight = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_LINE_HEIGHT,
    payload
});

export const selectFontDirection = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_DIRECTION,
    payload
});

export const selectFontTextCase = (payload) => ({
    type: actions.FONTSETTINGS_SELECT_FONT_TEXT_CASE,
    payload
});

export const openPopupAbsorbColor = () => ({
    type: actions.FONTSETTINGS_OPEN_POPUP_ABSORB_COLOR
});

export const closePopupAbsorbColor = () => ({
    type: actions.FONTSETTINGS_CLOSE_POPUP_ABSORB_COLOR
});

export const clearPreFontSettings = () => ({
    type: actions.FONTSETTINGS_CLEAR_PRE_FONT_SETTINGS
});


export default fontSettingsReducer;