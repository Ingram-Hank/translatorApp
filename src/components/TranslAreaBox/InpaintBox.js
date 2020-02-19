import React from 'react';
import DragInpaintBox from './DragInpaintBox';

class InpaintBox extends React.Component {
    render() {
        const {tabToTranslate, brushEvents, brush} = this.props;
        const {brushWidth = 10} = brush;
        const {handlerBrushWidth, handlerResetBrush, handlerUndoBrush} = brushEvents;
        const hoverElementProps = {
            className: "box-title text-center",
            onMouseLeave: (e)=> {
                e.target.removeEventListener("mousedown", ()=> console.log("remove mousedown"));
                e.target.removeEventListener("mousemove", ()=> console.log("remove mousemove"));
                e.target.removeEventListener("mouseup", ()=> console.log("remove mouseup"));
            },
            onMouseEnter: (e)=> {
                const dragElement = document.getElementById('inpaint-box');
                const startDrag = new DragInpaintBox(dragElement);
                e.target.addEventListener("mousedown", (el)=> startDrag.mousedown(el));
                document.addEventListener("mousemove", (el)=> startDrag.mousemove(el));
                document.addEventListener("mouseup", (el)=> startDrag.mouseup(el));
            }
        };
        return (
            <div className="inpaint-box" id="inpaint-box">
                <div {...hoverElementProps}>
                    <i className='dots-horizontal'>▪▪▪</i>
                </div>
                <div className="one-step-change-tool-tab">
                    <span className='inpaint-tool-btn active'>
                        Clear Text
                    </span>
                    <span className='inpaint-tool-btn' onClick={()=> tabToTranslate()}>
                        Translate
                    </span>
                </div>
                <div className="box-operation">
                    <div className="text">
                        Adjust erase size
                    </div>
                    <div className="brush-range-area" title="Adjust erase size">
                        <input className="paint-size" type="range" min="8" max="100" value={brushWidth} onChange={(e) => {handlerBrushWidth(e)}} />
                    </div>
                    <div className="brush-btn-area">
                        <div className="paint-content-btn">
                            <span className="back-paint" onClick={()=> handlerResetBrush()}>
                                <span className="fa fa-rotate-left"></span> Reset
                            </span>
                        </div>
                        <div className="paint-content-btn">
                            <span className="back-paint" onClick={()=> handlerUndoBrush()}>
                                <span className="fa fa-reply"></span> Undo
                            </span>
                        </div>
                    </div>
                    <div className="brush-btn-area">
                        <div className="paint-content-btn">
                            <span className="back-paint">
                                <span className="fa fa-search"></span> Zoom
                            </span>
                        </div>
                        <div className="paint-content-btn">
                            <span className="back-paint">
                                <span className="fa fa-paint-brush"></span> Brush
                            </span>
                        </div>
                    </div>
                </div>
                <div className="one-step-translate-step">
                    <span className="btn one-step-next" onClick={()=> tabToTranslate()}>
                        Next
                    </span>
                </div>
            </div>
        )
    }

}

export default InpaintBox;