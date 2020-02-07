import React from 'react';
import Modal from '../Modal';

class TranslAreaBox extends React.Component {
    constructor (props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            brushWidth: 8
        }
    }

    doodling() {
        const canvas = this.canvas.current;
        const context = canvas.getContext("2d");
        const brushWidth = this.state.brushWidth * this.props.scale;
        
        canvas.onmousedown = (e) => {
            canvas.onmousemove = (e) => {
                const wid = e.offsetX;
                const hei = e.offsetY;
                context.beginPath();
                context.arc(wid, hei, brushWidth, 0, 2 * Math.PI);
                context.closePath();
                context.fillStyle = '#ff4f81';
                context.fill();
            }
        }
        canvas.onmouseup = () => {
            canvas.onmousemove = "null";
        }
    }

    componentDidUpdate(preProps) {
        if(preProps.scale !== this.props.scale) {
            this.setState({
                brushWidth: this.state.brushWidth * this.props.scale
            })
        }
        this.doodling()
    }
    componentDidMount() {
        this.doodling()
    }

    render () {
        const {contentText, data, createNewCropArea, modalOpen, openModal, closeModal} = this.props;
        if(data){
            const translAreaBoxStyle = {
                height: `${data.height}px`,
                width: `${data.width}px`,
                left: `${data.left}px`,
                top: `${data.top}px`
            };
            
            const canvasContainerStyle = {
                height: `${data.height}px`,
                width: `${data.width}px`,
            };
            return (
                <div className='translAreaBox' id='translAreaBox' style={translAreaBoxStyle}>
                    <div id="cropBoxCancel" className="cancel" title={contentText.delete} onClick={openModal}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </div>
                    <div className='canvasContainer' style={canvasContainerStyle}>
                        <span id='brush' className='brush'></span>
                        <canvas ref={this.canvas} className="translCanvas" width={data.width} height={data.height}></canvas>
                    </div>
                    {modalOpen &&
                        <Modal>
                            <div className="popup-header">
                                <h5>{contentText.Delete}</h5>
                                <span className="dismissPopUp" onClick={closeModal}>
                                    <span className="glyphicon glyphicon-remove"></span>
                                </span>
                            </div>
                            <div className="popup-content text-center">
                                {contentText.popUpHelpText}
                            </div>
                            <div className="popup-footer text-right">
                                <button type="button" className="btn btn-default" onClick={closeModal}> {contentText.cancel} </button>
                                <button type="button" className="btn btn-default active" onClick={()=> {closeModal() ; createNewCropArea()}}> {contentText.confirm} </button>
                            </div>
                        </Modal>
                    }
                </div>
            )
        }else {
            return null
        }
        
    }
}


export default TranslAreaBox;