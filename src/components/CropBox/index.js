import React, { Fragment } from 'react';
import cropBoxData from './cropBoxData';

class CropBox extends React.Component {
    constructor(props) {
        super(props);
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
        this.state = {
            img: this.props.img,
            cropH: this.props.cropH,
            cropW: this.props.cropW,
            posX: this.props.posX,
            posY: this.props.posY,
            componentProps: this.props.componentProps
        }
    }
    
    componentDidMount () {
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
        $("cropBoxCancel").addEventListener("click", () => {
            if ($("zxxCropBox")) $("zxxCropBox").remove();
            this.props.openModal();
        })
        $("cropBoxConfirm").addEventListener("click", () => {
            const cropedImg = this.cropImage(this.img, this.posX / this.scale, this.posY / this.scale, parseInt(this.cropW) / this.scale, parseInt(this.cropH) / this.scale);
            this.props.setCropImg(cropedImg);
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
            if ($("cropBoxCancel")) {
                $("cropBoxCancel").style.display = "none";
            }
            if ($("cropBoxSourceArea")) {
                $("cropBoxSourceArea").style.display = "none";
            }

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

                document.addEventListener("mouseup", ()=> {
                    this.params.flag = false;
                    if ($("cropBoxCancel")) {
                        $("cropBoxCancel").style.display = "block";
                    }
                    if ($("cropBoxSourceArea")) {
                        $("cropBoxSourceArea").style.display = "block";
                    }
                    if (getCss(target, "left") !== "auto") {
                        this.params.left = getCss(target, "left");
                    }
                    if (getCss(target, "top") !== "auto") {
                        this.params.top = getCss(target, "top");
                    }
                    this.params.width = getCss(target, "width");
                    this.params.height = getCss(target, "height");

                })
            })
        })
    }

    
    cropImage(img, cropPosX, cropPosY, width, height) {

        const newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('id', 'newCanvas');
        newCanvas.width = width * this.scale;
        newCanvas.height = height * this.scale;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(img, cropPosX, cropPosY, width, height, 0, 0, width * this.scale, height * this.scale);

        // canvas transform to img
        const newImage = new Image();
        newImage.src = newCanvas.toDataURL("image/png");
        console.log("newImage", newImage);
        return newImage
    }

    render() {
        return (
            <Fragment>
                <div id="cropBoxCancel" class="cancel" title="delete">
                    <span class="glyphicon glyphicon-trash"></span>
                </div>
                <div class="source-area-tip" id="cropBoxSourceArea">
                    <div class="content-tip">
                        Create the text frame
                    </div>
                    <div class="ok" title="confirm" id="cropBoxConfirm">
                        <span class="glyphicon glyphicon-ok"></span>
                    </div>
                </div>
                {cropBoxData.map((item, index) => {
                    return (
                        <div {...item} key={index}></div>
                    )
                })}
            </Fragment>
        )
    }
}

const $ = (id) => {
    return document.getElementById(id);
};
const getCss = (o, key) => {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};

export default CropBox;