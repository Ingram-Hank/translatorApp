import { $ } from '../../utilities';
class drawRect {
    constructor(canvas, scale, img, elementWidth, elementHeight, componentProps) {
        this.canvas = canvas;
        this.canvasParentElement = canvas.parentElement;
        this.ctx = canvas.getContext('2d');
        this.scale = scale;
        this.img = img;
        this.scaleX = img.width / img.naturalWidth;
        this.scaleY = img.height / img.naturalHeight;
        this.elementWidth = elementWidth * scale;
        this.elementHeight = elementHeight * scale;
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
        position.width = position.x2 - position.x1
        position.height = position.y2 - position.y1
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
    }

    mousedown(e) {
        e.stopPropagation();
        this.startx = e.pageX - this.navigateWidth - this.canvasParentElement.offsetLeft + $("workbenchMain").scrollLeft;
        this.starty = e.pageY - this.headerHeight - this.canvasParentElement.offsetTop + $("workbenchMain").scrollTop;
        if (this.props.hasCropBox || this.props.displayTranslBox) return false
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
        this.x = e.pageX - this.navigateWidth - this.canvasParentElement.offsetLeft + $("workbenchMain").scrollLeft;
        this.y = e.pageY - this.headerHeight - this.canvasParentElement.offsetTop + $("workbenchMain").scrollTop;
        if (this.props.hasCropBox || this.props.displayTranslBox) return false
        this.ctx.setLineDash([10]);
        this.ctx.clearRect(0, 0, this.elementWidth, this.elementHeight);
        if (this.flag && this.op === 1) {
            this.ctx.strokeRect(this.startx, this.starty, this.x - this.startx, this.y - this.starty);
        }
        this.reshow(this.x, this.y);
    }

    mouseup() {
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
        if (this.cropW < 50) {
            this.cropW = 60;
        }
        if (this.cropH < 50) {
            this.cropH = 60;
        }
        if (this.op === 1) {
            this.layers.push(this.fixPosition({
                x1: this.startx,
                y1: this.starty,
                x2: this.x,
                y2: this.y,
                strokeStyle: 'transparent',
                type: this.type
            }))
            const payload = {
               img: this.img,
               left: this.posX,
               top: this.posY,
               width: this.cropW,
               height: this.cropH
            }
            this.props.createCropedBox(payload);
        } else if (this.op >= 3) {
            this.fixPosition(this.currentR)
        }
        this.clearLayers();
        this.currentR = null;
        this.flag = 0;
        this.reshow(this.x, this.y);
        this.op = 0;
    }
    
}


export default drawRect;