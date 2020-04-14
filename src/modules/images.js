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
    receivedOrderNo,
    deleteCropedMarquee,
    getFontsettings
} from './ui';
import services from '../services';
import {
    getURLParamsString,
    mapToObject,
    insertAfter
} from '../utilities';


const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.RECEIVED_IMAGES:
            const { images, chapterPc, jpgPc, chapterIds, comicChapterId, targetLang, comicListId, remark } = action.payload;
            return Object.assign({}, state, {
                imagesCollection: images,
                chapterPc,
                jpgPc,
                chapterIds,
                comicChapterId,
                targetLang,
                comicListId,
                remark
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
        case actions.IMAGES_RECEIVED_MASK_COLOR_SETTINGS:
            return Object.assign({}, state, { maskColorSettings: action.payload })
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
        case actions.IMAGES_CLEAR_RESULT_LAYERS:
            return Object.assign({}, state, { resultLayers: [] })
        case actions.IMAGES_CLEAR_RESULT_BOX_STYLE_PARAMS:
            return Object.assign({}, state, { resultBoxStyleParams: {} })
        case actions.IMAGES_CREATE_RESULT_BOX:
            return Object.assign({}, state, { displayResultBox: action.payload })
        case actions.IMGAGES_RECEIVED_SELECTED_TRANSLIMAGE:
            return Object.assign({}, state, { selectedTranslImage: action.payload })
        case actions.IMGAGES_RECEIVED_RESULT_IMGURL:
            return Object.assign({}, state, { resultImgURL: action.payload })
        case actions.IMGAGES_RECEIVED_RESULT_CANVAS:
            return Object.assign({}, state, { resultCanvas: action.payload })
        case actions.IMGAGES_CLEAR_RESULT_IMGURL:
            return Object.assign({}, state, { resultImgURL: "" })
        case actions.IMGAGES_RECEIVED_CREATED_CROPED_BOX_PARAMS:
            return Object.assign({}, state, { cropedBoxParams: action.payload })
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
                displayResultBox: {}
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

export const receivedMaskColorSettings = (payload) => ({
    type: actions.IMAGES_RECEIVED_MASK_COLOR_SETTINGS,
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

export const clearResultLayers = () => ({
    type: actions.IMAGES_CLEAR_RESULT_LAYERS
});

export const clearResulBoxStyleParams = () => ({
    type: actions.IMAGES_CLEAR_RESULT_BOX_STYLE_PARAMS
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

export const receiveResultCanvas = (payload) => ({
    type: actions.IMGAGES_RECEIVED_RESULT_CANVAS,
    payload
});

export const clearResultImgURL = () => ({
    type: actions.IMGAGES_CLEAR_RESULT_IMGURL
});

export const receivedCreateCropedBoxedParams = (payload) => ({
    type: actions.IMGAGES_RECEIVED_CREATED_CROPED_BOX_PARAMS,
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

export const clearResultCanvas = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { resultCanvas } = state.images;
        const ctx_resultCanvas = resultCanvas.getContext('2d');
        ctx_resultCanvas.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
    }
}

export const clearPreAddedImgLayer = () => {
    return (dispatch, getState) => {
        const addedImgLayers = document.getElementsByClassName("addedImg");
        if(addedImgLayers.length) {
            for(let i = addedImgLayers.length + 1; i >= 0; i--) {
                if(addedImgLayers[i]) {
                    addedImgLayers[i].parentNode.removeChild(addedImgLayers[i]);
                }
            }
        }
    }
}

export const generateCanvasImg = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { imgWidth, imgHeight, status, selectedImage, selectedTranslImage, maskTextImgs } = state.images;
        const canvasContainer = document.getElementById('canvasContainer');
        const uppercanvas = document.getElementById('upper-canvas');
        const uppercanvasImgURL = uppercanvas.toDataURL("image/png");
        const backgroundLayer = document.createElement('div');
        backgroundLayer.style.position = 'absolute';
        backgroundLayer.setAttribute("class", "addedImg");
        const backgroundImg = new Image();
        backgroundImg.width = imgWidth;
        backgroundImg.height = imgHeight;
        backgroundImg.crossOrigin = 'anonymous';
        backgroundImg.src = status ? selectedTranslImage : selectedImage;
        backgroundImg.onload = () => {
            backgroundLayer.appendChild(backgroundImg);
            canvasContainer.insertBefore(backgroundLayer, canvasContainer.childNodes[0]);
        };
        if(Object.keys(maskTextImgs).length) {
            const maskImgFrag = document.createElement('div');
            maskImgFrag.style.position = 'absolute';
            maskImgFrag.setAttribute("class", "addedImg");
            const maskImg = new Image();
            maskImg.width = imgWidth;
            maskImg.height = imgHeight;
            maskImg.src = uppercanvasImgURL;
            maskImg.onload=()=> {
                maskImgFrag.appendChild(maskImg);
                insertAfter(maskImgFrag, backgroundLayer);
            }
        }
    }
};

export const setResultImgURL = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { imgWidth, imgHeight} = state.images;
        dispatch(uiloadingStart());
        dispatch(generateCanvasImg());
        const canvasContainer = document.getElementById('canvasContainer');
        setTimeout(()=> {
            html2canvas(canvasContainer, {
                width: imgWidth,
                height: imgHeight,
                taintTest: true,
                useCORS: true,
                logging: true
            }).then((canvas) => {
                const imgURL = canvas.toDataURL("image/jpeg", 0.8);
                dispatch(receivedResultImgURL(imgURL));
                dispatch(receiveResultCanvas(canvas));
                dispatch(uiloadingComplete());
            }).catch(err => {
                dispatch(uiloadingComplete());
                console.error(err);
            });
        }, 1000)
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
        dispatch(deleteCropedMarquee());
    }
};

export const handlerSelectItem = (selectedImg, translationOrderId) => {
    return (dispatch, getState) => {
        const state = getState();
        const { displayResultBox = {} } = state.images;
        if (Object.keys(displayResultBox).length) {
            dispatch(openModal("promteSave"));
            dispatch(receivedCurrentSelectedItem(selectedImg));
            dispatch(receivedCurrenttranslationOrderId(translationOrderId));
        } else {
            dispatch(handlerSelectImage(selectedImg));
            dispatch(selecteCanvas(translationOrderId));
            dispatch(setClearCropox());
            dispatch(setClearPreTranslResult());
            dispatch(deleteCropedMarquee());
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
        const { orderNo } = state.ui;
        dispatch(uiloadingStart());
        const params = { orderNo };
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
            const {
                chapterIds = [],
                comicJpgs = [],
                chapterPc = "",
                jpgPc = "",
                comicChapterId,
                targetLang = '',
                comicListId,
                remark = ''
            } = imgData;
            dispatch(receivedImages({
                images: comicJpgs,
                chapterPc,
                jpgPc,
                chapterIds,
                targetLang,
                comicListId,
                comicChapterId,
                remark
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
        const { orderNo } = state.ui;
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
                selectedImage: imgSrc,
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
        dispatch(clearResultLayers());
        dispatch(clearResulBoxStyleParams());
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
        const { displayResultBox = {} } = state.images;
        if (Object.keys(displayResultBox).length) {
            dispatch(openModal("promteSave"));
            dispatch(setIsToLastChapter());
        } else {
            dispatch(minusChapter());
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
            dispatch(setClearCropox());
            dispatch(setClearPreTranslResult());
            dispatch(deleteCropedMarquee());
        }
    }
}

export const handlerToNextChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { displayResultBox = {} } = state.images;
        if (Object.keys(displayResultBox).length) {
            dispatch(openModal("promteSave"));
            dispatch(setIsToNextChapter());
        } else {
            dispatch(plusChapter());
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
            dispatch(setClearCropox());
            dispatch(setClearPreTranslResult());
            dispatch(deleteCropedMarquee());
        }
    }
}

export const plusChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { chapterIds = [], comicChapterId } = state.images;
        const chapterId = chapterIds[chapterIds.indexOf(comicChapterId) + 1];
        dispatch(getTranslImages({ chapterId }))
    }
};
export const minusChapter = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { chapterIds = [], comicChapterId } = state.images;
        const chapterId = chapterIds[chapterIds.indexOf(comicChapterId) - 1];
        dispatch(getTranslImages({ chapterId }))
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
            services.clearText({ comicSrc, width, height }).then(({ data }) => {
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
                if (clearedTextData.hasOwnProperty('frontColor') || clearedTextData.hasOwnProperty('backgroundColor')) {
                    const maskColorSettings = {};
                    if(clearedTextData.hasOwnProperty('frontColor')) {
                        maskColorSettings['frontColor'] = clearedTextData.frontColor
                    }
                    if(clearedTextData.hasOwnProperty('backgroundColor')) {
                        maskColorSettings['backgroundColor'] = clearedTextData.backgroundColor
                    }
                    
                    dispatch(receivedMaskColorSettings(maskColorSettings));
                }
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
        dispatch(getFontsettings());
        dispatch(saveOriginAndTransl());
        dispatch(setResultBoxStyle());
        dispatch(createResultLayer(resultLayers));
    }
}
export const saveOriginAndTransl = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber, orderNo } = state.ui;
        const { resultLayers = [] } = state.images;
        let source = '';
        let target = '';
        resultLayers.forEach((item) => {
            if (item.index === startNumber) {
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
        if (Object.keys(currentLayer).length) {
            resultLayers.forEach((item) => {
                if (item.index === startNumber) {
                    item.originalText = originalText
                }
            })
        } else {
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
        if (Object.keys(currentLayer).length) {
            resultLayers.forEach((item) => {
                if (item.index === startNumber) {
                    item.translText = translText
                }
            })
        } else {
            resultLayers.push({
                index: startNumber,
                originalText: "",
                translText: translText
            })
        }
        if (resultLayers.length) {
            resultLayers.forEach((item) => {
                if (item.index === startNumber) {
                    item.translText = translText;
                }
            })
        } else {
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
        const { maskTextImgs = {}, resultLayers = [], displayResultBox = {}, resultBoxStyleParams = {} } = state.images;
        const { startNumber } = state.ui;
        delete maskTextImgs[startNumber];
        delete displayResultBox[startNumber];
        delete resultBoxStyleParams[startNumber];
        resultLayers.forEach((item, key, arr) => {
            if (item.index === startNumber) {
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
        const state = getState();
        const { imgWidth, imgHeight } = state.images;
        dispatch(uiloadingStart());
        dispatch(generateCanvasImg());
        const canvasContainer = document.getElementById('canvasContainer');
        setTimeout(() => {
            html2canvas(canvasContainer, {
                width: imgWidth,
                height: imgHeight,
                useCORS: true,
                logging: true
            }).then((canvas) => {
                const imgURL = canvas.toDataURL("image/jpeg", 0.8);
                dispatch(receiveResultCanvas(canvas));
                dispatch(receivedResultImgURL(imgURL));
                dispatch(saveData());
            }).catch(err => {
                dispatch(uiloadingComplete());
                console.error(err);
            });
        }, 500);

    }
};

export const saveData = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { imagesCollection = [], comicTranslationOrderId, resultImgURL } = state.images;
        services.saveImage({ imgBase64: resultImgURL, comicTranslationOrderId }).then(({ data }) => {
            if (data.code) {
                dispatch(receivedErrorMsg(data.msg));
                setTimeout(() => dispatch(receivedErrorMsg('')), 1500);
            }
            if (data.data.status) {
                dispatch(receiveImgStatus(data.data.status));
                imagesCollection.forEach(item => {
                    if (item.comicTranslationOrderId === comicTranslationOrderId) {
                        item.status = data.data.status
                    }
                });
                dispatch(receivedImagesCollection(imagesCollection));
            }
            dispatch(clearResultImgURL());
            dispatch(clearResultCanvas());
            dispatch(clearPreAddedImgLayer());
            dispatch(clearCreatedTranslBox());
            dispatch(clearMaskTextImgs());
            dispatch(clearPreCropArea());
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
        // const orderNo = getURLParamsString('o');
        const comicTranslationOrderId = getURLParamsString('t');
        const orderNo = 672004019046860;
        dispatch(receivedOrderNo(orderNo));
        if (!isBackToTranslPage) {
            dispatch(getTranslImages({ comicTranslationOrderId }));
        }
        dispatch(getFeedBackMessage());
        dispatch(clearSelectedImage());
    }
}

export const hiddenResultBox = (startNumber) => {
    return (dispatch, getState) => {
        const state = getState();
        const { displayResultBox = {}, resultBoxStyleParams } = state.images;
        delete resultBoxStyleParams[startNumber];
        displayResultBox[startNumber].display = false;
        dispatch(createResultBox(displayResultBox));
    }
};

export default imagesReducer;
