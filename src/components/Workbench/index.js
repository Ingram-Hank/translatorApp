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
        hasCropedImg,
        createdTranslBox,
        hasCropBox,
        modalOpen,
        font
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
        modalOpen,
        hasCropedImg,
        createdTranslBox,
        hasCropBox,
        font,
        scale: zoomCanvasValue
    };

    const rightMenuProps = {
        contentText,
        cropedImage
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