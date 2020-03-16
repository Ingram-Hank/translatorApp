import React from 'react';

class PreviewTranslResult extends React.Component {
    drawBackground() {
        const canvas = document.getElementById("previewCanvas");
        const ctx = canvas.getContext("2d");
        const {img, imgWidth, imgHeight} = this.props;
        const previewImg = new Image();
        previewImg.src = img.src;
        previewImg.onload=()=> {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
        }
    }
    componentDidMount() {
        this.drawBackground()
    }
    componentDidUpdate() {
        this.drawBackground()
    }

    render () {
        const {handlerClosePreview, handlerRestore, contentText, imgWidth, imgHeight} = this.props;
        return (
            <div className="popup">
                <div className="popup-preview" style={{width: imgWidth, height: imgHeight}}>
                    <div className="popup-preview-header">
                        <h5 className="modal-title">
                            {contentText.preview}
                        </h5>
                        <span className="close" onClick={handlerClosePreview}>x</span>
                    </div>
                    <div className="popup-preview-body">
                        <div className="popup-preview-body-restore text-right">
                            <button onClick={handlerRestore}>{contentText.restore}</button>
                        </div>
                        <canvas id="previewCanvas"></canvas>
                    </div>
                </div>
            </div>
        )
    }
}


export default PreviewTranslResult;