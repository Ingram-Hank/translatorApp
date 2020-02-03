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
        openModal,
        closeModal,
        setCropImg,
        createNewCropArea,
        hasCropedImg,
        createdTranslBox,
        modalOpen
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
        openModal,
        closeModal,
        setCropImg,
        createNewCropArea,
        modalOpen,
        hasCropedImg,
        createdTranslBox,
        scale: zoomCanvasValue
    };

    const rightMenuProps = {
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