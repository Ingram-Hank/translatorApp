import React from 'react';

class ColorAbsorb extends React.Component {
    constructor (props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            cropedImage: props.cropedImage,
            color: props.font_color
        }
    }
    selectPixelColor(img) {
        const canvas = this.canvas.current;
        const cxt = canvas.getContext('2d');
        canvas.width = this.props.createdTranslBox.width;
        canvas.height = this.props.createdTranslBox.height;
        cxt.shadowBlur = 20;
        cxt.shadowColor = "#000000";
        cxt.drawImage(img, 0, 0);
        
        canvas.addEventListener('mousedown', (e)=> {
            let mouseX, mouseY;
            if(e.offsetX) {
                mouseX = e.offsetX;
                mouseY = e.offsetY;
            }else if(e.layerX) {
                mouseX = e.layerX;
                mouseY = e.layerY;
            }
            const canvasX = Math.floor(mouseX - canvas.offsetLeft);
            const canvasY = Math.floor(mouseY - canvas.offsetTop);
            const imageData = cxt.getImageData(canvasX, canvasY, 1, 1);
            const pixel = imageData.data;
            const r = pixel[0];
            const g = pixel[1];
            const b = pixel[2];
            let rHex = r.toString(16);
            r < 16 && (rHex = "0" + rHex);
            let gHex = g.toString(16);
            g < 16 && (gHex = "0" + gHex);
            let bHex = b.toString(16);
            b < 16 && (bHex = "0" + bHex);
            const font_color = "#" + rHex + gHex + bHex;
            this.props.handlerSelectFontColor(font_color);
            this.props.handerColorAbsorbComplete();
        });
        
    }
    componentDidMount() {
        const img = new Image();
        img.width = this.props.createdTranslBox.width;
        img.height = this.props.createdTranslBox.height;
        img.src = this.props.cropedImage.src;
        img.onload = ()=> {
            this.selectPixelColor(img)
        }
    }

    render () {
        const {contentText, cropedImage, createdTranslBox} = this.props;
        if(cropedImage) {
            return (
                <div className='popup'>
                    <div className='popup-canvasContainer' style={{width: createdTranslBox.width, height: createdTranslBox.height}}>
                        <canvas className='popup-canvasContainer-canvas' ref={this.canvas}>
                            {contentText.canvasPrompt}
                        </canvas>
                    </div>
                </div>
            )
        }else {
            return null
        }
    }
}

export default ColorAbsorb;