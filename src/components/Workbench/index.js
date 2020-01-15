import React from 'react';
import CanvasZoom from './CanvasZoom';
import RightMenu from './RightMenu';
import WorkbenchMain from './WorkbenchMain';
import './index.css';

function Workbench() {
    return (
        <div className="workbench">
            <div className="workbench-container">
                <CanvasZoom />
                <WorkbenchMain />
                <RightMenu />
            </div>
        </div>
    )
}

export default Workbench;