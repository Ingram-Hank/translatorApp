import React from 'react';
import CanvasZoom from './CanvasZoom';
import RightMenu from './RightMenu';
import WorkbenchMain from './WorkbenchMain';
import './index.css';

function Workbench({zoomCanvasBech, zoomCanvasPlus, zoomCanvasMinus, zoomCanvasValue, selectedImage, cropedImage, openModal, closeModal, setCropImg, modalOpen}) {
    const canvasZoomProps = {
        zoomCanvasBech,
        zoomCanvasPlus,
        zoomCanvasMinus,
        value: zoomCanvasValue
    };

    const workbenchMainProps = {
        selectedImage,
        openModal,
        closeModal,
        setCropImg,
        modalOpen,
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