import * as actions from './actions';

const uiReducer = (state={}, action)=> {
    switch (action.type) {
        case actions.UI_MARQUEE:
            return Object.assign({}, state, {marquee: action.payload})
        default: 
            return state
    }
}

export const hanlerMarquee = (payload)=> ({
    type: actions.UI_MARQUEE,
    payload
})

export default uiReducer;