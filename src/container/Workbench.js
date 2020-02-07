import React from 'react';
import {connect} from 'react-redux';
import {Workbench} from '../components';
import {
    handlerZoomCanvasBech,
    handlerZoomCanvasPlus,
    handlerZoomCanvasMinus,
    openModal,
    closeModal
} from '../modules/ui';
import {
    receivedCropedImg,
    createTranslArea,
    clearPreCropArea
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
    closePopupAbsorbColor
} from '../modules/fontSettings';

function WorkbenchContainer (props){
    return (
        <Workbench {...props}/>
    )
}

const mapStateToProps = (state) => {
    const {
        selectedImage, 
        cropedImage,
        hasCropedImg,
        createdTranslBox,
        hasCropBox
    } = state.images;
    const {
        zoomCanvasValue = 1,
        modalOpen
    } = state.ui;
    const font = state.font;
    return {
        selectedImage,
        cropedImage,
        hasCropedImg,
        createdTranslBox,
        hasCropBox,
        zoomCanvasValue,
        modalOpen,
        font
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        zoomCanvasBech: e=> {
            dispatch(handlerZoomCanvasBech(e.target.value));
        },
        zoomCanvasPlus: value => {
            dispatch(handlerZoomCanvasPlus(value));
        },
        zoomCanvasMinus: value => {
            dispatch(handlerZoomCanvasMinus(value));
        },
        openModal: ()=> {
            dispatch(openModal());
        },
        closeModal: ()=> {
            dispatch(closeModal());
        },
        setCropImg: data => {
            dispatch(receivedCropedImg(data.cropedImg))
            dispatch(createTranslArea(data));
        },
        createNewCropArea: ()=> {
            dispatch(clearPreCropArea());
        },
        fontSettings: {
            handlerSelectFontFamily: payload=> {
                dispatch(selectFontFamily(payload))
            },
            handlerSelectFontSize: payload => {
                dispatch(selectFontSize(payload))
            },
            handlerSelectFontColor: payload => {
                dispatch(selectFontColor(payload))
            },
            handerColorAbsorb: ()=> {
                dispatch(openPopupAbsorbColor())
            },
            handerColorAbsorbComplete: ()=> {
                dispatch(closePopupAbsorbColor())
            },
            handlerSelectFontStyle: payload => {
                dispatch(selectFontStyle(payload))
            },
            handlerSelectFontWeight: payload => {
                dispatch(selectFontWeight(payload))
            },
            handlerSelectFontTextAlign: payload => {
                dispatch(selectFontTextAlign(payload))
            },
            handlerSelectFontOutlineColor: payload => {
                dispatch(selectFontOutlineColor(payload))
            },
            handlerSelectFontShadowColor: payload => {
                dispatch(selectFontShadowColor(payload))
            },
            handlerSelectFontOutlineSize: e => {
                dispatch(selectFontOutlineSize(e.target.value))
            },
            handlerSelectFontShadowSize: e => {
                dispatch(selectFontShadowSize(e.target.value))
            }
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkbenchContainer);