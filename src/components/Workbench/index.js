import React from 'react';
import CanvasZoom from './CanvasZoom';
import RightMenu from './RightMenu';
import WorkbenchMain from './WorkbenchMain';
import './index.css';

function Workbench({zoomCanvasBech, zoomCanvasPlus, zoomCanvasMinus, zoomCanvasValue, selectedImage, openModal, setCropImg, modalOpen}) {
    const canvasZoomProps = {
        zoomCanvasBech,
        zoomCanvasPlus,
        zoomCanvasMinus,
        value: zoomCanvasValue
    };
    const workbenchMainProps = {
        selectedImage,
        openModal,
        setCropImg,
        modalOpen
    };
    return (
        <div className="workbench">
            <div className="workbench-container">
                <CanvasZoom {...canvasZoomProps}/>
                <WorkbenchMain {...workbenchMainProps}/>
                <RightMenu />
            </div>
        </div>
    )
}

export default Workbench;