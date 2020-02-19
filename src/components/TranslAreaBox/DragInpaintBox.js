import {getStyle} from '../../utilities';

class DragInpaintBox {
    constructor(element) {
        this.element = element;
        this.left = getStyle(element, 'left');
        this.top = getStyle(element, 'top');
        this.currentX = 0;
        this.currentY = 0;
        this.flag = false;
    }

    mousedown(e) {
        this.flag = true;
        this.currentX = e.clientX;
        this.currentY = e.clientY;
    }
    mousemove(e) {
        if(this.flag) {
            const x = e.clientX;
            const y = e.clientY;
            const disX = x - this.currentX;  // mouse move x distance
            const disY = y - this.currentY;  // mouse move y distance
            this.element.style.left = this.left + disX + "px";
            this.element.style.top = this.top + disY + "px";
        }
    }
    mouseup (e) {
        this.flag = false;
        this.left = this.element.style.left;
        this.top = this.element.style.top;
    }
}
export default DragInpaintBox;