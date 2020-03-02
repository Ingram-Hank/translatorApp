import React from 'react';

class PreviewTranslResult extends React.Component {
    drawBackground() {
        const canvas = document.getElementById("previewCanvas");
        const ctx = canvas.getContext("2d");
        const {img} = this.props;
        img.onload=()=> {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0)
        }
    }
    componentDidMount() {
        this.drawBackground()
    }
    componentDidUpdate() {
        this.drawBackground()
    }

    render () {
        const {handlerClosePreview, handlerRestore, contentText} = this.props;
        return (
            <div className="popup">
                <div className="popup-preview">
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