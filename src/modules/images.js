import * as actions from './actions';
const requireContext = require.context("../images/", true, /^\.\/.*\.jpg$/);
const images = requireContext.keys().map(requireContext);

const imagesReducer = (state={}, action)=> {
    switch (action.type) {
        case actions.RECEIVED_IMAGES:
            const {images, currentNumber, totalNumber} = action.payload;
            return Object.assign({}, state, {
                imagesCollection: images, 
                currentNumber: currentNumber, 
                totalNumber: totalNumber
            })
        case actions.RECEIVED_SELECTED_IMG:
            return Object.assign({}, state, {selectedImage: action.payload})
        case actions.RECEIVED_CROPED_IMG:
            return Object.assign({}, state, {cropedImage: action.payload})
        case actions.IMAGES_CHAPTER_PLUS:
            return Object.assign({}, state, {currentNumber: action.payload})
        case actions.IMAGES_CHAPTER_MINUS:
            return Object.assign({}, state, {currentNumber: action.payload})
        case actions.IMAGES_CREATE_TRANSLAREA_BOX:
            return Object.assign({}, state, {createdTranslBox: action.payload})
        case actions.IMAGES_DISPLAY_TRANSLPOPUP:
            return Object.assign({}, state, {hasCropedImg: true})
        case actions.IMAGES_CLEAR_PRE_CROP_AREA:
            return Object.assign({}, state, {hasCropedImg: false, createdTranslBox: null})
        case actions.IMAGES_CLEAR_CROP_BOX:
            return Object.assign({}, state, {hasCropBox: false})
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

export const receivedCropedImg = (payload) => ({
    type: actions.RECEIVED_CROPED_IMG,
    payload
})

export const chapterPlus = (payload) => ({
    type: actions.IMAGES_CHAPTER_PLUS,
    payload
});

export const chapterMinus = (payload) => ({
    type: actions.IMAGES_CHAPTER_MINUS,
    payload
});

export const createTranslAreaBox = (payload) => ({
    type: actions.IMAGES_CREATE_TRANSLAREA_BOX,
    payload
});

export const displayTranslPopUp = ()=> ({
    type: actions.IMAGES_DISPLAY_TRANSLPOPUP
});

export const clearPreCropArea = ()=> ({
    type: actions.IMAGES_CLEAR_PRE_CROP_AREA
});

export const clearCropBox = ()=> ({
    type: actions.IMAGES_CLEAR_CROP_BOX
});

export const getTranslImages = (chapterNumber)=> {
    return (dispatch, getState)=> {
        const data = {
            currentNumber: 2,
            totalNumber: 10,
            images: images
        };
        dispatch(receivedImages(data));
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

export const setClearCropox = ()=> {
    return (dispatch, getState)=> {
        dispatch(clearCropBox());
        dispatch(clearPreCropArea());
    }
};

export const plusChapter = ()=> {
    return (dispatch, getState) => {
        const state = getState();
        let {currentNumber, totalNumber} = state.images;
        let payload = 0;
        if(Number(currentNumber) >= totalNumber){
            payload = totalNumber;
        }else {
            payload = currentNumber + 1;
        }
        dispatch(chapterPlus(payload));
        //dispatch(getTranslImages(payload))
    }
};
export const minusChapter = ()=> {
    return (dispatch, getState) => {
        const state = getState();
        let {currentNumber} = state.images;
        let payload = 0;
        if(Number(currentNumber) <= 2){
            payload = 1;
        }else {
            payload = currentNumber - 1;
        }
        dispatch(chapterMinus(payload));
        //dispatch(getTranslImages(payload))
    }
};

export const createTranslArea = (data)=> {
    return (dispatch, getState)=> {
        dispatch(createTranslAreaBox(data));
        dispatch(displayTranslPopUp());
    }
}


export default imagesReducer;
