import React from 'react';
import drawRect from './drawRect';
import ResultBox from './ResultBox';
import TranslpopUp from '../TranslpopUp';
import TranslAreaBox from '../TranslAreaBox';
import TranslResultBox from '../TranslResultBox';
import CropedBox from '../CropedBox';
import Modal from '../Modal';

class WorkbenchMain extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this._drawCanvas = null;
        this.state = {
            status: 0,
            scale: props.scale
        };
    }

    drawCanvasBackGround() {
        const canvas = this.canvas.current;
        const {
            selectedTranslImage, 
            selectedImage, 
            scale,
            status,
            imgHeight,
            receivedImgSize,
            marquee
        } = this.props;
        const img = new Image();
        img.setAttribute('crossOrigin','anonymous');
        let imgSrc = selectedImage;
        if(status && selectedTranslImage) {
            imgSrc = selectedTranslImage;
        }
        img.src = imgSrc;
        img.onload = () => {
            const currentElementWidth = img.width;
            const currentElementHeight = img.height;
            img.width = currentElementWidth;
            img.height = currentElementHeight;
            if (!imgHeight || currentElementHeight !== imgHeight) {
                receivedImgSize(currentElementWidth, currentElementHeight);
            }
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${currentElementWidth}px ${currentElementHeight}px`;
            canvas.style.backgroundRepeat = "no-repeat";
            if (marquee === "rectangular" || !marquee) {
                this._drawCanvas = new drawRect(canvas, scale, img, currentElementWidth, currentElementHeight, this.props);
            }
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
        }
    }

    drawMaskImgBackground (prevProps) {
        const upperCanvas = document.getElementById("upper-canvas");
        const ctx_upper = upperCanvas.getContext('2d');
        const {
            maskTextImgs,
            startNumber,
            createdTranslBox,
            clearPreMask
        } = this.props;
        let left, top, width, height, cropedImg;
            if (Object.keys(maskTextImgs).length) {
                const currentMaskImg = maskTextImgs[startNumber] || [];
                const img = new Image();
                if (currentMaskImg.length) {
                    left = currentMaskImg[currentMaskImg.length - 1].left;
                    top = currentMaskImg[currentMaskImg.length - 1].top;
                    width = currentMaskImg[currentMaskImg.length - 1].width;
                    height = currentMaskImg[currentMaskImg.length - 1].height;
                    cropedImg = currentMaskImg[currentMaskImg.length - 1].cropedImg;
                }
                img.src = cropedImg;
                img.onload = () => {
                    ctx_upper.drawImage(img, 20, 20, width, height, left, top, width, height);
                }
            }else if(createdTranslBox[startNumber]) {
                left = createdTranslBox[startNumber].left;
                top = createdTranslBox[startNumber].top;
                width = createdTranslBox[startNumber].width;
                height = createdTranslBox[startNumber].height;
                cropedImg = createdTranslBox[startNumber].cropedImg;
            }
            if (prevProps.clearPreMask !== clearPreMask && clearPreMask) {
                ctx_upper.clearRect(left, top, width, height);
                delete createdTranslBox[startNumber];
            }
    }
    clearCanvas (prevProps) {
        const upperCanvas = document.getElementById("upper-canvas");
        const ctx_upper = upperCanvas.getContext('2d');
        ctx_upper.clearRect(0, 0, this.props.imgWidth, this.props.imgHeight);
    }

    componentDidUpdate (prevProps) {
        const {
            displayTranslBox,
            hasCropedMarquee,
            selectedImg,
            status,
            isUpdateTranslImage,
            clearPreTranslResult
        } = this.props;
        if(prevProps.status !== status) {
            this.setState({
                ...this.state,
                status
            })
        }
        if (!hasCropedMarquee && this._drawCanvas) {
            this._drawCanvas.clearLayers();
        }
        if (isUpdateTranslImage) {
            this.drawCanvasBackGround(prevProps);
        }
        if(displayTranslBox) {
            this.drawMaskImgBackground(prevProps)
        }
        if (prevProps.clearPreTranslResult !== clearPreTranslResult && selectedImg && clearPreTranslResult) {
            this.clearCanvas(prevProps)
        }
    }

    componentDidMount() {
        console.info("build package date---------", new Date(" 2020/05/20 01:37:20"));
    }

    render() {
        const {
            modalOpen,
            modalId,
            openModal,
            closeModal,
            contentText,
            cropedImage,
            fontSettings,
            hasCropBox,
            createdTranslBox = {},
            resultBoxStyleParams = {},
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
            imgWidth = "870",
            imgHeight = "950",
            wholeFontSize,
            wholeFontColor,
            wholeFontTextAlign,
            wholeFontLineHeight,
            globalHasFontItalic,
            globalHasFontWeight,
            globalFontDirection,
            globalFontTextCase,
            handlerCancelCrop,
            handlerConfirmCrop,
            hasCropedMarquee,
            cropedBoxParams,
            createStartNumber,
            setCropImg,
            resultLayers,
            resultHtmlLayers,
            clearPreTranslResult,
            fonts,
            wholeFonFamily,
            defaultFontFamily,
            maskColorSettings,
            updatedMaskBackground,
            updateBackground,
            updateCropedBox
        } = this.props;
        
        const canvasContainerStyle = {
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
            backgroundColor: !selectedImg && "gray"
        };
        const lowercanvasProps = {
            id: "lower-canvas",
            className: "lower-canvas",
            ref: this.canvas,
            width: imgWidth,
            height: imgHeight
        };

        const uppercanvasProps = {
            id: "upper-canvas",
            className: "upper-canvas",
            width: imgWidth,
            height: imgHeight,
            onMouseDown: this._drawCanvas ? (e) => this._drawCanvas.mousedown(e) : null,
            onMouseMove: this._drawCanvas ? (e) => this._drawCanvas.mousemove(e) : null,
            onMouseUp: this._drawCanvas ? (e) => this._drawCanvas.mouseup(e) : null,
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
            handlerCompleteTranslate,
            wholeFontSize,
            wholeFontColor,
            wholeFontTextAlign,
            wholeFontLineHeight,
            globalHasFontItalic,
            globalHasFontWeight,
            globalFontDirection,
            globalFontTextCase
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
            maskColorSettings,
            updatedMaskBackground,
            updateBackground,
            scale: 1
        };

        const translResultBoxProps = {
            data: resultBoxStyleParams[startNumber] || createdTranslBox[startNumber],
            setResultBoxStyle,
            translatedText,
            displayResultBox,
            font,
            startNumber,
            openModal,
            contentText,
            wholeFontSize,
            wholeFontColor,
            wholeFontTextAlign,
            wholeFontLineHeight,
            globalHasFontItalic,
            globalHasFontWeight,
            globalFontDirection,
            globalFontTextCase
        };
        const cropedBoxProps = {
            contentText,
            createdTranslBox,
            handlerCancelCrop,
            handlerConfirmCrop,
            cropedBoxParams,
            createStartNumber,
            updateCropedBox,
            setCropImg
        };
        const resultBoxProps = {
            resultLayers,
            resultHtmlLayers,
            resultBoxStyleParams,
            translatedText,
            wholeFontSize,
            wholeFontColor,
            wholeFontTextAlign,
            wholeFontLineHeight,
            globalHasFontItalic,
            globalHasFontWeight,
            globalFontDirection,
            globalFontTextCase,
            clearPreTranslResult,
            fonts,
            wholeFonFamily,
            defaultFontFamily
        };
        return (
            <div className="col-sm-10 col-xs-12 workbench-main" id="workbenchMain">
                <div className="workbench-work-wrap">
                    <div className="inner" id="inner-wrap">
                        <div className="trans-guide-prompt" data-html2canvas-ignore>
                            {contentText.prompt}
                        </div>
                        <div className="canvas-container" id="canvasContainer" style={canvasContainerStyle}>
                            {selectedImg &&
                                <React.Fragment>
                                    <canvas {...lowercanvasProps} data-html2canvas-ignore>{contentText.canvasPrompt}</canvas>
                                    <canvas {...uppercanvasProps} data-html2canvas-ignore>{contentText.canvasPrompt}</canvas>
                                    {hasCropedMarquee && <CropedBox {...cropedBoxProps} />}
                                </React.Fragment>
                            }
                            {hasCropBox && <TranslAreaBox {...translAreaBoxProps} />}
                            {displayTranslBox && <TranslResultBox {...translResultBoxProps} />}
                            <ResultBox {...resultBoxProps}/>
                        </div>
                    </div>
                </div>
                {displayTranslPopUp && <TranslpopUp {...translpopUpProps} />}
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
            </div>
        )
    }
}


export default WorkbenchMain;