import React from 'react';
import drawRect from './drawRect';
import TranslpopUp from '../TranslpopUp';
import TranslAreaBox from '../TranslAreaBox';
import TranslResultBox from '../TranslResultBox';
import Modal from '../Modal';

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
        const upperCanvas = document.getElementById("upper-canvas");
        const ctx_upper = upperCanvas.getContext('2d');
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

            const marquee = this.props.marquee;
            if(marquee==="rectangular" || !marquee) {
                this._drawCanvas = new drawRect(canvas, this.props.scale, img, this.props);
            }
            upperCanvas.addEventListener("mouseleave", ()=> {
                upperCanvas.addEventListener('mousedown', null);
                upperCanvas.addEventListener('mousemove', null);
                upperCanvas.addEventListener('mouseup', null);
            });
            upperCanvas.addEventListener("mouseenter", ()=> {
                if(this._drawCanvas) {
                    upperCanvas.addEventListener('mousedown', (e) => this._drawCanvas.mousedown(e));
                    upperCanvas.addEventListener('mousemove', (e) => this._drawCanvas.mousemove(e));
                    upperCanvas.addEventListener('mouseup', (e) => this._drawCanvas.mouseup(e));
                }
            });
            const {displayTranslBox, startNumber, maskTextImgs = {}} = this.props;
            if(displayTranslBox && Object.keys(maskTextImgs).length) {
                const currentMaskImg = maskTextImgs[startNumber];
                const {left, top, width, height, cropedImg} = currentMaskImg[currentMaskImg.length-1];
                const img = new Image();
                img.src = cropedImg;
                img.onload = ()=> {
                    ctx_upper.drawImage(img, left, top, width, height);
                }
            }

            if(this.props.clearPreTranslResult) {
                ctx_upper.clearRect(0, 0, currentElementWidth, currentElementHeight)
            }
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
        }
    }

    componentDidUpdate(prevProps) {
        const {
            selectedImage,
            hasCropBox,
            displayResultBox,
            displayTranslBox,
            selectedImg,
            translatedText,
            clearPreTranslResult,
            status,
            openModal
         } = this.props;
        if (prevProps.selectedImage !== selectedImage) {
            this.setState({
                selectedImage: selectedImage
            })
        }
        if(((!hasCropBox && displayResultBox) || !displayTranslBox ) && this._drawCanvas) {
            this._drawCanvas.clearLayers();
            this._drawCanvas.clearCropBox();
        }
        if(selectedImg) {
            this.drawCanvasBackGround();
        }
        if(prevProps.displayResultBox !== displayResultBox && translatedText) {
            this.ResultBox();
        }
        if(clearPreTranslResult) {
            const _resultContainers = document.getElementsByClassName("resultContainer");
            if(_resultContainers.length) {
                try {
                    for(let i = 0; i<_resultContainers.length; i++) {
                        if(_resultContainers[i] !== null){
                            _resultContainers[i].parentNode.removeChild(_resultContainers[i])
                        }
                    }
                }catch (error){
                    console.error(error)
                }
            }
        }
        if(prevProps.status !== status && status === 2) {
            openModal('feedBackMsg')
        }
    }
    
    ResultBox() {
        const {startNumber, resultBoxStyleParams, translatedText, font} = this.props;
        const {
            font_family = "Microsoft YaHei",
            font_size = 12,
            font_color = "rgb(0, 0, 0, .65)",
            hasFontItalic,
            hasFontWeight,
            text_align = "center",
            outline_color,
            shadow_color,
            outline_size,
            shadow_size
        } = font;
        const currentResultBoxStyleParams = resultBoxStyleParams[startNumber] || {};
        const {left, top, width, height} = currentResultBoxStyleParams;
        const resultContainer = document.createElement('div');
        const canvasContainer = document.getElementById('canvasContainer');
        resultContainer.setAttribute("id", `${startNumber}_resultContainer`);
        resultContainer.setAttribute("class", "resultContainer");
        canvasContainer.appendChild(resultContainer);
        resultContainer.style.left = `${left + 3}px`;
        resultContainer.style.top = `${top + 3}px`;
        resultContainer.style.width = `${width}px`;
        resultContainer.style.height = `${height}px`;
        resultContainer.style.fontFamily = font_family;
        resultContainer.style.fontSize = `${font_size}px`;
        resultContainer.style.color = font_color;
        resultContainer.style.fontStyle = hasFontItalic && "italic";
        resultContainer.style.fontWeight = hasFontWeight && "bold";
        resultContainer.style.textAlign = text_align;
        resultContainer.style.WebkitTextStroke = `${outline_size}px ${outline_color}`;
        resultContainer.style.textShadow =  `${shadow_size}px ${shadow_size}px ${shadow_size}px ${shadow_color}`;
        resultContainer.innerHTML = translatedText;
    }

    render() {
        const {
            modalOpen,
            modalId,
            openModal,
            closeModal,
            scale,
            contentText,
            cropedImage,
            fontSettings,
            hasCropBox,
            createdTranslBox = {},
            tabToTranslate,
            brushEvents,
            tabToClearText,
            createNewCropArea,
            createMaskLayer,
            font,
            brush,
            maskTextImgs = {},
            correctTransl,
            hasCorrect,
            originORCText,
            translatedText,
            hanlerChangeORCText,
            handlerChangeTranslatedText,
            handerTranslText,
            handlerCompleteTranslate,
            displayTranslPopUp,
            displayTranslBox,
            displayResultBox,
            startNumber,
            setResultBoxStyle,
            selectedImg,
            currentTip = [],
            handlerSelectFeedBackMsg
        } = this.props;
        const { elementWidth, elementHeight } = this.state;
        const currentElementWidth = elementWidth * scale;
        const currentElementHeight = elementHeight * scale;
        const canvasContainerStyle = {
            width: `${currentElementWidth}px`,
            height: `${currentElementHeight}px`,
            backgroundColor: !selectedImg && "gray"
        };
        const lowercanvasProps = {
            id: "lower-canvas",
            className: "lower-canvas",
            ref: this.canvas,
            width: currentElementWidth,
            height: currentElementHeight
        };

        const uppercanvasProps = {
            id: "upper-canvas",
            className: "upper-canvas",
            width: currentElementWidth,
            height: currentElementHeight,
            style: {
                cursor: (hasCropBox || displayTranslBox) ? "default" : "crosshair"
            }
        }
        const translpopUpProps = {
            contentText,
            cropedImage,
            createdTranslBox,
            startNumber,
            tabToClearText,
            fontSettings,
            font,
            correctTransl,
            hasCorrect,
            originORCText,
            translatedText,
            hanlerChangeORCText,
            handlerChangeTranslatedText,
            handerTranslText,
            handlerCompleteTranslate
        };
        const translAreaBoxProps = {
            contentText,
            data: createdTranslBox[startNumber],
            tabToTranslate,
            brushEvents,
            openModal,
            currentMaskTextImgs: maskTextImgs[startNumber],
            createMaskLayer,
            brush,
            displayTranslBox,
            startNumber,
            scale: 1
        };

        const translResultBoxProps = {
            data: createdTranslBox[startNumber],
            setResultBoxStyle,
            translatedText,
            displayResultBox,
            font,
            startNumber,
            openModal,
            contentText
        };
        return (
            <div className="col-sm-10 col-xs-12 workbench-main" id="workbenchMain">
                <div className="workbench-work-wrap">
                    <div className="inner">
                        <div className="trans-guide-prompt">
                            {contentText.prompt}
                        </div>
                        <div className="canvas-container" id="canvasContainer" style={canvasContainerStyle}>
                            {selectedImg && 
                                <React.Fragment>
                                    <canvas {...lowercanvasProps}>{contentText.canvasPrompt}</canvas>
                                    <canvas {...uppercanvasProps}>{contentText.canvasPrompt}</canvas>
                                </React.Fragment>
                            }
                            {hasCropBox && <TranslAreaBox {...translAreaBoxProps}/>}
                            {displayTranslBox && <TranslResultBox {...translResultBoxProps} />}
                        </div>
                    </div>
                </div>
                {displayTranslPopUp && <TranslpopUp {...translpopUpProps}/>}
                {modalOpen && modalId === "cancel" &&
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
                            <button type="button" className="btn btn-default active" onClick={() => { closeModal(); createNewCropArea(displayTranslBox) }}> {contentText.confirm} </button>
                        </div>
                    </Modal>
                }
                {modalOpen && modalId === "feedBackMsg" &&
                    <Modal>
                        <div className="popup-header">
                            <h5>{contentText.feedMsgTitle}</h5>
                            <span className="dismissPopUp" onClick={closeModal}>
                                <span className="glyphicon glyphicon-remove"></span>
                            </span>
                        </div>
                        <div className="popup-content text-left">
                            {currentTip.length && currentTip.map((item, index)=> {
                                const {comicTranslationOrderId, tag, content, orderNo} = item;
                                return (
                                    <div className="feedMsg-item" key={index} onClick={()=> handlerSelectFeedBackMsg(comicTranslationOrderId, orderNo)}> 
                                        <div>{tag} {content}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}


export default WorkbenchMain;