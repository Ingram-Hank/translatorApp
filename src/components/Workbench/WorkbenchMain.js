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
            selectedTranslImage: props.selectedTranslImage,
            elementWidth: 870,
            scale: props.scale
        };
    }

    drawCanvasBackGround(prevProps) {
        const canvas = this.canvas.current;
        const upperCanvas = document.getElementById("upper-canvas");
        const ctx_upper = upperCanvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        let imgSrc = this.state.selectedImage;
        if(this.props.status && this.state.selectedTranslImage) {
            imgSrc = this.state.selectedTranslImage;
        }
        img.src = imgSrc;
        img.onload = () => {
            const currentElementWidth = this.state.elementWidth * this.props.scale;
            const elementHeight = img.naturalHeight * (this.state.elementWidth/img.naturalWidth);
            const currentElementHeight = elementHeight * this.props.scale;
            img.width = currentElementWidth;
            img.height = currentElementHeight;
            if(!this.props.imgHeight){
                this.props.receivedImgSize(currentElementWidth, currentElementHeight);
            }
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${currentElementWidth}px ${currentElementHeight}px`;
            canvas.style.backgroundRepeat = "no-repeat";
            const marquee = this.props.marquee;
            if(marquee==="rectangular" || !marquee) {
                this._drawCanvas = new drawRect(canvas, this.props.scale, img, this.state.elementWidth, elementHeight, this.props);
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
            const {displayTranslBox, startNumber, maskTextImgs = {}, createdTranslBox = {}} = this.props;
            let left, top, width, height, cropedImg;
            if(createdTranslBox[startNumber]) {
                left = createdTranslBox[startNumber].left;
                top = createdTranslBox[startNumber].top;
                width = createdTranslBox[startNumber].width;
                height = createdTranslBox[startNumber].height;
                cropedImg = createdTranslBox[startNumber].cropedImg;
            }
            if(displayTranslBox && Object.keys(maskTextImgs).length) {
                const currentMaskImg = maskTextImgs[startNumber] || [];
                const img = new Image();
                if(currentMaskImg.length) {
                    left = currentMaskImg[currentMaskImg.length-1].left;
                    top = currentMaskImg[currentMaskImg.length-1].top;
                    width = currentMaskImg[currentMaskImg.length-1].width;
                    height = currentMaskImg[currentMaskImg.length-1].height;
                    cropedImg = currentMaskImg[currentMaskImg.length-1].cropedImg;
                }
                img.src = cropedImg;
                img.onload = ()=> {
                    ctx_upper.drawImage(img, left, top, width, height);
                }
            }
            if(this.props.clearPreMask){
                ctx_upper.clearRect(left, top, width, height);
                delete createdTranslBox[startNumber];
            }

            if(this.props.clearPreTranslResult) {
                ctx_upper.clearRect(0, 0, currentElementWidth, currentElementHeight)
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
        let currentScreenProcessWidth = window.innerWidth - leftNavigationWidth - rightTranslateAreaWidth - processPadding*2;
        if(currentScreenProcessWidth < minProcessWidth) {
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
            selectedImg,
            translatedText,
            clearPreTranslResult
         } = this.props;
        if (prevProps.selectedImage !== selectedImage || prevProps.selectedTranslImage !== selectedTranslImage) {
            this.setState({
                selectedImage: selectedImage,
                selectedTranslImage: selectedTranslImage
            })
        }
        if(((!hasCropBox && displayResultBox) || !displayTranslBox ) && this._drawCanvas) {
            this._drawCanvas.clearLayers();
            this._drawCanvas.clearCropBox();
        }
        if(selectedImg) {
            this.drawCanvasBackGround(prevProps);
        }
        if(prevProps.displayResultBox !== displayResultBox && displayResultBox && translatedText) {
            const canvasContainer = document.getElementById('canvasContainer');
            const docFrag = document.createDocumentFragment();
            this.ResultBox(docFrag);
            canvasContainer.appendChild(docFrag);
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
    }
    
    ResultBox(docFrag) {
        const {
            startNumber, 
            resultBoxStyleParams, 
            translatedText, 
            font,
            wholeFontSize,
            wholeFontColor,
            wholeFontTextAlign,
            wholeFontLineHeight,
            globalHasFontItalic,
            globalHasFontWeight,
            globalFontDirection,
            globalFontTextCase
        } = this.props;
        const {
            font_family = "CCWildWords",
            font_size = wholeFontSize || 40,
            font_color = wholeFontColor || "black",
            lineHeight = wholeFontLineHeight || 1.5,
            hasFontItalic = globalHasFontItalic,
            hasFontWeight = globalHasFontWeight,
            text_align = wholeFontTextAlign || "center",
            text_case = globalFontTextCase || "uppercase",
            font_direction = globalFontDirection || "horizontal",
            outline_color,
            shadow_color,
            outline_size,
            shadow_size
        } = font;
        const currentResultBoxStyleParams = resultBoxStyleParams[startNumber] || {};
        const {left, top, width, height, transform} = currentResultBoxStyleParams;
        const resultContainer = document.createElement('div');
        resultContainer.setAttribute("id", `${startNumber}_resultContainer`);
        resultContainer.setAttribute("class", "resultContainer");
        docFrag.appendChild(resultContainer);
        resultContainer.style.cssText = `
            left: ${left}px;
            top: ${top}px;
            width: ${width}px;
            height: ${height}px;
            padding: 5px;
            transform: ${transform};
            text-transform: ${text_case};
            font-family: ${font_family};
            font-size: ${font_size}px;
            color: ${font_color};
            font-style: ${hasFontItalic && "italic"};
            font-weight: ${hasFontWeight && "bold"};
            line-height: ${lineHeight};
            writing-mode: ${font_direction === "horizontal" ? "horizontal-tb" : "vertical-lr"};
            text-align: ${text_align};
            -webkit-text-stroke: ${outline_size}px ${outline_color};
            text-shadow: ${shadow_size}px ${shadow_size}px ${shadow_size}px ${shadow_color};
        `;
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
            globalFontTextCase
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
            </div>
        )
    }
}


export default WorkbenchMain;