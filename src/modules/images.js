import * as actions from './actions';
import html2canvas from 'html2canvas';
import io from 'socket.io-client';
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
    setIsToSelectChapter,
    receivedOrderNo,
    deleteCropedMarquee,
    getFontsettings,
    setStopClearPreResultContainer,
    updateMaskBackgroundStart,
    handlerClearUiFont,
    updateSelectedTranslImage,
    clearSelectedTranslImage,
    updateFeedBackMsg
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
            const { imgSrc, feedbackMsg, status, imgTgt } = action.payload;
            const date = new Date();
            return Object.assign({}, state, {
                selectedImage: imgSrc + `?t=${date.valueOf()}`,
                currentTip: feedbackMsg,
                selectedTranslImage: imgTgt + `?t=${date.valueOf()}`,
                status
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
        case actions.IMAGES_RECEIVED_TRANSLATEDHTML:
            return Object.assign({}, state, { resultHtmlLayers: action.payload })
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
        case actions.IMAGES_CLEAR_RESULT_HTML_LAYERS:
            return Object.assign({}, state, { resultHtmlLayers: [] })
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
        case actions.IMGAGES_CLEAR_CREATED_CROPED_BOX_PARAMS:
            return Object.assign({}, state, { cropedBoxParams: {} })
        case actions.IMAGES_RECEIVED_FEEDBACK_MESSAGE:
            return Object.assign({}, state, { feedMsg: action.payload })
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

export const clearResultHtmlLayers = () => ({
    type: actions.IMAGES_CLEAR_RESULT_HTML_LAYERS
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

export const receivedTranslatedHtml = (payload) => ({
    type: actions.IMAGES_RECEIVED_TRANSLATEDHTML,
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

export const clearCropedBoxedParams = () => ({
    type: actions.IMGAGES_CLEAR_CREATED_CROPED_BOX_PARAMS
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
export const clearPreResultContainer = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { clearPreTranslResult } = state.ui;
        if(clearPreTranslResult) {
            dispatch(setStopClearPreResultContainer());
        }
    }
};
export const generateCanvasImg = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { imgWidth, imgHeight, status, selectedImage, selectedTranslImage, maskTextImgs } = state.images;
        const canvasContainer = document.getElementById('canvasContainer');
        const uppercanvas = document.getElementById('upper-canvas');
        const uppercanvasImgURL = uppercanvas.toDataURL("image/png");
        const backgroundLayer = document.createElement('div');
        const backgroundImgURL = status && selectedTranslImage ? selectedTranslImage : selectedImage;
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        backgroundLayer.style.position = 'absolute';
        backgroundLayer.style.width = imgWidth + 'px';
        backgroundLayer.style.height = imgHeight + 'px';
        backgroundLayer.setAttribute("class", "addedImg");
        const backgroundImg = new Image();
        backgroundImg.width = imgWidth;
        backgroundImg.height = imgHeight;
        backgroundImg.crossOrigin = 'anonymous';
        backgroundImg.src = backgroundImgURL;
        backgroundImg.onload = () => {
            backgroundLayer.appendChild(backgroundImg);
            canvasContainer.insertBefore(backgroundLayer, canvasContainer.childNodes[0]);
            if(Object.keys(maskTextImgs).length) {
                const maskImgFrag = document.createElement('div');
                maskImgFrag.style.position = 'absolute';
                maskImgFrag.style.width = imgWidth + 'px';
                maskImgFrag.style.height = imgHeight + 'px';
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
        };

        backgroundImg.onerror = ()=> {
            console.error("catch error img------------", backgroundImgURL)
        }
    }
};

export const setResultImgURL = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { imgWidth, imgHeight} = state.images;
        dispatch(uiloadingStart());
        dispatch(generateCanvasImg());
        setTimeout(()=> {
            const canvasContainer = document.getElementById('canvasContainer').cloneNode(true);
            canvasContainer.style = {
                backgroundColor: "white",
                position: "absolute",
                top: "30px",
                zIndex: -1,
                width: imgWidth,
                height: imgHeight
            }
            
            document.getElementById('inner-wrap').appendChild(canvasContainer);
            html2canvas(canvasContainer, {
                width: imgWidth,
                height: imgHeight,
                taintTest: false,
                useCORS: true,
                logging: true
            }).then((canvas) => {
                canvasContainer.parentNode.removeChild(canvasContainer);
                const imgURL = canvas.toDataURL("image/jpeg");
                dispatch(receivedResultImgURL(imgURL));
                dispatch(receiveResultCanvas(canvas));
                dispatch(uiloadingComplete());
            }).catch(err => {
                dispatch(uiloadingComplete());
                console.error(err);
            });
        }, 3000)
    }
};

export const abandonSaveAction = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { currentSelectedItem, currentTranslationOrderId, selectedChapterId } = state.ui;
        dispatch(closeModal());
        if (currentSelectedItem && currentTranslationOrderId) {
            dispatch(handlerSelectImage(currentSelectedItem));
            dispatch(selecteCanvas(currentTranslationOrderId));
        }
        if (selectedChapterId) {
            dispatch(getTranslImages({ chapterId: selectedChapterId }))
            dispatch(handlerSelectImage(1));
            dispatch(clearSelectedImage());
        }
        dispatch(setStartNumber(0));
        dispatch(setClearCropox());
        dispatch(setClearPreTranslResult());
        dispatch(deleteCropedMarquee());
        dispatch(updateSelectedTranslImage());
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
            const workbenchMain = document.getElementById("workbenchMain");
            workbenchMain.scrollTop = 0;
            dispatch(setClearCropox());
            dispatch(setClearPreTranslResult());
            dispatch(deleteCropedMarquee());
            dispatch(handlerClearUiFont());
            dispatch(handlerSelectImage(selectedImg));
            dispatch(selecteCanvas(translationOrderId));
            dispatch(updateSelectedTranslImage());
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
                remark = '',
                translatingJpgId
            } = imgData;
            dispatch(receivedImages({
                images: comicJpgs,
                chapterPc,
                jpgPc,
                chapterIds,
                targetLang,
                comicListId,
                comicChapterId,
                remark,
                translatingJpgId
            }));
            dispatch(isNotBackToTransl());
            let selectedImg = 1;
            comicJpgs.forEach((item, index) => {
                if(item.comicTranslationOrderId === translatingJpgId) {
                    selectedImg = index + 1;
                }
            })
            if(selectedImg) dispatch(handlerSelectItem(selectedImg, translatingJpgId));
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
            dispatch(initialFeedBackMessage());
        }).catch(err => console.error(err))
    }
};

export const initialFeedBackMessage = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { feedMsg = [] } = state.images;
        const { orderNo } = state.ui;
        const socket =  io.connect('https://www.hitranslator.com/fbm?orderNo=' + orderNo);
        socket.on('connect', ()=> {
            console.log('Client has connected to the server!');
        });

        socket.on('receiveMsg', data => {
            feedMsg.push(data);
            dispatch(receivedFeedBackMsg(feedMsg));
            dispatch(updateFeedBackMsg());
        });

        socket.on('disconnect', ()=> {
            console.log('The client has disconnected!');
        });
        
    }
}

export const selecteCanvas = (id) => {
    return (dispatch, getState) => {
        dispatch(uiloadingStart());
        dispatch(receivedTranslationOrderId(id));
        services.getLargeImageData(id).then(({ data }) => {
            dispatch(receiveSelectedImg(data.data));
            dispatch(clearPreResultContainer());
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
        dispatch(clearResultHtmlLayers());
        dispatch(clearResulBoxStyleParams());
        dispatch(clearPreCropArea());
    }
};
export const setClearText = (payload) => {
    return (dispatch, getState) => {
        const state = getState();
        const { startNumber = 0 } = state.ui;
        let { maskTextImgs = {}, createdTranslBox } = state.images;
        const { left, top, width, height, cropedImg } = createdTranslBox[startNumber];
        let comicSrc = cropedImg.src;
        const currentMaskTextImgs = maskTextImgs[startNumber] || [];
        if (currentMaskTextImgs.length) {
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
            if(currentMaskTextImgs.length) {
                maskTextImgs[startNumber].push(layerParams)
            }else {
                maskTextImgs[startNumber] = [layerParams]
            }
            dispatch(receivedMaskImg(maskTextImgs));
            dispatch(updateMaskBackgroundStart())
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

export const handlerToSelectChapter = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        const { displayResultBox = {} } = state.images;
        if (Object.keys(displayResultBox).length) {
            dispatch(openModal("promteSave"));
            dispatch(setIsToSelectChapter(id));
        } else {
            dispatch(handlerSelectImage(1));
            dispatch(getTranslImages({ chapterId: id }));
            dispatch(clearSelectedImage());
            dispatch(setClearCropox());
            dispatch(setClearPreTranslResult());
            dispatch(deleteCropedMarquee());
            dispatch(updateSelectedTranslImage());
        }
    }
}

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
        const { resultLayers = [], targetLang } = state.images;
        const imgBase64 = state.images.cropedImage.src;
        dispatch(uiloadingStart());
        services.getORC({ imgBase64, targetLang }).then(({ data }) => {
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

export const updatedTranslatedHtml = (translatedHtml) => {
    return (dispatch, getState) => {
        const state = getState();
        const {startNumber} = state.ui;
        const {resultHtmlLayers = []} = state.images;
        const resultHtmlLayersToObject = mapToObject(resultHtmlLayers, 'index');
        const currenHtmltLayer = resultHtmlLayersToObject[startNumber] || {};
        if (Object.keys(currenHtmltLayer).length) {
            resultHtmlLayers.forEach((item) => {
                if (item.index === startNumber) {
                    item.translatedHtml = translatedHtml
                }
            })
        } else {
            resultHtmlLayers.push({
                index: startNumber,
                translatedHtml: translatedHtml
            })
        }
        if(resultHtmlLayers.length) {
            resultHtmlLayers.forEach( item => {
                if(item.index === startNumber) {
                    item.translatedHtml = translatedHtml
                }
            })
        }else {
            resultHtmlLayers.push({
                index: startNumber,
                translatedHtml: translatedHtml
            })
        }
        dispatch(receivedTranslatedHtml(resultHtmlLayers));
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
        setTimeout(() => {
            const canvasContainer = document.getElementById('canvasContainer').cloneNode(true);
            canvasContainer.style = {
                backgroundColor: "white",
                position: "absolute",
                top: "30px",
                zIndex: -1,
                width: imgWidth,
                height: imgHeight
            }
            document.getElementById('inner-wrap').appendChild(canvasContainer);
            html2canvas(canvasContainer, {
                width: imgWidth,
                height: imgHeight,
                useCORS: true,
                logging: true
            }).then((canvas) => {
                canvasContainer.parentNode.removeChild(canvasContainer);
                const imgURL = canvas.toDataURL("image/jpeg");
                dispatch(receiveResultCanvas(canvas));
                dispatch(receivedResultImgURL(imgURL));
                dispatch(saveData());
            }).catch(err => {
                dispatch(uiloadingComplete());
                console.error(err);
            });
        }, 3000);

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
                const translateImgURL = data.data.imgTgt;
                const date = new Date();
                dispatch(receiveImgStatus(data.data.status));
                dispatch(receivedSelectedTranslImage(translateImgURL+`?t=${date.valueOf()}`));
                dispatch(updateSelectedTranslImage());
                imagesCollection.forEach(item => {
                    if (item.comicTranslationOrderId === comicTranslationOrderId) {
                        item.status = data.data.status
                    }
                });
                dispatch(receivedImagesCollection(imagesCollection));
                setTimeout(()=> {
                    dispatch(clearSelectedTranslImage());
                    dispatch(setClearCropox());
                    dispatch(setClearPreTranslResult());
                    dispatch(handlerClearUiFont());
                    dispatch(deleteCropedMarquee());
                }, 100);
            }
            
        }).then(()=>{
            setTimeout(()=> {
                dispatch(clearResultImgURL());
                dispatch(clearResultCanvas());
                dispatch(clearPreAddedImgLayer());
                dispatch(uiloadingComplete());
            }, 1000);
           
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
        dispatch(updateSelectedTranslImage());
        dispatch(receivedSelectedTranslImage(selectedImage));
        dispatch(receivedResultImgURL(selectedImage));
    }
};

export const initialTranslPage = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { isBackToTranslPage } = state.ui;
        const { comicTranslationOrderId = getURLParamsString('t'), comicChapterId } = state.images;
        const orderNo = getURLParamsString('o');
        // const orderNo = 672005258540000;
        dispatch(receivedOrderNo(orderNo));
        if (isBackToTranslPage) {
            dispatch(getTranslImages({ chapterId: comicChapterId }));
        }else {
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
