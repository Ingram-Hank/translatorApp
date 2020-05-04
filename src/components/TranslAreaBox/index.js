import React from 'react';
import InpaintBox from './InpaintBox';

class TranslAreaBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            updateFlag: false
        }
    }

    drawBackground() {
        const {
            updatedMaskBackground,
            currentMaskTextImgs = [],
            startNumber,
            data
        } = this.props;
        const canvas = document.getElementById(`maskCanvas_${startNumber}`);
        const context = canvas.getContext("2d");
        let img = data.cropedImg;
        if (currentMaskTextImgs.length) {
            img = new Image();
            img.src = currentMaskTextImgs[currentMaskTextImgs.length-1].cropedImg;
        }
        img.onload = () => {
            context.drawImage(img, 20, 20, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
        };
        updatedMaskBackground();
        this.setState({ ...this.state, updateFlag: false })
    }

    doodling() {
        const {
            maskColorSettings = {},
            createMaskLayer,
            startNumber,
            scale,
            brush
         } = this.props;
        const canvas = document.getElementById(`maskCanvas_${startNumber}`);
        const context = canvas.getContext("2d");
        const { brushWidth = 10 } = brush;
        const brush_Width = brushWidth * scale;
        canvas.onmousedown = (e) => {
            this.setState({ ...this.state, flag: true });
            const newCanvas = document.createElement('canvas');
            newCanvas.width = canvas.width + 40;
            newCanvas.height = canvas.height + 40;
            const newCtx = newCanvas.getContext('2d');
            canvas.onmousemove = (e) => {
                const x = e.offsetX;
                const y = e.offsetY;
                context.save();
                context.beginPath();
                context.arc(x, y, brush_Width, 0, 2 * Math.PI);
                context.closePath();
                context.fillStyle = '#ff4f81';
                context.fill();
                context.restore();

                newCtx.save();
                newCtx.beginPath();
                newCtx.arc(x + 20, y + 20, brush_Width, 0, 2 * Math.PI);
                newCtx.closePath();
                if(maskColorSettings.hasOwnProperty("backgroundColor")) {
                    newCtx.rect(0, 0, newCanvas.width, newCanvas.height);
                    newCtx.fillStyle= maskColorSettings.backgroundColor;
                    newCtx.fill();
                }else {
                    newCtx.fillStyle = maskColorSettings.frontColor || 'red';
                    newCtx.fill();
                }
                canvas.onmouseup = () => {
                    canvas.onmousemove = null;
                    const newImage = new Image();
                    newImage.src = newCanvas.toDataURL("image/png");
                    createMaskLayer(newImage);
                    this.setState({ ...this.state, flag: false });
                }
            }
        }
        
    }
    componentDidUpdate(prevProps) {
        this.drawBackground();
        this.doodling();
        if(prevProps.updateBackground !== this.props.updateBackground) {
            this.setState({ ...this.state, updateFlag: true })
        }
    }
    componentDidMount() {
        this.doodling()
    }
    
    render() {
        const {
            contentText,
            data,
            tabToTranslate,
            brushEvents,
            openModal,
            brush,
            displayTranslBox,
            startNumber
        } = this.props;
        if (data) {
            const translAreaBoxStyle = {
                height: `${data.height} + 3px`,
                width: `${data.width} + 3px`,
                left: `${data.left}px`,
                top: `${data.top}px`,
                border: displayTranslBox ? "none" : "1px dashed hsl(343, 100%, 65%)"
            };
            const canvasContainerStyle = {
                height: `${data.height}px`,
                width: `${data.width}px`,
            };
            const inpaintBoxProps = {
                contentText,
                tabToTranslate,
                brush,
                brushEvents
            };
            return (
                <div className='translAreaBox' style={translAreaBoxStyle} data-html2canvas-ignore>
                    {!displayTranslBox &&
                        <div id="cropBoxCancel" className="cancel" title={contentText.delete} onClick={()=> openModal('cancel')}>
                            <span className="glyphicon glyphicon-trash"></span>
                        </div>
                    }
                    <div className='canvasContainer' style={canvasContainerStyle}>
                        <canvas id={`maskCanvas_${startNumber}`} className="translCanvas" width={data.width} height={data.height}></canvas>
                    </div>
                    <InpaintBox {...inpaintBoxProps} />
                </div>
            )
        } else {
            return null
        }
    }
}


export default TranslAreaBox;