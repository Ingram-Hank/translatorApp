import React from 'react';

class WorkbenchMain extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            selectedImage: props.selectedImage
        };
    }

    componentDidUpdate() {
        const elementWidth = 565, elementHeight = 800, navigateWidth = 215, headerHeight = 50;
        let startx,
            starty,
            flag,
            x,
            y,
            leftDistance,
            topDistance,
            op = 0,
            scale = 1,
            type = 0,
            layers = [],
            currentR;
        // draw image according the selected image
        const canvas = this.canvas.current;
        const workbenchMain = document.getElementsByClassName("workbench-main")[0];
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = this.props.selectedImage;
        img.onload = () => {
            canvas.style.backgroundImage = "url(" + img.src + ")";
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
                currentR.x1 = x
                currentR.width = currentR.x2 - currentR.x1
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
                ctx.stroke();
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
            if (position.width < 50 || position.height < 50) {
                position.width = 60;
                position.height = 60;
                position.x2 += position.x1 + 60;
                position.y2 += position.y1 + 60;
            }
            return position
        }

        function clearLayer() {
            layers.pop();
            ctx.clearRect(0, 0, elementWidth, elementHeight);
            reshow();
        }

        let mousedown = function (e) {
            startx = (e.pageX - navigateWidth - canvas.parentElement.offsetLeft) / scale;
            starty = (e.pageY - headerHeight - canvas.parentElement.offsetTop + workbenchMain.scrollTop) / scale;
            currentR = isPointInRetc(startx, starty);
            if (currentR) {
                leftDistance = startx - currentR.x1;
                topDistance = starty - currentR.y1;
            }
            ctx.strokeRect(x, y, 0, 0);
            ctx.strokeStyle = 'red';
            flag = 1;
        }
        let mousemove = function (e) {
            x = (e.pageX - navigateWidth - canvas.parentElement.offsetLeft) / scale;
            y = (e.pageY - headerHeight - canvas.parentElement.offsetTop + workbenchMain.scrollTop) / scale;
            ctx.save();
            canvas.style.cursor = "crosshair";
            ctx.clearRect(0, 0, elementWidth, elementHeight)
            if (flag && op === 1) {
                ctx.strokeRect(startx, starty, x - startx, y - starty);
            }
            ctx.restore();
            reshow(x, y);
            ctx.setLineDash([10, 10]);
        }
        let mouseup = function (e) {
            if (op === 1) {
                layers.push(fixPosition({
                    x1: startx,
                    y1: starty,
                    x2: x,
                    y2: y,
                    strokeStyle: 'red',
                    type: type
                }))
            } else if (op >= 3) {
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
            document.onmouseup = mouseup;
        }

    }

    render() {
        return (
            <div className="col-sm-10 col-xs-12 workbench-main">
                <div className="workbench-work-wrap">
                    <div className="inner">
                        <div className="trans-guide-prompt">
                            Select the text or the red box to translate
                        </div>
                        <div className="canvas-container">
                            <canvas ref={this.canvas} className="lower-canvas" width="565" height="800" ></canvas>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default WorkbenchMain;