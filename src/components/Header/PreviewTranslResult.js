import React from 'react';

class PreviewTranslResult extends React.Component {
    componentDidMount() {
        const canvas = document.getElementById("previewCanvas");
        const ctx = canvas.getContext("2d");
        const {img} = this.props;
        img.onload=()=> {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0)
        }
    }

    render () {
        return (
            <div className="popup">
                <div className="popup-preview">
                    <div className="popup-preview-header">
                        <h5 className="modal-title">
                            Preview
                        </h5>
                        <span className="close" onClick={this.props.handlerClosePreview}>x</span>
                    </div>
                    <div className="popup-preview-body">
                        <canvas id="previewCanvas"></canvas>
                    </div>
                </div>
            </div>
        )
    }
}


export default PreviewTranslResult;