import React from 'react';
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
            navigateWidth: 215,
            headerHeight: 50
        };
    }

    componentDidUpdate() {
        const that = this;
        const {elementWidth, elementHeight, navigateWidth, headerHeight} = this.state;
        let startx,
            starty,
            flag = 0,
            x,
            y,
            posX,
            posY,
            cropW,
            cropH,
            leftDistance,
            topDistance,
            op = 0,
            scale = 1,
            layers = [],
            odiv,
            currentR;

        let params = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            currentX: 0,
            currentY: 0,
            flag: false,
            kind: "drag"
        };
        // draw image according the selected image
        const canvas = this.canvas.current;
        const canvasParentElement = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = this.props.selectedImage;
        img.onload = () => {
            canvas.style.backgroundImage = `url(${img.src})`;
            canvas.style.backgroundSize = `${elementWidth}px ${elementHeight}px`;
        }
        document.oncontextmenu = (e) => {
            e.preventDefault();
        }
        // draw image from the upper canvas
        function resizeLeft(rect) {
            canvas.style.cursor = "w-resize";
            if (flag && op === 0) { op = 3; }
            if (flag && op === 3) {
                if (!currentR) { currentR = rect }
                currentR.x1 = x;
                currentR.width = currentR.x2 - currentR.x1;
            }
        }
        function resizeTop(rect) {
            canvas.style.cursor = "s-resize";
            if (flag && op === 0) { op = 4; }
            if (flag && op === 4) {
                if (!currentR) { currentR = rect }
                currentR.y1 = y
                currentR.height = currentR.y2 - currentR.y1
            }
        }
        function resizeWidth(rect) {
            canvas.style.cursor = "w-resize";
            if (flag && op === 0) { op = 5; }
            if (flag && op === 5) {
                if (!currentR) { currentR = rect }
                currentR.x2 = x
                currentR.width = currentR.x2 - currentR.x1
            }
        }
        function resizeHeight(rect) {
            canvas.style.cursor = "s-resize";
            if (flag && op === 0) { op = 6; }
            if (flag && op === 6) {
                if (!currentR) { currentR = rect }
                currentR.y2 = y
                currentR.height = currentR.y2 - currentR.y1
            }
        }
        function resizeLT(rect) {
            canvas.style.cursor = "se-resize";
            if (flag && op === 0) { op = 7; }
            if (flag && op === 7) {
                if (!currentR) { currentR = rect }
                currentR.x1 = x
                currentR.y1 = y
                currentR.height = currentR.y2 - currentR.y1
                currentR.width = currentR.x2 - currentR.x1
            }
        }
        function resizeWH(rect) {
            canvas.style.cursor = "se-resize";
            if (flag && op === 0) { op = 8; }
            if (flag && op === 8) {
                if (!currentR) { currentR = rect }
                currentR.x2 = x
                currentR.y2 = y
                currentR.height = currentR.y2 - currentR.y1
                currentR.width = currentR.x2 - currentR.x1
            }
        }
        function resizeLH(rect) {
            canvas.style.cursor = "ne-resize";
            if (flag && op === 0) { op = 9; }
            if (flag && op === 9) {
                if (!currentR) { currentR = rect }
                currentR.x1 = x
                currentR.y2 = y
                currentR.height = currentR.y2 - currentR.y1
                currentR.width = currentR.x2 - currentR.x1
            }
        }
        function resizeWT(rect) {
            canvas.style.cursor = "ne-resize";
            if (flag && op === 0) { op = 10; }
            if (flag && op === 10) {
                if (!currentR) { currentR = rect }
                currentR.x2 = x
                currentR.y1 = y
                currentR.height = currentR.y2 - currentR.y1
                currentR.width = currentR.x2 - currentR.x1
            }
        }
        function reshow(x, y) {
            let allNotIn = 1;
            layers.forEach(item => {
                ctx.beginPath();
                ctx.rect(item.x1, item.y1, item.width, item.height);
                ctx.strokeStyle = item.strokeStyle
                if (x >= (item.x1 - 25 / scale) && x <= (item.x1 + 25 / scale) && y <= (item.y2 - 25 / scale) && y >= (item.y1 + 25 / scale)) {
                    resizeLeft(item);
                } else if (x >= (item.x2 - 25 / scale) && x <= (item.x2 + 25 / scale) && y <= (item.y2 - 25 / scale) && y >= (item.y1 + 25 / scale)) {
                    resizeWidth(item);
                } else if (y >= (item.y1 - 25 / scale) && y <= (item.y1 + 25 / scale) && x <= (item.x2 - 25 / scale) && x >= (item.x1 + 25 / scale)) {
                    resizeTop(item);
                } else if (y >= (item.y2 - 25 / scale) && y <= (item.y2 + 25 / scale) && x <= (item.x2 - 25 / scale) && x >= (item.x1 + 25 / scale)) {
                    resizeHeight(item);
                } else if (x >= (item.x1 - 25 / scale) && x <= (item.x1 + 25 / scale) && y <= (item.y1 + 25 / scale) && y >= (item.y1 - 25 / scale)) {
                    resizeLT(item);
                } else if (x >= (item.x2 - 25 / scale) && x <= (item.x2 + 25 / scale) && y <= (item.y2 + 25 / scale) && y >= (item.y2 - 25 / scale)) {
                    resizeWH(item);
                } else if (x >= (item.x1 - 25 / scale) && x <= (item.x1 + 25 / scale) && y <= (item.y2 + 25 / scale) && y >= (item.y2 - 25 / scale)) {
                    resizeLH(item);
                } else if (x >= (item.x2 - 25 / scale) && x <= (item.x2 + 25 / scale) && y <= (item.y1 + 25 / scale) && y >= (item.y1 - 25 / scale)) {
                    resizeWT(item);
                }
                if (ctx.isPointInPath(x * scale, y * scale)) {
                    render(item);
                    allNotIn = 0;
                }
            })
            if (flag && allNotIn && op < 3) {
                op = 1
            }

        }
        function render(rect) {
            canvas.style.cursor = "move";
            if (flag && op === 0) { op = 2; }
            if (flag && op === 2) {
                if (!currentR) { currentR = rect }
                currentR.x2 += x - leftDistance - currentR.x1
                currentR.x1 += x - leftDistance - currentR.x1
                currentR.y2 += y - topDistance - currentR.y1
                currentR.y1 += y - topDistance - currentR.y1
            }
        }
        function isPointInRetc(x, y) {
            let len = layers.length;
            for (let i = 0; i < len; i++) {
                if (layers[i].x1 < x && x < layers[i].x2 && layers[i].y1 < y && y < layers[i].y2) {
                    return layers[i];
                }
            }
        }
        function fixPosition(position) {
            if (position.x1 > position.x2) {
                let x = position.x1;
                position.x1 = position.x2;
                position.x2 = x;
            }
            if (position.y1 > position.y2) {
                let y = position.y1;
                position.y1 = position.y2;
                position.y2 = y;
            }
            position.width = position.x2 - position.x1;
            position.height = position.y2 - position.y1;
            if(position.width<50||position.height<50){
                position.width=60;
                position.height=60;
                position.x2+=position.x1+60;
                position.y2+=position.y1+60;
            }
            return position
        }
        function clearLayers () {
            layers.pop();
            ctx.clearRect(0, 0, elementWidth, elementHeight);
            reshow();
            if(odiv)  odiv.remove();
        }

        function mousedown (e) {
            startx = (e.pageX - navigateWidth - canvasParentElement.offsetLeft) / scale;
            starty = (e.pageY - headerHeight - canvasParentElement.offsetTop + $("workbenchMain").scrollTop) / scale;
            
            currentR = isPointInRetc(startx, starty);
            if (currentR) {
                leftDistance = startx - currentR.x1;
                topDistance = starty - currentR.y1;
            }
            if(op < 3)  clearLayers ();
            ctx.strokeRect(x, y, 0, 0);
            ctx.strokeStyle = 'red';
            flag = 1;
        }
        function mousemove (e) {
            x = (e.pageX - navigateWidth - canvasParentElement.offsetLeft) / scale;
            y = (e.pageY - headerHeight - canvasParentElement.offsetTop + $("workbenchMain").scrollTop) / scale;
            ctx.setLineDash([10]);
            canvas.style.cursor = "crosshair";
            ctx.clearRect(0, 0, elementWidth, elementHeight);
            if (flag && op === 1) {
                ctx.strokeRect(startx, starty, x - startx, y - starty);
            }
            reshow(x, y);
        }
        function mouseup (e) {
            posX = startx;
            posY = starty;
            cropW = x - startx;
            cropH = y - starty;
            if(x - startx < 0) {
                posX = x;
                cropW = startx - x;
            }
            if(y - starty < 0) {
                posY = y;
                cropH = starty - y;
            }
            if (op === 1) {
                odiv = document.createElement("div");
                canvasParentElement.appendChild(odiv);
                odiv.setAttribute("id", "zxxCropBox");
                odiv.setAttribute("class", "zxxCropBox");
                odiv.style.height = `${cropH}px`;
                odiv.style.width = `${cropW}px`;
                odiv.style.left = `${posX}px`;
                odiv.style.top = `${posY}px`;
                odiv.innerHTML = `
                    <div id="zxxCropBoxCancel" class="cancel" title="delete">
                        <span class="glyphicon glyphicon-trash">
                    </div>
                    <div class="source-area-tip" >
                        <div class="content-tip">
                            Create the text frame
                        </div>
                        <div class="ok" title="confirm" id="zxxCropBoxConfirm"> 
                            <span class="glyphicon glyphicon-ok"></span>
                        </div>
                    </div>
                    <div class="border-top"></div>
                    <div class="border-left"></div>
                    <div class="border-bottom"></div>
                    <div class="border-right"></div>
                    <div id="zxxDragBg" class="move"></div>
                    <div id="dragLeftTop" class="drag nw-resize"></div>
                    <div id="dragLeftBot" class="drag sw-resize"></div>
                    <div id="dragRightTop" class="drag ne-resize"></div>
                    <div id="dragRightBot" class="drag se-resize"></div>
                    <div id="dragTopCenter" class="drag n-resize"></div>
                    <div id="dragBotCenter" class="drag s-resize"></div>
                    <div id="dragRightCenter" class="drag e-resize"></div>
                    <div id="dragLeftCenter" class="drag w-resize"></div>`;
                     
                //bind drag
                startDrag($("zxxDragBg"), $("zxxCropBox"), "drag");
                //bind pull
                startDrag($("dragLeftTop"), $("zxxCropBox"), "nw");
                startDrag($("dragLeftBot"), $("zxxCropBox"), "sw");
                startDrag($("dragRightTop"), $("zxxCropBox"), "ne");
                startDrag($("dragRightBot"), $("zxxCropBox"), "se");
                startDrag($("dragTopCenter"), $("zxxCropBox"), "n");
                startDrag($("dragBotCenter"), $("zxxCropBox"), "s");
                startDrag($("dragRightCenter"), $("zxxCropBox"), "e");
                startDrag($("dragLeftCenter"), $("zxxCropBox"), "w");
                $("zxxCropBoxCancel").addEventListener("click", ()=> {
                    clearLayers();
                    that.props.openModal();
                })
                $("zxxCropBoxConfirm").addEventListener("click", ()=> {
                    const cropedImg = cropImage(img, posX / scale, posY / scale, parseInt(cropW) / scale, parseInt(cropH) / scale);
                    that.props.setCropImg(cropedImg);
                    that.props.openTranlPopUp();
                })
            }else if(op>=3){
                fixPosition(currentR)
            }
            currentR = null;
            flag = 0;
            reshow(x, y);
            op = 0;
        }
        canvas.onmouseleave = function () {
            canvas.onmousedown = null;
            canvas.onmousemove = null;
            canvas.onmouseup = null;
        }
        canvas.onmouseenter = function () {
            canvas.onmousedown = mousedown;
            canvas.onmousemove = mousemove;
            canvas.onmouseup = mouseup;
        }

        function cropImage(img, cropPosX, cropPosY, width, height) {
            /*var cropContainer = ID("cropContainer");
            cropContainer.parentNode.removeChild(cropContainer);*/
            /*ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);*/
            //sx,sy 是相对于图片的坐标。巨坑
            var newCanvas = document.createElement('canvas');
            newCanvas.setAttribute('id', 'newCanvas');
            newCanvas.width = width * scale;
            newCanvas.height = height * scale;
            var newCtx = newCanvas.getContext('2d');
            newCtx.drawImage(img, cropPosX, cropPosY, width, height, 0, 0, width * scale, height * scale);
        
            // canvas转化为图片
            var newImage = new Image();
            newImage.src = newCanvas.toDataURL("image/png");
            console.log("newImage", newImage);
            return newImage
          }

        var startDrag = function (point, target, kind) {
            params.width = getCss(target, "width");
            params.height = getCss(target, "height");
            if (getCss(target, "left") !== "auto") {
              params.left = getCss(target, "left");
            }
            if (getCss(target, "top") !== "auto") {
              params.top = getCss(target, "top");
            }
            
            point.onmousedown = function (event) {
              params.kind = kind;
              params.flag = true;
              
              if (!event) {
                event = window.event;
              }
              var e = event;
              params.currentX = e.clientX;  //mouse down x coordinates
              params.currentY = e.clientY;  //mouse down y coordinates
              
              document.onmousemove = function (event) {
                let e = event ? event : window.event;
                if (params.flag) {
                  var nowX = e.clientX; // mouse move x coordinates
                  var nowY = e.clientY;   // mouse down y coordinates
                  var disX = nowX - params.currentX;  // mouse move x distance
                  var disY = nowY - params.currentY;  // mouse move y distance
                  if (params.kind === "n") {
                    //pull top, height increace or minus
                    target.style.top = parseInt(params.top) + disY + "px";
                    target.style.height = parseInt(params.height) - disY + "px";
                  } else if (params.kind === "w") { //pull left
                    target.style.left = parseInt(params.left) + disX + "px";
                    target.style.width = parseInt(params.width) - disX + "px";
                  } else if (params.kind === "e") { //pull right
                    target.style.width = parseInt(params.width) + disX + "px";
                  } else if (params.kind === "s") { //pull bottom
                    target.style.height = parseInt(params.height) + disY + "px";
                  } else if (params.kind === "nw") { //pull left top
                    target.style.left = parseInt(params.left) + disX + "px";
                    target.style.width = parseInt(params.width) - disX + "px";
                    target.style.top = parseInt(params.top) + disY + "px";
                    target.style.height = parseInt(params.height) - disY + "px";
                  } else if (params.kind === "ne") { //pull right top
                    target.style.top = parseInt(params.top) + disY + "px";
                    target.style.height = parseInt(params.height) - disY + "px";
                    target.style.width = parseInt(params.width) + disX + "px";
                  } else if (params.kind === "sw") { //pull left bottom
                    target.style.left = parseInt(params.left) + disX + "px";
                    target.style.width = parseInt(params.width) - disX + "px";
                    target.style.height = parseInt(params.height) + disY + "px";
                  } else if (params.kind === "se") { //pull left bottom
                    target.style.width = parseInt(params.width) + disX + "px";
                    target.style.height = parseInt(params.height) + disY + "px";
                  } else { //move
                    target.style.left = parseInt(params.left) + disX + "px";
                    target.style.top = parseInt(params.top) + disY + "px";
                  }
                }
  
                document.onmouseup = function () {
                  params.flag = false;
                  if (getCss(target, "left") !== "auto") {
                    params.left = getCss(target, "left");
                  }
                  if (getCss(target, "top") !== "auto") {
                    params.top = getCss(target, "top");
                  }
                  params.width = getCss(target, "width");
                  params.height = getCss(target, "height");

                  //给隐藏文本框赋值
                  posX = parseInt(target.style.left);
                  posY = parseInt(target.style.top);
                  cropW = parseInt(target.style.width);
                  cropH = parseInt(target.style.height);
                  if (posX < 0) {
                    posX = 0;
                  }
                  if (posY < 0) {
                    posY = 0;
                  }
                  if ((posX + cropW) > elementWidth) {
                    cropW = elementWidth - posX;
                  }
                  if ((posY + cropH) > elementHeight) {
                    cropH = elementHeight - posY;
                  }
                };
              }
            };
        };
       
    }

    render() {
        const {modalOpen} = this.props;
        const modalProps = {};
        return (
            <div className="col-sm-10 col-xs-12 workbench-main" id= "workbenchMain">
                <div className="workbench-work-wrap">
                    <div className="inner">
                        <div className="trans-guide-prompt">
                            Select the text or the red box to translate
                        </div>
                        <div className="canvas-container">
                            <canvas ref={this.canvas} className="lower-canvas" width="565" height="800" ></canvas>
                        </div>
                        {modalOpen &&
                            <Modal {...modalProps}>
                                123242
                            </Modal>
                        }
                        <TranslpopUp>

                        </TranslpopUp>
                    </div>
                </div>
            </div>
        )
    }
}

const $ =  (id)=> {
    return document.getElementById(id);
};
const getCss = (o, key) => {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
  };

export default WorkbenchMain;