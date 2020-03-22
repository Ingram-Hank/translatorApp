import React from 'react';
import classNames from 'classnames';
import fontFamilyCollection from './fontFamily.json';
import getfontSizeArray from './fontSizeCollection';
import imgURL from './images/color picker.png';
import dragPopUp from './dragPopUP.js';
import ColorPicker from './ColorPicker.js';
import ColorAbsorb from './ColorAbsorb.js';

function TranslpopUp({ contentText, cropedImage, createdTranslBox, startNumber, correctTransl, 
    hasCorrect = false, originORCText, translatedText, hanlerChangeORCText, handlerChangeTranslatedText,
    handerTranslText, handlerCompleteTranslate, fontSettings, font, tabToClearText, wholeFontSize }) {
    const {
        font_family = "CCWildWords",
        font_size = wholeFontSize || 16,
        font_color = "rgb(0, 0, 0, .65)",
        hasFontItalic,
        hasFontWeight,
        text_align = "center",
        outline_color,
        shadow_color,
        outline_size = 0,
        shadow_size = 0,
        lineHeight = 1.16,
        popUp
    } = font;
    
    const {
        handlerSelectFontFamily,
        handlerSelectFontSize,
        handlerSelectFontColor,
        handlerSelectFontWeight,
        handlerSelectFontStyle,
        handlerSelectFontTextAlign,
        handlerSelectFontOutlineColor,
        handlerSelectFontOutlineSize,
        handlerSelectFontShadowSize,
        handlerSelectFontShadowColor,
        handerColorAbsorb,
        handerColorAbsorbComplete,
        handlerSelectLineHeight
    } = fontSettings;
    const fontSizeCollection = getfontSizeArray();
    const dragProps = {
        className: 'box-title text-center',
        id: 'box-title',
        onMouseLeave: (e)=> {
            e.target.removeEventListener("mousedown", ()=> console.log("remove mousedown"));
            e.target.removeEventListener("mousemove", ()=> console.log("remove mousemove"));
            e.target.removeEventListener("mouseup", ()=> console.log("remove mouseup"));
        },
        onMouseEnter: (e)=> {
            const translContainer = document.getElementById("translContainer");
            const startDrag = new dragPopUp(translContainer);
            e.target.addEventListener("mousedown", (el)=> startDrag.mousedown(el));
            document.addEventListener("mousemove", (el)=> startDrag.mousemove(el));
            document.addEventListener("mouseup", (el)=> startDrag.mouseup(el));
        },
    }
    const ColorAbsorbProps = {
        contentText,
        cropedImage,
        createdTranslBox: createdTranslBox[startNumber],
        handlerSelectFontColor,
        handerColorAbsorbComplete,
        font_color
    };

    const fontFillColorWhiteClassName = classNames("btn btn-default", {'active': font_color === 'white'});
    const fontFillColorBlackClassName = classNames("btn btn-default", {'active': font_color === 'black'});
    const fontFillColorOthersClassName = classNames("btn btn-default font-fill-action", {'active': font_color !== 'black' && font_color !== 'white'});
    const fontStyleBoldClassName = classNames("btn btn-default", {"active": hasFontWeight});
    const fontStyleItalicsClassName = classNames("btn btn-default", {"active": hasFontItalic});
    const textAlignClassName_left = classNames("btn btn-default", {"active": text_align === 'left'});
    const textAlignClassName_center = classNames("btn btn-default", {"active": text_align === 'center'});
    const textAlignClassName_right = classNames("btn btn-default", {"active": text_align === 'right'});
    const outlineColor_white = classNames("btn btn-default", {"active": outline_color === 'white'});
    const outlineColor_black = classNames("btn btn-default", {"active": outline_color === 'black'});
    const shadowColor_white = classNames("btn btn-default", {"active": shadow_color === 'white'});
    const shadowColor_black = classNames("btn btn-default", {"active": shadow_color === 'black'});
    return (
        <div className="translContainer" id="translContainer">
            <div className='translate-box'>
                <div {...dragProps}>
                    <i className='dots-horizontal'>▪▪▪</i>
                </div>
                <div className="one-step-change-tool-tab">
                    <span className='inpaint-tool-btn' onClick={()=> tabToClearText()}>
                        {contentText.clearText}
                    </span>
                    <span className='inpaint-tool-btn active'>
                        {contentText.translate}
                    </span>
                </div>
                <div className='source-area'>
                    {cropedImage && <img src={cropedImage.src} alt='' />}
                </div>
                <div className='ocr-container'>
                    <div className='ocr-operation text-white'>
                        <div className='ocr-title'>OCR</div>
                        <div className='ml-auto ocr-btn-box'>
                            <span className="ocr-btn" onClick={()=> correctTransl(hasCorrect)}>{hasCorrect ? contentText.submit : contentText.correct}</span>
                        </div>
                    </div>
                    <div className='ocr-result'>
                        <div className='ocr-result-inner'>
                            {hasCorrect ? <textarea rows="4" className="ocr-input" onChange={(e)=> hanlerChangeORCText(e)} value={originORCText}></textarea> :
                                <span className="ocr-word">{originORCText || contentText.loading}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='translate-btn-area'>
                    <span className="translate-btn" title={contentText.translate} onClick={()=> handerTranslText(originORCText)}>
                        <i className="mdi mdi-loading mdi-spin"></i>
                        <span className="mx-2"> {contentText.translate} </span>
                    </span>
                </div>
                <div className='translate-area'>
                    <div className='input-box'>
                        <textarea name="result" rows="4" placeholder={contentText.enterTheTranslation} value={translatedText} onChange={(e)=> handlerChangeTranslatedText(e)}></textarea>
                    </div>
                    <div className='translate-attribute-box'>
                        <div className='btn-group btn-group-sm font-family'>
                            <button className='btn btn-default dropdown-toggle' data-toggle='dropdown' title={contentText.font}>
                                <span className='language-content' style={{fontFamily: font_family}} title={font_family}>{font_family}</span>
                                <span className='caret-content'>
                                    <span className='caret'></span>
                                </span>
                            </button>
                            <ul className='dropdown-menu'>
                                {fontFamilyCollection.map((item, index) => {
                                    const listItemProps = {
                                        className: "font-family-item",
                                        key: index,
                                        style: {fontFamily: item},
                                        onClick: ()=> handlerSelectFontFamily(item)
                                    };
                                    return (
                                        <li {...listItemProps}>{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* font-family settings */}
                        <div className='btn-group btn-group-sm font-size' data-toggle='tooltip' data-placement='top' title='Size'>
                            <button className='btn btn-default dropdown-toggle' data-toggle='dropdown' title='size'>
                                <span className='size-content' title={font_size}>{font_size}</span>
                                <span className='caret-content'>
                                    <span className='caret'></span>
                                </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {fontSizeCollection.map((size, index) => {
                                    const listItemProps = {
                                        className: "font-size-item",
                                        title: size,
                                        key: index,
                                        onClick: () => handlerSelectFontSize(size)
                                    };
                                    return (
                                        <li {...listItemProps}>{size}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* font-size settings */}
                        <div className="nd-btn-group" >
                            {/* font-color settings */}
                            <div className="btn-group btn-group-sm font-fill" title={contentText.fontColor}>
                                <label className={fontFillColorWhiteClassName} title={contentText.white} onClick={()=> handlerSelectFontColor('white')}>
                                    <span className="circle white" role="img" aria-label='color'></span>
                                </label>
                                <label className={fontFillColorBlackClassName} title={contentText.black} onClick={()=> handlerSelectFontColor('black')}>
                                    <span className="circle black" role="img" aria-label='color'></span>
                                </label>
                                <div className={fontFillColorOthersClassName}>
                                    <ColorPicker updateColor={handlerSelectFontColor} color={font_color} />
                                </div>
                            </div>
                            {/* font color settings end */}
                            <div className="btn-group btn-group-sm">
                                {popUp && <ColorAbsorb {...ColorAbsorbProps} />}
                                <label className="btn btn-default js-pick-color-btn" title={contentText.colorPicker} onClick={()=> handerColorAbsorb()}>
                                    <span className='color-picker'>
                                        <img src={imgURL} alt='' />
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="nd-btn-group" style={{ marginTop: "10px" }}>
                            {/* style settings */}
                            <div className="btn-group btn-group-sm font-weight-style">
                                <label className={fontStyleBoldClassName} title={contentText.bold} onClick={()=> handlerSelectFontWeight(hasFontWeight)}>
                                    <i className="glyphicon glyphicon-bold"></i>
                                </label>
                                <label className={fontStyleItalicsClassName}  title={contentText.italics} onClick={()=> handlerSelectFontStyle(hasFontItalic)}>
                                    <i className="glyphicon glyphicon-italic"></i>
                                </label>
                            </div>
                            {/* style settings end*/}
                            {/* text-align settings */}
                            <div className="btn-group btn-group-sm text-align">
                                <label className={textAlignClassName_left}  title={contentText.leftAlign} onClick={()=> handlerSelectFontTextAlign('left')}>
                                    <i className="glyphicon glyphicon-align-left"></i>
                                </label>
                                <label className={textAlignClassName_center} title={contentText.centerAlign} onClick={()=> handlerSelectFontTextAlign('center')}>
                                    <i className="glyphicon glyphicon-align-center"></i>
                                </label>
                                <label className={textAlignClassName_right}  title={contentText.rightAlign} onClick={()=> handlerSelectFontTextAlign('right')}>
                                    <i className="glyphicon glyphicon-align-right"></i>
                                </label>
                            </div>
                            {/* text-align settings end*/}
                        </div>
                        {/* outline settings start */}
                        <div className='func-title'>{contentText.outline}</div>
                        <div className='nd-btn-group'>
                            <div className="btn-group btn-group-sm stroke-style">
                                <label className={outlineColor_white} title={contentText.whiteOutline} onClick={()=> handlerSelectFontOutlineColor('white')}>
                                    <span className="circle white" role="img" aria-label='color'></span>
                                </label>
                                <label className={outlineColor_black} title={contentText.blackOutline} onClick={()=> handlerSelectFontOutlineColor('black')}>
                                    <span className="circle black" role="img" aria-label='color'></span>
                                </label>
                            </div>
                            <div className="btn-group btn-group-sm stroke-width">
                                <label className="btn btn-default">
                                    <input className="w-10" type="text" value={outline_size} onChange={(e)=> handlerSelectFontOutlineSize(e)}/> px
                                </label>
                                <input className="stroke-width-input" type="range" step="1" min="0" max="10" value={outline_size} onChange={(e) => handlerSelectFontOutlineSize(e) } />
                            </div>
                        </div>
                        {/* outline settings end */}
                        {/* shadow settings start */}
                        <div className='func-title'>{contentText.shadow}</div>
                        <div className='nd-btn-group'>
                            <div className="btn-group btn-group-sm stroke-style">
                                <label className={shadowColor_white} title={contentText.whiteShadow} onClick={()=> handlerSelectFontShadowColor('white')}>
                                    <span className="circle white" role="img" aria-label='color'></span>
                                </label>
                                <label className={shadowColor_black} title={contentText.blackShadow} onClick={()=> handlerSelectFontShadowColor('black')}>
                                    <span className="circle black" role="img" aria-label='color'></span>
                                </label>
                            </div>
                            <div className="btn-group btn-group-sm stroke-width">
                                <label className="btn btn-default">
                                    <input className="w-10" type="text" value={shadow_size} onChange={(e)=> handlerSelectFontShadowSize(e)} /> px
                                </label>
                                <input className="stroke-width-input" type="range" step="1" min="0" max="10" value={shadow_size} onChange={(e) => handlerSelectFontShadowSize(e)} />
                            </div>
                        </div>
                        {/* shadow settings end */}

                        <div className="nd-btn-group">
                            <div className="btn-group btn-group-sm line-height">
                                <span className="text-white">{contentText.lineHeight}</span>
                            </div>
                            <div className="btn-group btn-group-sm stroke-width" style={{marginTop: "10px"}}>
                                <label className="btn btn-default mb-0 mx-1">
                                    <span className="js-line-height-num">
                                        <input className="w-28" type="text" value={lineHeight} onChange={(e)=> handlerSelectLineHeight(e)} />
                                    </span>
                                </label>
                                <input className="stroke-width-input" type="range" step="0.1" min="0" max="5" value={lineHeight} onChange={(e) => handlerSelectLineHeight(e)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='one-step-translate-step'>
                    <span className="btn translate-finish" onClick={()=> handlerCompleteTranslate()}>{contentText.use}</span>
                </div>
            </div>
        </div>
    )
}

export default TranslpopUp;