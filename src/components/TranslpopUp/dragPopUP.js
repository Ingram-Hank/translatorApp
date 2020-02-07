import {getStyle} from '../../utilities';

class dragPopUP {
    constructor(element, parentElement) {
        this.dragElement = element;
        this.parentElement = parentElement;
        this.left = getStyle(parentElement, 'left');
        this.top = getStyle(parentElement, 'top');
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
            const disX = this.currentX - x;  // mouse move x distance
            const disY = y - this.currentY;  // mouse move y distance
            this.parentElement.style.left = this.left - disX + "px";
            this.parentElement.style.top = this.top + disY + "px";
            if(getStyle(this.parentElement, 'top') < 50) {
                this.parentElement.style.top = "50px";
            }
            if(getStyle(this.parentElement, 'left') > window.screen.width - 200) {
                this.parentElement.style.left = window.screen.width - 200 + "px";
            }
            if(getStyle(this.parentElement, 'left') < 200) {
                this.parentElement.style.left = "200px";
            }
        }
    }
    mouseup (e) {
        this.flag = false;
        this.left = this.parentElement.style.left;
        this.top = this.parentElement.style.top;
    }
}


export default dragPopUP;