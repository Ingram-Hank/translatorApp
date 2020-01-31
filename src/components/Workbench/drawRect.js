
class drawRect {
    constructor(canvas, scale, img, componentProps) {
        this.canvas = canvas;
        this.canvasParentElement = canvas.parentElement;
        this.ctx = canvas.getContext('2d');
        this.scale = scale;
        this.img = img;
        this.scaleX = img.width / img.naturalWidth;
        this.scaleY = img.height / img.naturalHeight;
        this.elementWidth = 565 * scale;
        this.elementHeight = 800 * scale;
        this.props = componentProps;
    }
    // Initialization variable
    navigateWidth = 215;
    headerHeight = 50;
    startx = 0;
    starty = 0;
    x = 0;
    y = 0;
    posX = 0;
    posY = 0;
    cropW = 0;
    cropH = 0;
    leftDistance = 0;
    topDistance = 0;
    flag = 0;
    op = 0;
    odiv;
    layers = [];
    currentR;
    params = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        currentX: 0,
        currentY: 0,
        flag: false,
        kind: "drag"
    };

    resizeLeft(rect) {
        this.canvas.style.cursor = "w-resize";
        if (this.flag && this.op === 0) { this.op = 3; }
        if (this.flag && this.op === 3) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x1 = this.x;
            this.currentR.width = this.currentR.x2 - this.currentR.x1;
        }
    }

    resizeTop(rect) {
        this.canvas.style.cursor = "s-resize";
        if (this.flag && this.op === 0) { this.op = 4; }
        if (this.flag && this.op === 4) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.y1 = this.y
            this.currentR.height = this.currentR.y2 - this.currentR.y1
        }
    }

    resizeWidth(rect) {
        this.canvas.style.cursor = "w-resize";
        if (this.flag && this.op === 0) { this.op = 5; }
        if (this.flag && this.op === 5) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x2 = this.x
            this.currentR.width = this.currentR.x2 - this.currentR.x1
        }
    }

    resizeHeight(rect) {
        this.canvas.style.cursor = "s-resize";
        if (this.flag && this.op === 0) { this.op = 6; }
        if (this.flag && this.op === 6) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.y2 = this.y
            this.currentR.height = this.currentR.y2 - this.currentR.y1
        }
    }

    resizeLT(rect) {
        this.canvas.style.cursor = "se-resize";
        if (this.flag && this.op === 0) { this.op = 7; }
        if (this.flag && this.op === 7) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x1 = this.x
            this.currentR.y1 = this.y
            this.currentR.height = this.currentR.y2 - this.currentR.y1
            this.currentR.width = this.currentR.x2 - this.currentR.x1
        }
    }

    resizeWH(rect) {
        this.canvas.style.cursor = "se-resize";
        if (this.flag && this.op === 0) { this.op = 8; }
        if (this.flag && this.op === 8) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x2 = this.x
            this.currentR.y2 = this.y
            this.currentR.height = this.currentR.y2 - this.currentR.y1
            this.currentR.width = this.currentR.x2 - this.currentR.x1
        }
    }

    resizeLH(rect) {
        this.canvas.style.cursor = "ne-resize";
        if (this.flag && this.op === 0) { this.op = 9; }
        if (this.flag && this.op === 9) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x1 = this.x
            this.currentR.y2 = this.y
            this.currentR.height = this.currentR.y2 - this.currentR.y1
            this.currentR.width = this.currentR.x2 - this.currentR.x1
        }
    }

    resizeWT(rect) {
        this.canvas.style.cursor = "ne-resize";
        if (this.flag && this.op === 0) { this.op = 10; }
        if (this.flag && this.op === 10) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x2 = this.x
            this.currentR.y1 = this.y
            this.currentR.height = this.currentR.y2 - this.currentR.y1
            this.currentR.width = this.currentR.x2 - this.currentR.x1
        }
    }

    reshow(x, y) {
        let allNotIn = 1;
        this.layers.forEach(item => {
            this.ctx.beginPath();
            this.ctx.rect(item.x1, item.y1, item.width, item.height);
            this.ctx.strokeStyle = item.strokeStyle
            if (x >= (item.x1 - 25 / this.scale) && x <= (item.x1 + 25 / this.scale) && y <= (item.y2 - 25 / this.scale) && y >= (item.y1 + 25 / this.scale)) {
                this.resizeLeft(item);
            } else if (x >= (item.x2 - 25 / this.scale) && x <= (item.x2 + 25 / this.scale) && y <= (item.y2 - 25 / this.scale) && y >= (item.y1 + 25 / this.scale)) {
                this.resizeWidth(item);
            } else if (y >= (item.y1 - 25 / this.scale) && y <= (item.y1 + 25 / this.scale) && x <= (item.x2 - 25 / this.scale) && x >= (item.x1 + 25 / this.scale)) {
                this.resizeTop(item);
            } else if (y >= (item.y2 - 25 / this.scale) && y <= (item.y2 + 25 / this.scale) && x <= (item.x2 - 25 / this.scale) && x >= (item.x1 + 25 / this.scale)) {
                this.resizeHeight(item);
            } else if (x >= (item.x1 - 25 / this.scale) && x <= (item.x1 + 25 / this.scale) && y <= (item.y1 + 25 / this.scale) && y >= (item.y1 - 25 / this.scale)) {
                this.resizeLT(item);
            } else if (x >= (item.x2 - 25 / this.scale) && x <= (item.x2 + 25 / this.scale) && y <= (item.y2 + 25 / this.scale) && y >= (item.y2 - 25 / this.scale)) {
                this.resizeWH(item);
            } else if (x >= (item.x1 - 25 / this.scale) && x <= (item.x1 + 25 / this.scale) && y <= (item.y2 + 25 / this.scale) && y >= (item.y2 - 25 / this.scale)) {
                this.resizeLH(item);
            } else if (x >= (item.x2 - 25 / this.scale) && x <= (item.x2 + 25 / this.scale) && y <= (item.y1 + 25 / this.scale) && y >= (item.y1 - 25 / this.scale)) {
                this.resizeWT(item);
            }
            if (this.ctx.isPointInPath(x * this.scale, y * this.scale)) {
                this.render(item);
                allNotIn = 0;
            }
        })
        if (this.flag && allNotIn && this.op < 3) {
            this.op = 1
        }
    }

    render(rect) {
        this.canvas.style.cursor = "move";
        if (this.flag && this.op === 0) { this.op = 2; }
        if (this.flag && this.op === 2) {
            if (!this.currentR) { this.currentR = rect }
            this.currentR.x2 += this.x - this.leftDistance - this.currentR.x1
            this.currentR.x1 += this.x - this.leftDistance - this.currentR.x1
            this.currentR.y2 += this.y - this.topDistance - this.currentR.y1
            this.currentR.y1 += this.y - this.topDistance - this.currentR.y1
        }
    }

    isPointInRetc(x, y) {
        let len = this.layers.length;
        for (let i = 0; i < len; i++) {
            if (this.layers[i].x1 < x && x < this.layers[i].x2 && this.layers[i].y1 < y && y < this.layers[i].y2) {
                return this.layers[i];
            }
        }
    }

    fixPosition(position) {
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
        if (position.width < 50 || position.height < 50) {
            position.width = 60;
            position.height = 60;
            position.x2 += position.x1 + 60;
            position.y2 += position.y1 + 60;
        }
        return position
    }

    clearLayers() {
        this.layers.pop();
        this.ctx.clearRect(0, 0, this.elementWidth, this.elementHeight);
        this.reshow();
        if (this.odiv) this.odiv.remove();
    }

    mousedown(e) {
        this.startx = (e.pageX - this.navigateWidth - this.canvasParentElement.offsetLeft) / this.scale;
        this.starty = (e.pageY - this.headerHeight - this.canvasParentElement.offsetTop + $("workbenchMain").scrollTop) / this.scale;

        this.currentR = this.isPointInRetc(this.startx, this.starty);
        if (this.currentR) {
            this.leftDistance = this.startx - this.currentR.x1;
            this.topDistance = this.starty - this.currentR.y1;
        }
        if (this.op < 3) {
            this.clearLayers();
        }
        this.ctx.strokeRect(this.x, this.y, 0, 0);
        this.ctx.strokeStyle = 'red';
        this.flag = 1;
    }

    mousemove(e) {
        this.x = (e.pageX - this.navigateWidth - this.canvasParentElement.offsetLeft) / this.scale;
        this.y = (e.pageY - this.headerHeight - this.canvasParentElement.offsetTop + $("workbenchMain").scrollTop) / this.scale;
        this.ctx.setLineDash([10]);
        this.canvas.style.cursor = "crosshair";
        this.ctx.clearRect(0, 0, this.elementWidth, this.elementHeight);
        if (this.flag && this.op === 1) {
            this.ctx.strokeRect(this.startx, this.starty, this.x - this.startx, this.y - this.starty);
        }
        this.reshow(this.x, this.y);
    }

    mouseup() {
        if (this.op === 1) {
            this.posX = this.startx;
            this.posY = this.starty;
            this.cropW = this.x - this.startx;
            this.cropH = this.y - this.starty;
            if (this.x - this.startx < 0) {
                this.posX = this.x;
                this.cropW = this.startx - this.x;
            }
            if (this.y - this.starty < 0) {
                this.posY = this.y;
                this.cropH = this.starty - this.y;
            }
            this.odiv = document.createElement("div");
            this.canvasParentElement.appendChild(this.odiv);
            this.odiv.setAttribute("id", "cropBox");
            this.odiv.setAttribute("class", "cropBox");
            this.odiv.setAttribute("ref", "cropBox");
            this.odiv.style.height = `${this.cropH}px`;
            this.odiv.style.width = `${this.cropW}px`;
            this.odiv.style.left = `${this.posX}px`;
            this.odiv.style.top = `${this.posY}px`;
            this.odiv.innerHTML = `
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
                this.clearLayers();
                this.props.openModal();
            })
            $("cropBoxConfirm").addEventListener("click", () => {
                const cropedImg = this.cropImage(
                    this.img,
                    this.posX / this.scaleX,
                    this.posY / this.scaleY, 
                    parseInt(this.cropW) / this.scaleX,
                    parseInt(this.cropH) / this.scaleY
                );
                this.props.setCropImg(cropedImg);
            })
        }else if(this.op>=3){
            this.fixPosition(this.currentR)
        }
        this.currentR = null;
        this.flag = 0;
        this.reshow(this.x, this.y);
        this.op = 0;
    }

    cropImage(img, cropPosX, cropPosY, width, height) {
        const newCanvas = document.createElement('canvas');
        newCanvas.width = width * this.scaleX;
        newCanvas.height = height * this.scaleY;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(img, cropPosX, cropPosY, width, height, 0, 0, width * this.scaleX, height * this.scaleY);

        // canvas transform to img
        const newImage = new Image();
        newImage.src = newCanvas.toDataURL("image/png");
        return newImage
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

                document.addEventListener("mouseup", () => {
                    this.params.flag = false;
                    if ($("cropBoxCancel")) $("cropBoxCancel").style.display = "block";
                    if ($("cropBoxSourceArea")) $("cropBoxSourceArea").style.display = "block";
                    if (getCss(target, "left") !== "auto") this.params.left = getCss(target, "left");
                    if (getCss(target, "top") !== "auto") this.params.top = getCss(target, "top");
                    this.params.width = getCss(target, "width");
                    this.params.height = getCss(target, "height");

                    // assignment for the created odiv
                    this.posX = parseInt(target.style.left);
                    this.posY = parseInt(target.style.top);
                    this.cropW = parseInt(target.style.width);
                    this.cropH = parseInt(target.style.height);
                    if (this.posX < 0) {
                        this.posX = 0;
                    }
                    if (this.posY < 0) {
                        this.posY = 0;
                    }
                    if ((this.posX + this.cropW) > this.elementWidth) {
                        this.cropW = this.elementWidth - this.posX;
                    }
                    if ((this.posY + this.cropH) > this.elementHeight) {
                        this.cropH = this.elementHeight - this.posY;
                    }
                })
            })
        })
    }

}

const $ = (id) => {
    return document.getElementById(id);
};
const getCss = (o, key) => {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};


export default drawRect;