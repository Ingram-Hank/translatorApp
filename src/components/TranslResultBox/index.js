import React from 'react';
import { $, getCss } from '../../utilities';

class TranslResultBox extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
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

    componentDidMount() {
        $("cropBoxCancel").addEventListener("mousedown", (e) => {
            e.stopPropagation();
        })
        this.startDrag($("translMove"), $("translResultBox-container"), "drag");
        //bind pull
        this.startDrag($("dragLeftTop"), $("translResultBox-container"), "nw");
        this.startDrag($("dragLeftBot"), $("translResultBox-container"), "sw");
        this.startDrag($("dragRightTop"), $("translResultBox-container"), "ne");
        this.startDrag($("dragRightBot"), $("translResultBox-container"), "se");
        this.startDrag($("dragTopCenter"), $("translResultBox-container"), "n");
        this.startDrag($("dragBotCenter"), $("translResultBox-container"), "s");
        this.startDrag($("dragRightCenter"), $("translResultBox-container"), "e");
        this.startDrag($("dragLeftCenter"), $("translResultBox-container"), "w");
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
            event.stopPropagation();
            
            this.params.kind = kind;
            this.params.flag = true;
            if ($("translBoxCancel")) $("translBoxCancel").style.display = "none";
            if (!event) {
                event = window.event;
            }
            const e = event;
            if (document.setCapture) e.target.setCapture();
            if (window.captureEvents) window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            this.params.currentX = e.clientX;  //mouse down x coordinates
            this.params.currentY = e.clientY;  //mouse down y coordinates

            document.addEventListener("mousemove", (event) => {
                let e = event ? event : window.event;
                e.stopPropagation();
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
                    e.stopPropagation();
                    this.params.flag = false;
                    if ($("translBoxCancel")) $("translBoxCancel").style.display = "block";
                    if (document.releaseCapture) e.target.releaseCapture();
                    if (window.releaseEvents) window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                    if (getCss(target, "left") !== "auto") this.params.left = getCss(target, "left");
                    if (getCss(target, "top") !== "auto") this.params.top = getCss(target, "top");
                    this.params.width = getCss(target, "width");
                    this.params.height = getCss(target, "height");
                })
            })
        })
    }

    handlerTextEdit(e) {
        e.target.style.cursor = "text";
        e.target.style.outline = "none";
    }

    render() {
        const { data = {}, translatedText, font = {}, contentText, openModal } = this.props;
        const { left, top, width, height } = data;
        const translResultBoxContainerStyle = {
            left: `${left}px`,
            top: `${top}px`,
            width: `${width}px`,
            height: `${height}px`
        };
        const {
            font_family = "Microsoft YaHei",
            font_size = 12,
            font_color = "rgb(0, 0, 0, .65)",
            hasFontItalic,
            hasFontWeight,
            text_align = "center",
            outline_color,
            shadow_color,
            outline_size,
            shadow_size
        } = font;
        const moveBoxProps = {
            id: "translMove",
            className: "move",
            suppressContentEditableWarning: "true",
            onClick: (e) => this.handlerTextEdit(e),
            style: {
                fontFamily: font_family,
                fontSize: `${font_size}px`,
                color: font_color,
                fontStyle: hasFontItalic && "italic",
                fontWeight: hasFontWeight && "bold",
                textAlign: text_align,
                WebkitTextStroke: `${outline_size}px ${outline_color}`,
                textShadow: `${shadow_size}px ${shadow_size}px ${shadow_size}px ${shadow_color}`
            }
        };
        return (
            <div className="translResultBox-container" id="translResultBox-container" style={translResultBoxContainerStyle}>
                <div {...moveBoxProps}>{translatedText}</div>
                <div id="cropBoxCancel" className="cancel" title={contentText.delete} onClick={openModal}>
                    <span className="glyphicon glyphicon-trash"></span>
                </div>
                <div className="border-top"></div>
                <div className="border-left"></div>
                <div className="border-bottom"></div>
                <div className="border-right"></div>
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

export default TranslResultBox;