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
import {receivedCropedImg} from '../modules/images';


function WorkbenchContainer (props){
   
    return (
        <Workbench {...props}/>
    )
}

const mapStateToProps = (state) => {
    const {selectedImage, cropedImage} = state.images;
    const {zoomCanvasValue = 1, modalOpen} = state.ui;
    return {
        selectedImage,
        cropedImage,
        zoomCanvasValue,
        modalOpen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        zoomCanvasBech: (e)=> {
            dispatch(handlerZoomCanvasBech(e.target.value));
        },
        zoomCanvasPlus: (value)=> {
            dispatch(handlerZoomCanvasPlus(value));
        },
        zoomCanvasMinus: (value)=> {
            dispatch(handlerZoomCanvasMinus(value));
        },
        openModal: ()=> {
            dispatch(openModal());
        },
        closeModal: ()=> {
            dispatch(closeModal());
        },
        setCropImg: (img)=> {
            dispatch(receivedCropedImg(img))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkbenchContainer);