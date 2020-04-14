import React from 'react';
import { $, getCss } from '../../utilities';

class CropedBox extends React.PureComponent {
    constructor(props) {
        super(props);
        const {img, left, top, width, height} = props.cropedBoxParams;
        this.scaleX = img.width / img.naturalWidth;
        this.scaleY = img.height / img.naturalHeight;
        this.img = img;
        this.posX = left;
        this.posY = top;
        this.cropW = width;
        this.cropH = height;
        this.params = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            currentX: 0,
            currentY: 0,
            flag: false,
            kind: "drag"
        };
    }


    componentDidMount() {
        
        //bind drag
        this.startDrag($("zxxDragBg"), $("cropBox"), "drag");
        //bind pull
        this.startDrag($("dragLeftTop"), $("cropBox"), "nw");
        this.startDrag($("dragLeftBot"), $("cropBox"), "sw");
        this.startDrag($("dragRightTop"), $("cropBox"), "ne");
        this.startDrag($("dragRightBot"), $("cropBox"), "se");
        this.startDrag($("dragTopCenter"), $("cropBox"), "n");
        this.startDrag($("dragBotCenter"), $("cropBox"), "s");
        this.startDrag($("dragRightCenter"), $("cropBox"), "e");
        this.startDrag($("dragLeftCenter"), $("cropBox"), "w");

        $("cropBoxConfirm").addEventListener("click", () => {
            const cropedImg = this.cropImage(
                this.img,
                this.posX / this.scaleX,
                this.posY / this.scaleY,
                parseInt(this.cropW) / this.scaleX,
                parseInt(this.cropH) / this.scaleY
            );
            const setCropImgParams = {
                left: this.posX,
                top: this.posY,
                width: this.cropW,
                height: this.cropH,
                cropedImg
            };
            this.props.handlerCancelCrop();
            const createdTranslBox = this.props.createdTranslBox || {};
            const createdTranslBoxNumber = Object.keys(createdTranslBox).length || 0;
            this.props.createStartNumber(createdTranslBoxNumber + 1)
            this.props.setCropImg(setCropImgParams);
        })
    }
    
    startDrag(point, target, kind) {
        this.params.width = getCss(target, "width");
        this.params.height = getCss(target, "height");
        if (getCss(target, "left") !== "auto") {
            this.params.left = getCss(target, "left");
        }
        if (getCss(target, "top") !== "auto") {
            this.params.top = getCss(target, "top");
        }
        point.addEventListener("mousedown", (event) => {
            this.params.kind = kind;
            this.params.flag = true;
            if ($("cropBoxCancel")) $("cropBoxCancel").style.display = "none";
            if ($("cropBoxSourceArea")) $("cropBoxSourceArea").style.display = "none";
            if (!event) {
                event = window.event;
            }
            const e = event;
            this.params.currentX = e.clientX;  //mouse down x coordinates
            this.params.currentY = e.clientY;  //mouse down y coordinates
            document.addEventListener("mousemove", (event) => {
                let e = event ? event : window.event;
                if (this.params.flag) {
                    const nowX = e.clientX; // mouse move x coordinates
                    const nowY = e.clientY;   // mouse down y coordinates
                    const disX = nowX - this.params.currentX;  // mouse move x distance
                    const disY = nowY - this.params.currentY;  // mouse move y distance
                    if (this.params.kind === "n") {
                        //pull top, height increace or minus
                        target.style.top = parseInt(this.params.top) + disY + "px";
                        target.style.height = parseInt(this.params.height) - disY + "px";
                    } else if (this.params.kind === "w") { //pull left
                        target.style.left = parseInt(this.params.left) + disX + "px";
                        target.style.width = parseInt(this.params.width) - disX + "px";
                    } else if (this.params.kind === "e") { //pull right
                        target.style.width = parseInt(this.params.width) + disX + "px";
                    } else if (this.params.kind === "s") { //pull bottom
                        target.style.height = parseInt(this.params.height) + disY + "px";
                    } else if (this.params.kind === "nw") { //pull left top
                        target.style.left = parseInt(this.params.left) + disX + "px";
                        target.style.width = parseInt(this.params.width) - disX + "px";
                        target.style.top = parseInt(this.params.top) + disY + "px";
                        target.style.height = parseInt(this.params.height) - disY + "px";
                    } else if (this.params.kind === "ne") { //pull right top
                        target.style.top = parseInt(this.params.top) + disY + "px";
                        target.style.height = parseInt(this.params.height) - disY + "px";
                        target.style.width = parseInt(this.params.width) + disX + "px";
                    } else if (this.params.kind === "sw") { //pull left bottom
                        target.style.left = parseInt(this.params.left) + disX + "px";
                        target.style.width = parseInt(this.params.width) - disX + "px";
                        target.style.height = parseInt(this.params.height) + disY + "px";
                    } else if (this.params.kind === "se") { //pull left bottom
                        target.style.width = parseInt(this.params.width) + disX + "px";
                        target.style.height = parseInt(this.params.height) + disY + "px";
                    } else { //move
                        target.style.left = parseInt(this.params.left) + disX + "px";
                        target.style.top = parseInt(this.params.top) + disY + "px";
                    }
                }

                document.addEventListener("mouseup", (e) => {
                    this.params.flag = false;
                    if ($("cropBoxCancel")) $("cropBoxCancel").style.display = "block";
                    if ($("cropBoxSourceArea")) $("cropBoxSourceArea").style.display = "block";
                    if (getCss(target, "left") !== "auto") this.params.left = getCss(target, "left");
                    if (getCss(target, "top") !== "auto") this.params.top = getCss(target, "top");
                    this.params.width = getCss(target, "width");
                    this.params.height = getCss(target, "height");
                    point.removeEventListener("mousedown", null);
                    document.removeEventListener("mousemove", null);
                })
            })
        })
    }
    cropImage(img, cropPosX, cropPosY, width, height) {
        const newCanvas = document.createElement('canvas');
        const cropImgWidth = width * this.scaleX;
        const cropImgHeight = height * this.scaleY;
        newCanvas.width = cropImgWidth;
        newCanvas.height = cropImgHeight;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(img, cropPosX, cropPosY, width, height, 0, 0, cropImgWidth, cropImgHeight);
        // canvas transform to img
        const newImage = new Image();
        newImage.src = newCanvas.toDataURL("image/jpeg", 0.8);
        return newImage
    }

    render () {
        const {contentText, handlerCancelCrop, cropedBoxParams} = this.props;
        const {left, top, width, height} = cropedBoxParams;
        const cropBoxStyle = {
            left: left + "px",
            top: top + "px",
            width: width + "px",
            height: height + "px"
        }
        return (
            <div className="cropBox" id="cropBox" style={cropBoxStyle} data-html2canvas-ignore>
                <div id="cropBoxCancel" className="cancel" title="delete" onClick={handlerCancelCrop}>
                    <span className="glyphicon glyphicon-trash"></span>
                </div>
                <div className="source-area-tip" id="cropBoxSourceArea">
                    <div className="content-tip">
                        {contentText.cropBoxHelpText}
                    </div>
                    <div className="ok" title="confirm" id="cropBoxConfirm"> 
                        <span className="glyphicon glyphicon-ok"></span>
                    </div>
                </div>
                <div className="border-top"></div>
                <div className="border-left"></div>
                <div className="border-bottom"></div>
                <div className="border-right"></div>
                <div id="zxxDragBg" className="move"></div>
                <div id="dragLeftTop" className="drag nw-resize"></div>
                <div id="dragLeftBot" className="drag sw-resize"></div>
                <div id="dragRightTop" className="drag ne-resize"></div>
                <div id="dragRightBot" className="drag se-resize"></div>
                <div id="dragTopCenter" className="drag n-resize"></div>
                <div id="dragBotCenter" className="drag s-resize"></div>
                <div id="dragRightCenter" className="drag e-resize"></div>
                <div id="dragLeftCenter" className="drag w-resize"></div>
            </div>
        )
    }
}

export default CropedBox;