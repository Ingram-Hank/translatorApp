import React from 'react';

function CanvasZoom ({zoomCanvasBech, zoomCanvasPlus, zoomCanvasMinus, value}) {
    const zoomScrollProps = {
        title: "Slide to zoom",
        className: "canvas-zoom-scroll",
        type: "range",
        step: "0.1",
        min: "0.5",
        max: "1.5",
        value,
        onChange: (e)=> {zoomCanvasBech(e)}
    };
    return (
        <div className="canvas-zoom text-center">
            <span className="zoom-num">{value}</span>
            <span className="zoom-btn zoom-plus" onClick={()=> zoomCanvasPlus(value)}>+</span>
            <input {...zoomScrollProps}/>
            <span className="zoom-btn zoom-minus" onClick={()=> zoomCanvasMinus(value)}>-</span>
        </div>
    )
}

export default CanvasZoom;