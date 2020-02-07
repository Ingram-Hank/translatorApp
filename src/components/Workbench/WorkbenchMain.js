import React from 'react';
import drawRect from './drawRect';
import TranslpopUp from '../TranslpopUp';
import TranslAreaBox from '../TranslAreaBox';

class WorkbenchMain extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this._drawCanvas = null;
        this.state = {
            selectedImage: props.selectedImage,
            elementWidth: 565,
            elementHeight: 800,
            scale: props.scale
        };
    }

    drawCanvasBackGround() {
        const canvas = this.canvas.current;
        const currentElementWidth = this.state.elementWidth * this.props.scale;
        const currentElementHeight = this.state.elementHeight * this.props.scale;
        const img = new Image();
        img.src = this.state.selectedImage;
        img.width = currentElementWidth;
        img.height = currentElementHeight;
        img.onload = () => {
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${currentElementWidth}px ${currentElementHeight}px`;
            canvas.style.backgroundRepeat = "no-repeat";
            this._drawCanvas = new drawRect(canvas, this.props.scale, img, this.props);
            canvas.addEventListener("mouseleave", ()=> {
                canvas.addEventListener('mousedown', null);
                canvas.addEventListener('mousemove', null);
                canvas.addEventListener('mouseup', null);
            });
            canvas.addEventListener("mouseenter", ()=> {
                if(this._drawCanvas) {
                    canvas.addEventListener('mousedown', (e) => this._drawCanvas.mousedown(e));
                    canvas.addEventListener('mousemove', (e) => this._drawCanvas.mousemove(e));
                    canvas.addEventListener('mouseup', (e) => this._drawCanvas.mouseup(e));
                }
            })
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedImage !== this.props.selectedImage) {
            this.setState({
                selectedImage: this.props.selectedImage
            })
        }
        if(!this.props.hasCropBox && this._drawCanvas) {
            this._drawCanvas.clearLayers();
            console.log('clear layers');
            this._drawCanvas.clearCropBox();
        }
        
        this.drawCanvasBackGround()
    }

    componentDidMount() {
        this.drawCanvasBackGround()
    }

    render() {
        const {
            modalOpen,
            openModal,
            closeModal,
            scale,
            contentText,
            cropedImage,
            fontSettings,
            hasCropedImg = false,
            createdTranslBox,
            createNewCropArea,
            font
        } = this.props;
        const { elementWidth, elementHeight } = this.state;
        const currentElementWidth = elementWidth * scale;
        const currentElementHeight = elementHeight * scale;
        const canvasContainerStyle = {
            width: `${currentElementWidth}px`,
            height: `${currentElementHeight}px`
        };
        const canvasProps = {
            className: "lower-canvas",
            ref: this.canvas,
            width: currentElementWidth,
            height: currentElementHeight,
            style: {
                cursor: hasCropedImg ? "default" : "crosshair"
            }
        };
        const translpopUpProps = {
            contentText,
            cropedImage,
            createdTranslBox,
            fontSettings,
            font
        };
        const translAreaBoxProps = {
            contentText,
            data: createdTranslBox,
            modalOpen,
            openModal,
            closeModal,
            createNewCropArea,
            scale: 1
        };
        return (
            <div className="col-sm-10 col-xs-12 workbench-main" id="workbenchMain">
                <div className="workbench-work-wrap">
                    <div className="inner">
                        <div className="trans-guide-prompt">
                            {contentText.prompt}
                        </div>
                        <div className="canvas-container" id="canvasContainer" style={canvasContainerStyle}>
                            <canvas {...canvasProps}>
                                {contentText.canvasPrompt}
                            </canvas>
                            {hasCropedImg && <TranslAreaBox {...translAreaBoxProps}/>}
                        </div>
                    </div>
                </div>
                {hasCropedImg && <TranslpopUp {...translpopUpProps}/>}
            </div>
        )
    }
}


export default WorkbenchMain;