import * as actions from './actions';

const brushSettingsReducer = (state={}, action)=> {
    switch (action.type) {
        case actions.BRUSHSETTINGS_BRUSH_WIDTH:
            return Object.assign({}, state, {brushWidth: action.payload})
        default: 
            return state
    }
}

export const settingBrushWidth = (payload)=> ({
    type: actions.BRUSHSETTINGS_BRUSH_WIDTH,
    payload
})

export default brushSettingsReducer;