import * as actions from './actions';
const requireContext = require.context("../images/", true, /^\.\/.*\.jpg$/);
const images = requireContext.keys().map(requireContext);

const imagesReducer = (state={}, action)=> {
    switch (action.type) {
        case actions.RECEIVED_IMAGES:
            return Object.assign({}, state, {imagesCollection: action.payload})
        case actions.RECEIVED_SELECTED_IMG:
            return Object.assign({}, state, {selectedImage: action.payload})
        default: 
            return state
    }
};

export const receivedImages = (payload)=> ({
    type: actions.RECEIVED_IMAGES,
    payload
});

export const receiveSelectedImg = (payload)=> ({
    type: actions.RECEIVED_SELECTED_IMG,
    payload
});

export const getTranslImages = ()=> {
    return (dispatch, getState)=> {

        dispatch(receivedImages(images));
    }
};

export const selecteCanvas = ()=> {
    return (dispatch, getState)=> {
        const state = getState();
        const images = state.images.imagesCollection;
        const {selectedImg = 0} = state.ui;
        dispatch(receiveSelectedImg(images[selectedImg]));
    }
}


export default imagesReducer;
