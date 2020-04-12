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
            selectedImage: props.selectedImage,
            selectedTranslImage: props.selectedTranslImage,
            elementWidth: 870,
            scale: props.scale
        };
    }

    drawCanvasBackGround(prevProps) {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        const upperCanvas = document.getElementById("upper-canvas");
        const ctx_upper = upperCanvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        let imgSrc = this.state.selectedImage;
        if (this.props.status && this.state.selectedTranslImage) {
            imgSrc = this.state.selectedTranslImage;
        }
        img.src = imgSrc;
        img.onload = () => {
            const currentElementWidth = this.state.elementWidth * this.props.scale;
            const elementHeight = img.naturalHeight * (this.state.elementWidth / img.naturalWidth);
            const currentElementHeight = elementHeight * this.props.scale;
            img.width = currentElementWidth;
            img.height = currentElementHeight;
            if (!this.props.imgHeight) {
                this.props.receivedImgSize(currentElementWidth, currentElementHeight);
            }
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${currentElementWidth}px ${currentElementHeight}px`;
            canvas.style.backgroundRepeat = "no-repeat";
            const marquee = this.props.marquee;
            if (marquee === "rectangular" || !marquee) {
                this._drawCanvas = new drawRect(canvas, this.props.scale, img, this.state.elementWidth, elementHeight, this.props);
            }
            upperCanvas.addEventListener("mouseleave", () => {
                upperCanvas.addEventListener('mousedown', null);
                upperCanvas.addEventListener('mousemove', null);
                upperCanvas.addEventListener('mouseup', null);
            });
            upperCanvas.addEventListener("mouseenter", () => {
                if (this._drawCanvas) {
                    upperCanvas.addEventListener('mousedown', (e) => this._drawCanvas.mousedown(e));
                    upperCanvas.addEventListener('mousemove', (e) => this._drawCanvas.mousemove(e));
                    upperCanvas.addEventListener('mouseup', (e) => this._drawCanvas.mouseup(e));
                }
            });
            const { displayTranslBox, startNumber, maskTextImgs = {}, createdTranslBox = {} } = this.props;
            let left, top, width, height, cropedImg;
            if (createdTranslBox[startNumber]) {
                left = createdTranslBox[startNumber].left;
                top = createdTranslBox[startNumber].top;
                width = createdTranslBox[startNumber].width;
                height = createdTranslBox[startNumber].height;
                cropedImg = createdTranslBox[startNumber].cropedImg;
            }
            if (displayTranslBox && Object.keys(maskTextImgs).length) {
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
                    ctx_upper.drawImage(img, left, top, width, height);
                }
            }
            if (prevProps.clearPreMask !== this.props.clearPreMask && this.props.clearPreMask) {
                ctx_upper.clearRect(left, top, width, height);
                delete createdTranslBox[startNumber];
            }

            if (prevProps.clearPreTranslResult !== this.props.clearPreTranslResult && this.props.clearPreTranslResult) {
                ctx_upper.clearRect(0, 0, currentElementWidth, currentElementHeight);
                ctx.clearRect(0, 0, currentElementWidth, currentElementHeight);
            }
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
        }
    }

    componentDidMount() {
        const leftNavigationWidth = 200;
        const rightTranslateAreaWidth = 215;
        const processPadding = 40;
        const minProcessWidth = 870;
        let currentScreenProcessWidth = window.innerWidth - leftNavigationWidth - rightTranslateAreaWidth - processPadding * 2;
        if (currentScreenProcessWidth < minProcessWidth) {
            currentScreenProcessWidth = minProcessWidth
        }
        this.setState({
            ...this.state,
            elementWidth: currentScreenProcessWidth
        })
    }

    componentDidUpdate(prevProps) {
        const {
            selectedImage,
            selectedTranslImage,
            hasCropBox,
            displayResultBox,
            displayTranslBox,
            selectedImg
        } = this.props;
        if (prevProps.selectedImage !== selectedImage || prevProps.selectedTranslImage !== selectedTranslImage) {
            this.setState({
                selectedImage: selectedImage,
                selectedTranslImage: selectedTranslImage
            })
        }
        if (((!hasCropBox && displayResultBox) || !displayTranslBox) && this._drawCanvas) {
            this._drawCanvas.clearLayers();
        }
        if (selectedImg) {
            this.drawCanvasBackGround(prevProps);
        }
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
            clearPreTranslResult,
            fonts,
            wholeFonFamily,
            defaultFontFamily
        } = this.props;
        const { elementWidth } = this.state;
        const currentElementWidth = elementWidth * scale;
        const canvasContainerStyle = {
            width: `${currentElementWidth}px`,
            height: `${imgHeight}px`,
            backgroundColor: !selectedImg && "gray"
        };
        const lowercanvasProps = {
            id: "lower-canvas",
            className: "lower-canvas",
            ref: this.canvas,
            width: currentElementWidth,
            height: imgHeight
        };

        const uppercanvasProps = {
            id: "upper-canvas",
            className: "upper-canvas",
            width: currentElementWidth,
            height: imgHeight,
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
            setCropImg
        };
        const resultBoxProps = {
            resultLayers,
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
                    <div className="inner">
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