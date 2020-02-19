import {getStyle} from '../../utilities';

class dragPopUP {
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
            if(getStyle(this.element, 'left') > window.screen.width - 200) {
                this.element.style.left = window.screen.width - 250 + "px";
            }
            if(getStyle(this.element, 'left') < 200) {
                this.element.style.left = "200px";
            }
        }
    }
    mouseup (e) {
        this.flag = false;
        this.left = this.element.style.left;
        this.top = this.element.style.top;
    }
}


export default dragPopUP;