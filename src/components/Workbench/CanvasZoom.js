import React from 'react';

function CanvasZoom () {
    return (
        <div class="canvas-zoom text-center">
            <span class="js-canvas-zoom-num zoom-num">1</span>
            <a class="zoom-btn zoom-plus" href="javascript: void(0);">+</a>
            <input title="Slide to zoom" class="canvas-zoom-scroll" type="range" step="0.1" min="0.5" max="1.5" value="1" />
            <a class="zoom-btn zoom-minus" href="javascript: void(0);">-</a>
        </div>
    )
}

export default CanvasZoom;