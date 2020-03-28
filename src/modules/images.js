import * as actions from './actions';
import html2canvas from 'html2canvas';
import {
    uiloadingStart,
    uiloadingComplete,
    isNotBackToTransl,
    handlerSelectImage,
    receivedCurrentSelectedItem,
    receivedCurrenttranslationOrderId,
    receivedErrorMsg,
    openModal,
    closeModal,
    setStartNumber,
    setClearPreTranslResult,
    setIsToLastChapter,
    setIsToNextChapter,
    receivedOrderNo
} from './ui';
import services from '../services';
import {getURLParamsString, mapToObject} from '../utilities';

const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.RECEIVED_IMAGES:
            const { images, chapterPc, jpgPc, chapterIds, comicChapterId, targetLang } = action.payload;
            return Object.assign({}, state, {
                imagesCollection: images,
                chapterPc: chapterPc,
                jpgPc: jpgPc,
                chapterIds: chapterIds,
                comicChapterId: comicChapterId,
                targetLang: targetLang
            })
        case actions.RECEIVED_SELECTED_IMG:
            const { selectedImage, selectedTranslImage, feedbackMsg, status } = action.payload;
            return Object.assign({}, state, {
                selectedImage: selectedImage,
                selectedTranslImage: selectedTranslImage,
                currentTip: feedbackMsg,
                status: status
            })
        case actions.RECEIVED_CROPED_IMG:
            return Object.assign({}, state, { cropedImage: action.payload })
        case actions.IMAGES_RECEIVED_MASK_IMG:
            return Object.assign({}, state, { maskTextImgs: action.payload })
        case actions.IMAGES_RECEIVED_RESULT_BOX_STYLE:
            return Object.assign({}, state, { resultBoxStyleParams: action.payload })
        case actions.IMAGES_RECEIVED_IMG_STATUS:
            return Object.assign({}, state, { status: action.payload })
        case actions.IMAGES_RECEIVED_IMAGES_COLLECTIONS:
            return Object.assign({}, state, { imagesCollection: action.payload })
        case actions.IMAGES_CREATE_TRANSLAREA_BOX:
            return Object.assign({}, state, { createdTranslBox: action.payload })
        case actions.IMAGES_CREATE_RESULT_LAYER:
            return Object.assign({}, state, { resultLayers: action.payload })
        case actions.IMAGES_RECEIVED_TRANSLATION_ORDERID:
            return Object.assign({}, state, { comicTranslationOrderId: action.payload })
        case actions.IMAGES_RECEIVED_IMG_HEIGHT:
            return Object.assign({}, state, { imgWidth: action.width, imgHeight: action.height })
        case actions.IMAGES_DISPLAY_TRANSL_AREA_BOX:
            return Object.assign({}, state, { hasCropBox: true })
        case actions.IMAGES_CLEAR_PRE_MASK_LAYER:
            return Object.assign({}, state, { clearPreMask: true })
        case actions.IMAGES_NOT_CLEAR_PRE_MASK_LAYER:
            return Object.assign({}, state, { clearPreMask: false })
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
        case actions.IMAGES_CLEAR_SELECTED_IMAGE:
            return Object.assign({}, state, { selectedImage: "" })
        case actions.IMAGES_CLEAR_CREATED_TRANSL_BOX:
            return Object.assign({}, state, { createdTranslBox: {} })
        case actions.IMAGES_CLEAR_MASK_TEXT_IMGS:
            return Object.assign({}, state, { maskTextImgs: {} })
        case actions.IMAGES_CREATE_RESULT_BOX:
            return Object.assign({}, state, { displayResultBox: action.payload })
        case actions.IMGAGES_RECEIVED_SELECTED_TRANSLIMAGE:
            return Object.assign({}, state, { selectedTranslImage: action.payload })
        case actions.IMGAGES_RECEIVED_RESULT_IMGURL:
            return Object.assign({}, state, { resultImgURL: action.payload })
        case actions.IMAGES_RECEIVED_FEEDBACK_MESSAGE:
            return Object.assign({}, state, { feedMsg: action.payload })
        case actions.IMAGES_DISABLED_SWITCH_CHAPTER:
            return Object.assign({}, state, { lastChapterDisable: true, nextChapterDisable: true })
        case actions.IMAGES_DISABLED_LAST_CHAPTER:
            return Object.assign({}, state, { lastChapterDisable: true })
        case actions.IMAGES_DISABLED_NEXT_CHAPTER:
            return Object.assign({}, state, { nextChapterDisable: true })
        case actions.IMAGES_ENABLE_SWITCH_CHAPTER:
            return Object.assign({}, state, { lastChapterDisable: false, nextChapterDisable: false })
        case actions.IMAGES_CLEAR_PRE_CROP_AREA:
            return Object.assign({}, state, {
                hasCropBox: false,
                displayTranslBox: false,
                displayTranslPopUp: false,
                createdTranslBox: {},
                resultLayers: [],
                displayResultBox: {},
                resultBoxStyleParams: {}
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

export const receiveImgStatus = (payload) => ({
    type: actions.IMAGES_RECEIVED_IMG_STATUS,
    payload
});

export const receivedImagesCollection = (payload) => ({
    type: actions.IMAGES_RECEIVED_IMAGES_COLLECTIONS,
    payload
});

export const receivedImgHeight = (width, height) => ({
    type: actions.IMAGES_RECEIVED_IMG_HEIGHT,
    width,
    height
});

export const receivedTranslationOrderId = payload => ({
    type: actions.IMAGES_RECEIVED_TRANSLATION_ORDERID,
    payload
});

export const displayTranslPopUp = () => ({
    type: actions.IMAGES_DISPLAY_TRANSLPOPUP
});

export const clearCreatedTranslBox = () => ({
    type: actions.IMAGES_CLEAR_CREATED_TRANSL_BOX
});

export const clearMaskTextImgs = () => ({
    type: actions.IMAGES_CLEAR_MASK_TEXT_IMGS
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

export const clearPreMaskLayer = () => ({
    type: actions.IMAGES_CLEAR_PRE_MASK_LAYER
});

export const setNotClearPreMaskLayer = () => ({
    type: actions.IMAGES_NOT_CLEAR_PRE_MASK_LAYER
});

export const clearTranslPopUp = () => ({
    type: actions.IMAGES_CLEAR_TRANSL_POP_UP
});

export const clearSelectedImage = () => ({
    type: actions.IMAGES_CLEAR_SELECTED_IMAGE
});

export const createResultLayer = (payload) => ({
    type: actions.IMAGES_CREATE_RESULT_LAYER,
    payload
});

export const receivedFeedBackMsg = (payload) => ({
    type: actions.IMAGES_RECEIVED_FEEDBACK_MESSAGE,
    payload
});

export const createResultBox = (payload) => ({
    type: actions.IMAGES_CREATE_RESULT_BOX,
    payload
});

export const receivedSelectedTranslImage = (payload) => ({
    type: actions.IMGAGES_RECEIVED_SELECTED_TRANSLIMAGE,
    payload
});

export const receivedResultImgURL = (payload) => ({
    type: actions.IMGAGES_RECEIVED_RESULT_IMGURL,
    payload
});

export const disabledSwitchChapter = () => ({
    type: actions.IMAGES_DISABLED_SWITCH_CHAPTER
});

export const disabledLastChapter = () => ({
    type: actions.IMAGES_DISABLED_LAST_CHAPTER
});

export const disabledNextChapter = () => ({
    type: actions.IMAGES_DISABLED_NEXT_CHAPTER
});

export const enableSwitchChapter = () => ({
    type: actions.IMAGES_ENABLE_SWITCH_CHAPTER
});

export const setResultImgURL = () => {
    return (dispatch, getState) => {
        dispatch(uiloadingStart());
        const canvasContainer = document.getElementById('canvasContainer');
        html2canvas(canvasContainer).then((canvas)=> {
            const imgURL = canvas.toDataURL("image/jpeg");
            dispatch(receivedResultImgURL(imgURL));
            dispatch(uiloadingComplete());
        });
        
    }
};

export const abandonSaveAction = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { currentSelectedItem, currentTranslationOrderId, isToLastChapter, isToNextChapter } = state.ui;
        dispatch(closeModal());
        if (currentSelectedItem && currentTranslationOrderId) {
            dispatch(handlerSelectImage(currentSelectedItem));
            dispatch(selecteCanvas(currentTranslationOrderId));
        }
        if (isToLastChapter) {
            dispatch(minusChapter());
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
        }
        if (isToNextChapter) {
            dispatch(plusChapter());
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
        }
        dispatch(setStartNumber(0));
        dispatch(setClearCropox());
        dispatch(setClearPreTranslResult());
    }
};

export const handlerSelectItem = (selectedImg, translationOrderId) => {
    return (dispatch, getState) => {
        const state = getState();
        const { resultLayers = [] } = state.images;
        if (resultLayers.length) {
            dispatch(openModal("promteSave"));
            dispatch(receivedCurrentSelectedItem(selectedImg));
            dispatch(receivedCurrenttranslationOrderId(translationOrderId));
        } else {
            dispatch(handlerSelectImage(selectedImg));
            dispatch(selecteCanvas(translationOrderId));
            dispatch(setClearPreTranslResult());
        }
    }
};

export const initialChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { chapterIds = [], comicChapterId } = state.images;
        if (chapterIds.length) {
            switch (chapterIds.length) {
                case 0:
                case 1:
                    dispatch(disabledSwitchChapter())
                    break;
                case 2:
                    if (chapterIds.indexOf(comicChapterId) === 0) {
                        dispatch(disabledLastChapter())
                    } else {
                        dispatch(disabledNextChapter())
                    }
                    break;
                case 3:
                    if (chapterIds.indexOf(comicChapterId) === 0) {
                        dispatch(disabledLastChapter())
                    } else if (chapterIds.indexOf(comicChapterId) === 2) {
                        dispatch(disabledNextChapter())
                    } else {
                        dispatch(enableSwitchChapter())
                    }
                    break;
                default:
                    if (chapterIds.indexOf(comicChapterId) === 0) {
                        dispatch(disabledLastChapter())
                    } else if (chapterIds.indexOf(comicChapterId) === chapterIds.length - 1) {
                        dispatch(disabledNextChapter())
                    } else {
                        dispatch(enableSwitchChapter())
                    }
                    break;
            }
        }
    }
};

export const getTranslImages = (payload) => {
    return (dispatch, getState) => {
        const state = getState();
        const {orderNo} = state.ui;
        dispatch(uiloadingStart());
        const params = {orderNo};
        if (payload) {
            if (payload.chapterId) {
                params.chapterId = payload.chapterId;
            }
            if (payload.comicTranslationOrderId) {
                params.comicTranslationOrderId = payload.comicTranslationOrderId;
            }
            if (payload.orderNo) {
                params.orderNo = payload.orderNo;
            }
        }
        services.getImageData(params).then(({ data }) => {
            const imgData = data.data;
            const { chapterIds = [], comicJpgs = [], chapterPc = "", jpgPc = "", comicChapterId, targetLang = '' } = imgData;
            dispatch(receivedImages({
                images: comicJpgs,
                chapterPc,
                jpgPc,
                chapterIds,
                targetLang,
                comicChapterId
            }));
            const defaultTranslationOrderId = comicJpgs[0].comicTranslationOrderId;
            dispatch(initialChapter());
            dispatch(isNotBackToTransl());
            dispatch(handlerSelectItem(1, defaultTranslationOrderId));
        }).catch(err => {
            dispatch(uiloadingComplete());
            console.error(err);
        })

    }
};

export const getFeedBackMessage = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        const {orderNo} = state.ui;
        services.getFeedBackMsg(id, orderNo).then(({ data }) => {
            dispatch(receivedFeedBackMsg(data.data));
        }).catch(err => console.error(err))
    }
};

export const selecteCanvas = (id) => {
    return (dispatch, getState) => {
        dispatch(uiloadingStart());
        dispatch(receivedTranslationOrderId(id));
        services.getLargeImageData(id).then(({ data }) => {
            const { imgSrc, feedbackMsg, status, imgTgt } = data.data;
            dispatch(receiveSelectedImg({
                selectedImage: imgSrc || imgTgt,
                selectedTranslImage: imgTgt,
                feedbackMsg,
                status
            }));
            dispatch(uiloadingComplete());
        }).catch(err => {
            dispatch(uiloadingComplete());
            console.log(err);
        })
    }
}

export const setClearCropox = () => {
    return (dispatch, getState) => {
        dispatch(clearCreatedTranslBox());
        dispatch(clearMaskTextImgs());
        dispatch(clearPreCropArea());
    }
};
export const setClearText = (payload) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        const { maskTextImgs = {}, createdTranslBox } = state.images;
        const { left, top, width, height, cropedImg } = createdTranslBox[startNumber];
        let comicSrc = cropedImg.src;
        if (Object.keys(maskTextImgs).length) {
            const currentMaskTextImgs = maskTextImgs[startNumber] || [];
            comicSrc = currentMaskTextImgs[currentMaskTextImgs.length - 1].cropedImg
        }
        const comicMask = payload.src;
        dispatch(uiloadingStart());
        services.clearText({ comicSrc, comicMask }).then(({ data }) => {
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
            dispatch(uiloadingComplete());
        }).catch(error => {
            console.error(error);
            dispatch(uiloadingComplete());
        });

    }
};

export const resetBrush = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        dispatch(receivedMaskImg({ [startNumber]: [] }))
    }
};

export const undoBrush = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        const { maskTextImgs } = state.images;
        const payload = maskTextImgs[startNumber].pop();
        dispatch(receivedMaskImg(payload));
    }
};

export const handlerToLastChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { resultLayers = [] } = state.images;
        if (resultLayers.length) {
            dispatch(openModal("promteSave"));
            dispatch(setIsToLastChapter());
        } else {
            dispatch(minusChapter());
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
            dispatch(setClearPreTranslResult());
        }
    }
}

export const handlerToNextChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { resultLayers = [] } = state.images;
        if (resultLayers.length) {
            dispatch(openModal("promteSave"));
            dispatch(setIsToNextChapter());
        } else {
            dispatch(plusChapter());
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
            dispatch(setClearPreTranslResult());
        }
    }
}

export const plusChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { chapterIds = [], comicChapterId } = state.images;
        const chapterId = chapterIds[chapterIds.indexOf(comicChapterId) + 1];
        dispatch(getTranslImages({ chapterId}))
    }
};
export const minusChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { chapterIds = [], comicChapterId } = state.images;
        const chapterId = chapterIds[chapterIds.indexOf(comicChapterId) - 1];
        dispatch(getTranslImages({ chapterId}))
    }
};

export const createTranslArea = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0, switchAutoClear = true, switchAutoOCR = true } = state.ui;
        const { maskTextImgs = {}, createdTranslBox } = state.images;
        const { left, top, width, height, cropedImg } = createdTranslBox[startNumber];
        const comicSrc = cropedImg.src;
        if (switchAutoClear) {
            dispatch(uiloadingStart());
            services.clearText({ comicSrc }).then(({ data }) => {
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
                const combinedLayer = Object.assign({}, maskTextImgs, { [startNumber]: newMaskArrary });
                dispatch(receivedMaskImg(combinedLayer));
                if (switchAutoOCR) dispatch(getORCText());
                dispatch(uiloadingComplete());
            }).catch(error => {
                dispatch(uiloadingComplete());
                console.error(error);
            })
        }
    }
}

export const createOriginMask = (payload) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber } = state.ui;
        let { createdTranslBox = {} } = state.images;
        createdTranslBox = Object.assign({}, createdTranslBox, { [startNumber]: payload });
        dispatch(createTranslAreaBox(createdTranslBox));
    }
};

export const getORCText = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber, switchAutoTranslate = true } = state.ui;
        const { resultLayers = [] } = state.images;
        const imgBase64 = state.images.cropedImage.src;
        dispatch(uiloadingStart());
        services.getORC({ imgBase64 }).then(({ data }) => {
            const originTextArray = data.data;
            if (originTextArray.length) {
                const originText = originTextArray.map((item) => {
                    return item.text
                }).join("");
                resultLayers.push({
                    index: startNumber,
                    originalText: originText,
                    translText: ""
                })
                dispatch(createResultLayer(resultLayers));
                if (switchAutoTranslate) dispatch(getTranslText(originText));
                dispatch(uiloadingComplete());
            }
        }).catch(error => {
            console.error(error);
            dispatch(uiloadingComplete());
        });
    }
}

export const getTranslText = (originText) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber, orderNo } = state.ui;
        const { resultLayers = [] } = state.images;
        services.getTranslResult({ srcText: originText, orderNo }).then(({ data }) => {
            const translatedText = data.data.result;
            if (translatedText) {
                resultLayers.forEach(element => {
                    if (element.index === startNumber) {
                        element.translText = translatedText;
                    }
                });
            }
            dispatch(createResultLayer(resultLayers));
        }).catch(error => console.error(error));
    }
}

export const submitCorrectedText = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { resultLayers } = state.images;
        dispatch(createResultLayer(resultLayers));
    }
};

export const completeTranslate = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber } = state.ui;
        let { resultLayers = [], displayResultBox } = state.images;
        dispatch(clearTranslPopUp());
        displayResultBox = Object.assign({}, displayResultBox, { [startNumber]: { display: true } });
        dispatch(createResultBox(displayResultBox));
        dispatch(saveOriginAndTransl());
        dispatch(setResultBoxStyle());
        dispatch(createResultLayer(resultLayers));
    }
}
export const saveOriginAndTransl = () => {
    return (dispatch, getState)=> {
        const state = getState();
        const {startNumber, orderNo} = state.ui;
        const {resultLayers = []} = state.images;
        let source = '';
        let target = '';
        resultLayers.forEach((item)=> {
            if(item.index === startNumber) {
                source = item.originalText;
                target = item.translText;
            }
        })
        const payload = {
            orderNo,
            source,
            target
        };
        services.saveTranslation(payload);
    }
};

export const updateOriginalText = (originalText) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber } = state.ui;
        const { resultLayers = [] } = state.images;
        const resultLayersToObject = mapToObject(resultLayers, 'index');
        const currentLayer = resultLayersToObject[startNumber] || {};
        if(Object.keys(currentLayer).length){
            resultLayers.forEach((item)=> {
                if(item.index === startNumber){
                    item.originalText = originalText
                }
            })
        }else {
            resultLayers.push({
                index: startNumber,
                originalText: originalText,
                translText: ""
            })
        }
        dispatch(createResultLayer(resultLayers));
    }
}

export const updateTranslText = (translText) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber } = state.ui;
        const { resultLayers = [] } = state.images;
        const resultLayersToObject = mapToObject(resultLayers, 'index');
        const currentLayer = resultLayersToObject[startNumber] || {};
        if(Object.keys(currentLayer).length){
            resultLayers.forEach((item)=> {
                if(item.index === startNumber){
                    item.translText = translText
                }
            })
        }else {
            resultLayers.push({
                index: startNumber,
                originalText: "",
                translText: translText
            })
        }
        if(resultLayers.length) {
            resultLayers.forEach((item) => {
                if (item.index === startNumber) {
                    item.translText = translText;
                }
            })
        }else {
            resultLayers.push({
                index: startNumber,
                originalText: "",
                translText: translText
            })
        }
        
        dispatch(createResultLayer(resultLayers));
    }
}

export const clearPreCropAreaParams = () => {
    return (dispatch, getState) => {
        const state = getState();
        const {maskTextImgs = {}, resultLayers = [], displayResultBox = {}, resultBoxStyleParams = {}} = state.images;
        const {startNumber} = state.ui;
        delete maskTextImgs[startNumber];
        delete displayResultBox[startNumber];
        delete resultBoxStyleParams[startNumber];
        resultLayers.forEach((item, key, arr)=> {
            if(item.index === startNumber) {
                arr.splice(key, 1);
            }
        });
        dispatch(clearCropBox());
        dispatch(hiddenTranslBox());
        dispatch(clearTranslPopUp());
    }
};

export const setResultBoxStyle = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber } = state.ui;
        let { resultBoxStyleParams = {} } = state.images;
        const translResultBoxContainer = document.getElementById("translResultBox-container");
        const payload = {
            left: parseInt(translResultBoxContainer.style.left),
            top: parseInt(translResultBoxContainer.style.top),
            width: parseInt(translResultBoxContainer.style.width),
            height: parseInt(translResultBoxContainer.style.height),
            transform: translResultBoxContainer.style.transform
        }
        resultBoxStyleParams = Object.assign({}, resultBoxStyleParams, { [startNumber]: payload })
        dispatch(receivedResultBoxStyle(resultBoxStyleParams))
        dispatch(hiddenTranslBox());
    }
};

export const setSaveData = () => {
    return (dispatch, getState) => {
        dispatch(uiloadingStart());
        const canvasContainer = document.getElementById('canvasContainer');
        html2canvas(canvasContainer).then((canvas)=> {
            const imgURL = canvas.toDataURL("image/jpeg");
            dispatch(receivedResultImgURL(imgURL));
            dispatch(saveData())
         });
    }
};

export const saveData = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { imagesCollection = [], comicTranslationOrderId, resultImgURL } = state.images;
        services.saveImage({ imgBase64: resultImgURL, comicTranslationOrderId }).then(({ data }) => {
            dispatch(setClearCropox());
            if (data.code) {
                dispatch(receivedErrorMsg(data.msg));
                setTimeout(() => dispatch(receivedErrorMsg('')), 1500);
            }
            if(data.data.status) {
                dispatch(receiveImgStatus(data.data.status));
                imagesCollection.forEach(item => {
                    if(item.comicTranslationOrderId === comicTranslationOrderId) {
                        item.status = data.data.status
                    }
                });
                dispatch(receivedImagesCollection(imagesCollection));
            }
            dispatch(uiloadingComplete());
        }).catch(err => {
            dispatch(uiloadingComplete());
            console.error(err);
        })
    }
};

export const restoreTranslPic = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { selectedImage } = state.images;
        dispatch(receivedSelectedTranslImage(selectedImage));
        dispatch(receivedResultImgURL(selectedImage));
    }
};

export const initialTranslPage = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { isBackToTranslPage } = state.ui;
        const orderNo = getURLParamsString('o');
        const comicTranslationOrderId = getURLParamsString('t');
        // const orderNo = 672003198744550;
        dispatch(receivedOrderNo(orderNo));
        if (!isBackToTranslPage) {
            dispatch(getTranslImages({comicTranslationOrderId}));
        }
        dispatch(getFeedBackMessage());
        dispatch(clearSelectedImage());
    }
}

export const hiddenResultBox = (startNumber)=> {
    return (dispatch, getState) => {
        const state = getState();
        const {displayResultBox = {}} = state.images;
        displayResultBox[startNumber].display = false;
        dispatch(createResultBox(displayResultBox));
    }
};

export default imagesReducer;
