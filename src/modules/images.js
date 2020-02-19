import * as actions from './actions';
import services from '../services';
const requireContext = require.context("../images/", true, /^\.\/.*\.jpg$/);
const images = requireContext.keys().map(requireContext);

const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.RECEIVED_IMAGES:
            const { images, currentNumber, totalNumber } = action.payload;
            return Object.assign({}, state, {
                imagesCollection: images,
                currentNumber: currentNumber,
                totalNumber: totalNumber
            })
        case actions.RECEIVED_SELECTED_IMG:
            return Object.assign({}, state, { selectedImage: action.payload })
        case actions.RECEIVED_CROPED_IMG:
            return Object.assign({}, state, { cropedImage: action.payload })
        case actions.IMAGES_CHAPTER_PLUS:
            return Object.assign({}, state, { currentNumber: action.payload })
        case actions.IMAGES_CHAPTER_MINUS:
            return Object.assign({}, state, { currentNumber: action.payload })
        case actions.IMAGES_RECEIVED_MASK_IMG:
            return Object.assign({}, state, { maskTextImgs: action.payload })
        case actions.IMAGES_RECEIVED_RESULT_BOX_STYLE:
            return Object.assign({}, state, { resultBoxStyleParams: action.payload })
        case actions.IMAGES_CREATE_TRANSLAREA_BOX:
            return Object.assign({}, state, { createdTranslBox: action.payload })
        case actions.IMAGES_CREATE_RESULT_LAYER:
            return Object.assign({}, state, { resultLayers: action.payload })
        case actions.IMAGES_DISPLAY_TRANSL_AREA_BOX:
            return Object.assign({}, state, { hasCropBox: true })
        case actions.IMAGES_DISPLAY_TRANSLPOPUP:
            return Object.assign({}, state, { displayTranslPopUp: true })
        case actions.IMAGES_DISPLAY_TRANSLBOX:
            return Object.assign({}, state, { displayTranslBox: true })
        case actions.IMAGES_HIDDEN_TRANSLBOX:
            return Object.assign({}, state, { displayTranslBox: false })
        case actions.IMAGES_CLEAR_CROP_BOX:
            return Object.assign({}, state, { hasCropBox: false })
        case actions.IMAGES_CLEAR_TRANSL_POP_UP:
            return Object.assign({}, state, { displayTranslPopUp: false })
        case actions.IMAGES_CREATE_RESULT_BOX:
            return Object.assign({}, state, { displayResultBox: action.payload })
        case actions.IMAGES_CLEAR_PRE_CROP_AREA:
            return Object.assign({}, state, {
                hasCropBox: false,
                displayTranslBox: false,
                displayTranslPopUp: false,
                createdTranslBox: null
            })
        default:
            return state
    }
};

export const receivedImages = (payload) => ({
    type: actions.RECEIVED_IMAGES,
    payload
});

export const receiveSelectedImg = (payload) => ({
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

export const receivedMaskImg = (payload) => ({
    type: actions.IMAGES_RECEIVED_MASK_IMG,
    payload
});

export const receivedResultBoxStyle = (payload) => ({
    type: actions.IMAGES_RECEIVED_RESULT_BOX_STYLE,
    payload
});

export const displayTranslPopUp = () => ({
    type: actions.IMAGES_DISPLAY_TRANSLPOPUP
});

export const displayTranslBox = () => ({
    type: actions.IMAGES_DISPLAY_TRANSLBOX
});

export const hiddenTranslBox = () => ({
    type: actions.IMAGES_HIDDEN_TRANSLBOX
});

export const clearPreCropArea = () => ({
    type: actions.IMAGES_CLEAR_PRE_CROP_AREA
});

export const clearCropBox = () => ({
    type: actions.IMAGES_CLEAR_CROP_BOX
});

export const displayTranslAreaBox = () => ({
    type: actions.IMAGES_DISPLAY_TRANSL_AREA_BOX
});

export const clearTranslPopUp = () => ({
    type: actions.IMAGES_CLEAR_TRANSL_POP_UP
});

export const createResultLayer = (payload) => ({
    type: actions.IMAGES_CREATE_RESULT_LAYER,
    payload
});

export const createResultBox = (payload)=> ({
    type: actions.IMAGES_CREATE_RESULT_BOX,
    payload
});

export const getTranslImages = (chapterNumber) => {
    return (dispatch, getState) => {
        const data = {
            currentNumber: 2,
            totalNumber: 10,
            images: images
        };
        dispatch(receivedImages(data));
    }
};

export const selecteCanvas = () => {
    return (dispatch, getState) => {
        const state = getState();
        const images = state.images.imagesCollection;
        const { selectedImg = 0 } = state.ui;
        dispatch(receiveSelectedImg(images[selectedImg]));
    }
}

export const setClearCropox = () => {
    return (dispatch, getState) => {
        dispatch(clearPreCropArea());
    }
};
export const setClearText = (payload) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        const {maskTextImgs = {}, createdTranslBox} = state.images;
        const {left, top, width, height, cropedImg} = createdTranslBox[startNumber];
        let comicSrc = cropedImg.src;
        if(Object.keys(maskTextImgs).length) {
            const currentMaskTextImgs = maskTextImgs[startNumber] || []; 
            comicSrc = currentMaskTextImgs[currentMaskTextImgs.length-1].cropedImg
        }
        const comicMask = payload.src;
        services.clearText({comicSrc, comicMask}).then(({data})=> {
            const clearedTextData = data.data;
            const layerParams = {
                index: startNumber,
                cropedImg: clearedTextData.comicTgt,
                left,
                top,
                width,
                height
            };
            maskTextImgs[startNumber].push(layerParams);
            dispatch(receivedMaskImg(maskTextImgs));
        }).catch(error=> console.error(error));

    }
};

export const resetBrush = ()=> {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        dispatch(receivedMaskImg({[startNumber]: []}))
    }
};

export const undoBrush = ()=> {
    return (dispatch, getState)=> {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        const {maskTextImgs} = state.images;
        const payload = maskTextImgs[startNumber].pop();
        dispatch(receivedMaskImg(payload));
    }
};

export const plusChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        let { currentNumber, totalNumber } = state.images;
        let payload = 0;
        if (Number(currentNumber) >= totalNumber) {
            payload = totalNumber;
        } else {
            payload = currentNumber + 1;
        }
        dispatch(chapterPlus(payload));
    }
};
export const minusChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        let { currentNumber } = state.images;
        let payload = 0;
        if (Number(currentNumber) <= 2) {
            payload = 1;
        } else {
            payload = currentNumber - 1;
        }
        dispatch(chapterMinus(payload));
    }
};

export const createTranslArea = () => {
    return (dispatch, getState) => {
        const state = getState();
        const {startNumber = 0} = state.ui;
        const {maskTextImgs = {}, createdTranslBox} = state.images;
        const {left, top, width, height, cropedImg} = createdTranslBox[startNumber];
        const comicSrc = cropedImg.src;
        services.clearText({comicSrc}).then(({ data }) => {
            const clearedTextData = data.data;
            const layerParams = {
                index: startNumber,
                cropedImg: clearedTextData.comicTgt,
                left,
                top,
                width,
                height
            };
            const newMaskArrary = [];
            newMaskArrary.push(layerParams);
            const combinedLayer = Object.assign({}, maskTextImgs, {[startNumber]: newMaskArrary});
            dispatch(receivedMaskImg(combinedLayer))
            dispatch(getORCText());
        }).catch(error => {
            console.error(error);
        })
    }
}

export const createOriginMask = (payload)=> {
    return (dispatch, getState)=> {
        const state = getState();
        const {startNumber} = state.ui;
        let {createdTranslBox = {}} = state.images;
        createdTranslBox = Object.assign({}, createdTranslBox, {[startNumber]: payload});
        dispatch(createTranslAreaBox(createdTranslBox))
    }
};

export const getORCText = ()=> {
    return (dispatch, getState)=> {
        const state = getState();
        const {startNumber} = state.ui;
        const {resultLayers=[]} = state.images;
        const imgBase64 = state.images.cropedImage.src;
        services.getORC({imgBase64}).then(({data})=> {
            const originTextArray = data.data;
            if(originTextArray.length) {
                const originText = originTextArray.map((item)=> {
                    return item.text
                }).join("");
                resultLayers.push({
                    index: startNumber,
                    originalText: originText,
                    translText: ""
                })
                dispatch(createResultLayer(resultLayers));
                dispatch(getTranslText(originText));
            }
        }).catch(error => console.error(error));
    }
}

export const getTranslText = (originText) => {
    return(dispatch, getState) => {
        const state = getState();
        const {startNumber} = state.ui;
        const {resultLayers=[]} = state.images;
        services.getTranslResult({srcText: originText, orderNo: 871911160398842}).then(({data})=> {
            const translatedText = data.data.result;
            resultLayers.forEach(element => {
                if(element.index === startNumber){
                    element.translText = translatedText
                }
            });
            dispatch(createResultLayer(resultLayers));
        }).catch(error=> console.error(error));
    }
}

export const submitCorrectedText = () => {
    return(dispatch, getState)=> {
        const state = getState();
        const {resultLayers} = state.images;
        dispatch(createResultLayer(resultLayers));
    }
};

export const completeTranslate = () => {
    return(dispatch, getState)=> {
        const state = getState();
        const {startNumber} = state.ui;
        let {resultLayers=[], displayResultBox} = state.images;
        dispatch(clearTranslPopUp());
        displayResultBox = Object.assign({}, displayResultBox, {[startNumber]: {display: true}});
        dispatch(createResultBox(displayResultBox));
        dispatch(setResultBoxStyle());
        dispatch(createResultLayer(resultLayers));
    }
}

export const updateOriginalText = (originalText) => {
    return(dispatch, getState)=> {
        const state = getState();
        const {startNumber} = state.ui;
        const {resultLayers=[]} = state.images;
        resultLayers.forEach((item)=> {
            if(item.index === startNumber){
                item.originalText = originalText;
            }
        })
        dispatch(createResultLayer(resultLayers));
    }
}

export const updateTranslText = (translText) => {
    return(dispatch, getState)=> {
        const state = getState();
        const {startNumber} = state.ui;
        const {resultLayers=[]} = state.images;
        resultLayers.forEach((item)=> {
            if(item.index === startNumber){
                item.translText = translText;
            }
        })
        dispatch(createResultLayer(resultLayers));
    }
}


export const setResultBoxStyle = ()=> {
    return (dispatch, getState)=> {
        const state = getState();
        const {startNumber} = state.ui;
        let {resultBoxStyleParams = {}} = state.images;
        const translResultBoxContainer = document.getElementById("translResultBox-container");
        const payload = {
            left: parseInt(translResultBoxContainer.style.left),
            top: parseInt(translResultBoxContainer.style.top),
            width: parseInt(translResultBoxContainer.style.width),
            height: parseInt(translResultBoxContainer.style.height)
        }
        resultBoxStyleParams = Object.assign({}, resultBoxStyleParams, {[startNumber]: payload})
        dispatch(receivedResultBoxStyle(resultBoxStyleParams))
        dispatch(hiddenTranslBox());
    }
};


export default imagesReducer;
