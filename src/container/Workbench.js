import React from 'react';
import { connect } from 'react-redux';
import { Workbench } from '../components';
import {
    handlerZoomCanvasBech,
    handlerZoomCanvasPlus,
    handlerZoomCanvasMinus,
    setCorrectTranslResult,
    openModal,
    closeModal,
    setStartNumber,
    getFontsettings,
    setStopClearPreResultContainer,
    handlerSelectImage,
    setGlobalFontFamily,
    setWholeFontSize,
    setWholeFontColor,
    setWholeFontTextAlign,
    setWholeFontLineHeight,
    setGlobalFontStyle,
    setGlobalFontWeight,
    setGlobalFontDirection,
    setGlobalFontTextCase
} from '../modules/ui';
import {
    receivedCropedImg,
    createTranslArea,
    createOriginMask,
    displayTranslPopUp,
    displayTranslBox,
    hiddenTranslBox,
    clearPreCropAreaParams,
    setClearText,
    displayTranslAreaBox,
    clearTranslPopUp,
    clearCropBox,
    resetBrush,
    undoBrush,
    updateOriginalText,
    updateTranslText,
    submitCorrectedText,
    getTranslText,
    completeTranslate,
    getTranslImages,
    receivedImgHeight,
    clearSelectedImage,
    hiddenResultBox,
    clearPreMaskLayer,
    setNotClearPreMaskLayer
} from '../modules/images';
import {
    selectFontFamily,
    selectFontSize,
    selectFontColor,
    selectFontStyle,
    selectFontWeight,
    selectFontTextAlign,
    selectFontOutlineColor,
    selectFontShadowColor,
    selectFontOutlineSize,
    selectFontShadowSize,
    openPopupAbsorbColor,
    closePopupAbsorbColor,
    selectLineHeight,
    selectFontDirection,
    selectFontTextCase
} from '../modules/fontSettings';
import {
    settingBrushWidth
} from '../modules/brushSettings';
import { mapToObject } from '../utilities';


function WorkbenchContainer(props) {
    return (
        <Workbench {...props} />
    )
}

const mapStateToProps = (state) => {
    const { images, ui, brush } = state;
    const {
        selectedImage,
        selectedTranslImage,
        cropedImage,
        displayTranslPopUp,
        displayTranslBox,
        createdTranslBox,
        hasCropBox,
        maskTextImgs,
        resultLayers = [],
        displayResultBox = {},
        resultBoxStyleParams = {},
        currentTip,
        status,
        imgHeight,
        clearPreMask,
        targetLang
    } = images;
    const {
        zoomCanvasValue = 1,
        modalOpen,
        modalId,
        marquee,
        hasCorrect,
        startNumber = 0,
        font = {},
        selectedImg,
        clearPreTranslResult,
        wholeFonFamily,
        wholeFontSize,
        wholeFontColor,
        wholeFontTextAlign,
        wholeFontLineHeight,
        globalHasFontItalic,
        globalHasFontWeight,
        globalFontDirection,
        globalFontTextCase
    } = ui;
    const resultLayersToObject = mapToObject(resultLayers, 'index');
    const currentLayer = resultLayersToObject[startNumber] || {};
    const originORCText = currentLayer.originalText;
    const translatedText = currentLayer.translText;
    const currentDisplayResult = displayResultBox[startNumber] || {};
    let targetLanguage = 'en';
    let defaultFontFamily = 'CCWildWords';
    switch (targetLang) {
        case 'vi':
            targetLanguage = targetLang;
            defaultFontFamily = 'OOOCAPTAINCOMIC-regular';
            break;
        case 'th':
            targetLanguage = targetLang;
            defaultFontFamily = 'Waffle Regular';
            break;
        case 'zh':
            targetLanguage = targetLang;
            defaultFontFamily = 'Microsoft YaHei';
            break;
        default:
            targetLanguage = 'en';
            defaultFontFamily = 'CCWildWords';
    }
    const currentFont = font[startNumber] || {};
    if(!currentFont.font_family) {
        currentFont.font_family = wholeFonFamily || defaultFontFamily;
    }
    return {
        selectedImage,
        selectedTranslImage,
        cropedImage,
        displayTranslPopUp,
        displayTranslBox,
        createdTranslBox,
        hasCropBox,
        zoomCanvasValue,
        modalOpen,
        modalId,
        marquee,
        font: currentFont,
        brush,
        maskTextImgs,
        hasCorrect,
        startNumber,
        originORCText,
        translatedText,
        resultLayers,
        displayResultBox: currentDisplayResult.display,
        resultBoxStyleParams,
        selectedImg,
        clearPreTranslResult,
        currentTip,
        status,
        imgHeight,
        clearPreMask,
        targetLang: targetLanguage,
        wholeFontSize,
        wholeFontColor,
        wholeFontTextAlign,
        wholeFontLineHeight,
        globalHasFontItalic,
        globalHasFontWeight,
        globalFontDirection,
        globalFontTextCase
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        zoomCanvasBech: e => {
            dispatch(handlerZoomCanvasBech(e.target.value));
        },
        zoomCanvasPlus: value => {
            dispatch(handlerZoomCanvasPlus(value));
        },
        zoomCanvasMinus: value => {
            dispatch(handlerZoomCanvasMinus(value));
        },
        openModal: (id) => {
            dispatch(openModal(id));
        },
        closeModal: () => {
            dispatch(closeModal());
        },
        createStartNumber: startNumber => {
            dispatch(setStartNumber(startNumber));
        },
        setCropImg: data => {
            dispatch(receivedCropedImg(data.cropedImg))
            dispatch(createOriginMask(data));
            dispatch(createTranslArea());
            dispatch(displayTranslAreaBox());
            dispatch(setStopClearPreResultContainer());
            dispatch(setNotClearPreMaskLayer())
        },
        createNewCropArea: (displayTranslBox) => {
            dispatch(clearPreCropAreaParams());
            dispatch(clearPreMaskLayer());
            if (!displayTranslBox) {
                dispatch(resetBrush());
            }
        },
        createMaskLayer: payload => {
            dispatch(setClearText(payload))
        },
        tabToTranslate: () => {
            dispatch(displayTranslPopUp());
            dispatch(displayTranslBox());
            dispatch(clearCropBox());
        },
        tabToClearText: () => {
            dispatch(displayTranslAreaBox());
            dispatch(clearTranslPopUp());
            dispatch(hiddenTranslBox());
        },
        correctTransl: payload => {
            dispatch(setCorrectTranslResult(payload));
            if (payload) {
                dispatch(submitCorrectedText());
            }
        },
        hanlerChangeORCText: (e) => {
            dispatch(updateOriginalText(e.target.value))
        },
        handlerChangeTranslatedText: (e) => {
            dispatch(updateTranslText(e.target.value))
        },
        handerTranslText: data => {
            dispatch(getTranslText(data));
        },
        handlerCompleteTranslate: () => {
            dispatch(completeTranslate());
        },
        handlerSelectFeedBackMsg: (comicTranslationOrderId, orderNo)=> {
            dispatch(getTranslImages({comicTranslationOrderId, orderNo}));
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
            dispatch(closeModal());
        },
        receivedImgSize: (width, height) => {
            dispatch(receivedImgHeight(width, height))
        },
        handlerSelectReProcess: (startNumber)=> {
            dispatch(setStartNumber(startNumber));
            dispatch(displayTranslBox());
            dispatch(displayTranslPopUp());
            dispatch(hiddenResultBox(startNumber));
            const _resultContainer = document.getElementById(`${startNumber}_resultContainer`);
            if(_resultContainer) {
                _resultContainer.parentNode.removeChild(_resultContainer);
            }
        },
        fontSettings: {
            handlerSelectFontFamily: payload => {
                dispatch(selectFontFamily(payload));
                dispatch(setGlobalFontFamily(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontSize: payload => {
                dispatch(selectFontSize(payload));
                dispatch(setWholeFontSize(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontColor: payload => {
                dispatch(selectFontColor(payload));
                dispatch(setWholeFontColor(payload));
                dispatch(getFontsettings());
            },
            handerColorAbsorb: () => {
                dispatch(openPopupAbsorbColor());
                dispatch(getFontsettings());
            },
            handerColorAbsorbComplete: () => {
                dispatch(closePopupAbsorbColor());
                dispatch(getFontsettings());
            },
            handlerSelectFontStyle: (payload) => {
                dispatch(selectFontStyle(payload));
                dispatch(setGlobalFontStyle(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontWeight: (payload) => {
                dispatch(selectFontWeight(payload));
                dispatch(setGlobalFontWeight(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontTextAlign: payload => {
                dispatch(selectFontTextAlign(payload));
                dispatch(setWholeFontTextAlign(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontOutlineColor: payload => {
                dispatch(selectFontOutlineColor(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontShadowColor: payload => {
                dispatch(selectFontShadowColor(payload));
                dispatch(getFontsettings());
            },
            handlerSelectFontOutlineSize: e => {
                dispatch(selectFontOutlineSize(e.target.value));
                dispatch(getFontsettings());
            },
            handlerSelectFontShadowSize: e => {
                dispatch(selectFontShadowSize(e.target.value));
                dispatch(getFontsettings());
            },
            handlerSelectLineHeight: e=> {
                dispatch(selectLineHeight(e.target.value));
                dispatch(setWholeFontLineHeight(e.target.value));
                dispatch(getFontsettings());
            },
            handlerSelectFontDirection: direction => {
                dispatch(selectFontDirection(direction));
                dispatch(setGlobalFontDirection(direction));
                dispatch(getFontsettings());
            },
            handlerSelectFontTextCase: payload => {
                dispatch(selectFontTextCase(payload));
                dispatch(setGlobalFontTextCase(payload));
                dispatch(getFontsettings());
            }
        },
        brushEvents: {
            handlerBrushWidth: e => {
                dispatch(settingBrushWidth(e.target.value));
            },
            handlerResetBrush: () => {
                dispatch(resetBrush());
            },
            handlerUndoBrush: () => {
                dispatch(undoBrush());
            }
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkbenchContainer);