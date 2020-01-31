import React from 'react';
import drawRect from './drawRect';
import Modal from '../Modal';
import TranslpopUp from './TranslpopUp';

class WorkbenchMain extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            selectedImage: props.selectedImage,
            elementWidth: 565,
            elementHeight: 800,
            scale: props.scale
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const canvas = this.canvas.current;
        const canvasParentElement = canvas.parentElement;
        const currentElementWidth = this.state.elementWidth * this.props.scale;
        const currentElementHeight = this.state.elementHeight * this.props.scale;
        const cropBox = document.getElementById("cropBox");
        if(cropBox) cropBox.remove();

        canvas.width = currentElementWidth;
        canvas.height = currentElementHeight;
        canvasParentElement.style.width = `${currentElementWidth}px`;
        canvasParentElement.style.height = `${currentElementHeight}px`;
       
        const img = new Image();
        img.src = this.props.selectedImage;
        img.width = currentElementWidth;
        img.height = currentElementHeight;
        img.onload = () => {
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${currentElementWidth}px ${currentElementHeight}px`;
            canvas.style.backgroundRepeat = "no-repeat";
        }
        if(prevProps.selectedImage !== this.props.selectedImage) {
            this.setState({
                selectedImage: this.props.selectedImage
            })
        }
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        const canvasParentElement = canvas.parentElement;
        const currentElementWidth = this.state.elementWidth * this.props.scale;
        const currentElementHeight = this.state.elementHeight * this.props.scale
        canvas.width = currentElementWidth;
        canvas.height = currentElementHeight;
        canvasParentElement.style.width = `${currentElementWidth}px`;
        canvasParentElement.style.height = `${currentElementHeight}px`;

        const img = new Image();
        img.src = this.props.selectedImage;
        img.width = currentElementWidth;
        img.height = currentElementHeight;
        img.onload = () => {
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${currentElementWidth}px ${currentElementHeight}px`;
            const drawCanvas = new drawRect(canvas, this.props.scale, img, this.props);
            canvas.addEventListener('mouseleave', () => {
                canvas.addEventListener('mousedown', null);
                canvas.addEventListener('mousemove', null);
                canvas.addEventListener('mouseup', null);
            })
            canvas.addEventListener('mouseenter', () => {
                canvas.addEventListener('mousedown', (e) => drawCanvas.mousedown(e));
                canvas.addEventListener('mousemove', (e) => drawCanvas.mousemove(e));
                canvas.addEventListener('mouseup', (e) => drawCanvas.mouseup(e));
            })
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
        }
        
    }

    render() {
        const { modalOpen, closeModal } = this.props;
        const modalProps = {};
        return (
            <div className="col-sm-10 col-xs-12 workbench-main" id="workbenchMain">
                <div className="workbench-work-wrap">
                    <div className="inner">
                        <div className="trans-guide-prompt">
                            Select the text or the red box to translate
                        </div>
                        <div className="canvas-container">
                            <canvas ref={this.canvas} className="lower-canvas"></canvas>
                        </div>
                        {modalOpen &&
                            <Modal {...modalProps}>
                                <div className="popup-header">
                                    <h5>Delete</h5>
                                    <span className="dismissPopUp" onClick={closeModal}>
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </span>
                                </div>
                                <div className="popup-content text-center">
                                    Are you sure you want to delete?
                                </div>
                                <div className="popup-footer text-right">
                                    <button type="button" className="btn btn-default" onClick={closeModal}> Cancel </button>
                                    <button type="button" className="btn btn-default" onClick={closeModal}> Confirm </button>
                                </div>
                            </Modal>
                        }
                        <TranslpopUp></TranslpopUp>
                    </div>
                </div>
            </div>
        )
    }
}


export default WorkbenchMain;