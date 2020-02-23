import React from 'react';
import CanvasZoom from './CanvasZoom';
import RightMenu from './RightMenu';
import WorkbenchMain from './WorkbenchMain';
import './index.css';

function Workbench(props) {
    const {
        contentText,
        zoomCanvasBech,
        zoomCanvasPlus,
        zoomCanvasMinus,
        zoomCanvasValue,
        selectedImage,
        cropedImage,
        fontSettings,
        openModal,
        closeModal,
        setCropImg,
        createNewCropArea,
        createMaskLayer,
        tabToTranslate,
        brushEvents,
        tabToClearText,
        createdTranslBox,
        hasCropBox,
        modalOpen,
        marquee,
        font,
        brush,
        maskTextImgs,
        correctTransl,
        hasCorrect,
        originORCText,
        translatedText,
        hanlerChangeORCText,
        handlerChangeTranslatedText,
        handerTranslText,
        handlerCompleteTranslate,
        resultLayers,
        displayTranslPopUp,
        displayTranslBox,
        displayResultBox,
        createStartNumber,
        startNumber,
        setResultBoxStyle,
        resultBoxStyleParams,
        selectedImg
    } = props;
    
    const canvasZoomProps = {
        zoomCanvasBech,
        zoomCanvasPlus,
        zoomCanvasMinus,
        value: zoomCanvasValue
    };
    const workbenchMainProps = {
        contentText,
        selectedImage,
        cropedImage,
        fontSettings,
        openModal,
        closeModal,
        setCropImg,
        createNewCropArea,
        createMaskLayer,
        tabToTranslate,
        brushEvents,
        tabToClearText,
        modalOpen,
        marquee,
        createdTranslBox,
        hasCropBox,
        font,
        brush,
        maskTextImgs,
        correctTransl,
        hasCorrect,
        originORCText,
        translatedText,
        hanlerChangeORCText,
        handlerChangeTranslatedText,
        handerTranslText,
        handlerCompleteTranslate,
        scale: zoomCanvasValue,
        displayTranslPopUp,
        displayTranslBox,
        displayResultBox,
        createStartNumber,
        startNumber,
        setResultBoxStyle,
        resultBoxStyleParams,
        selectedImg
    };

    const rightMenuProps = {
        contentText,
        resultLayers
    };
    return (
        <div className="workbench">
            <div className="workbench-container">
                <CanvasZoom {...canvasZoomProps}/>
                <WorkbenchMain {...workbenchMainProps}/>
                <RightMenu {...rightMenuProps}/>
            </div>
        </div>
    )
}

export default Workbench;