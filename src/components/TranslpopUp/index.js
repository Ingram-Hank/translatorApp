import React from 'react';
import fontFamilyCollection from './fontFamily.json';
import getfontSizeArray from './fontSizeCollection';
import imgURL from './images/color picker.png';

function TranslpopUp({ contentText, cropedImage, hasCorrect = false }) {
    const fontSizeCollection = getfontSizeArray();
    return (
        <div className="translContainer">
            <div className='translate-box'>
                <div className='box-title text-center' id='box-title'>
                    <i className='dots-horizontal'>▪▪▪</i>
                </div>
                <div className='source-area'>
                    {cropedImage && <img src={cropedImage.src} alt='' />}
                </div>
                <div className='ocr-container'>
                    <div className='ocr-operation text-white'>
                        <div className='ocr-title'>OCR</div>
                        <div className='ml-auto ocr-btn-box'>
                            <span className="ocr-btn">{hasCorrect ? "Submit" : "Correct"}</span>
                        </div>
                    </div>
                    <div className='ocr-result'>
                        <div className='ocr-result-inner'>
                            {hasCorrect ? <textarea rows="4" className="ocr-input"></textarea> :
                                <span className="ocr-word">Loading...</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='translate-btn-area'>
                    <span className="translate-btn" title="Translate">
                        <i className="mdi mdi-loading mdi-spin"></i>
                        <span className="mx-2"> Translate </span>
                    </span>
                </div>
                <div className='translate-area'>
                    <div className='input-box'>
                        <textarea name="result" rows="4" placeholder="Enter the translation"></textarea>
                    </div>
                    <div className='translate-attribute-box'>
                        <div className='btn-group btn-group-sm font-family'>
                            <button className='btn btn-default dropdown-toggle' data-toggle='dropdown' title='font'>
                                <span className='language-content' title='Comic Sans MS'>Comic Sans MS</span>
                                <span className='caret-content'>
                                    <span className='caret'></span>
                                </span>
                            </button>
                            <ul className='dropdown-menu'>
                                {fontFamilyCollection.map((item, index) => {
                                    const itemFontFamily = {
                                        fontFamily: item
                                    }
                                    return (
                                        <li className='font-family-item' key={index} style={itemFontFamily}>{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* font-family settings */}
                        <div className='btn-group btn-group-sm font-size' data-toggle='tooltip' data-placement='top' title='Size'>
                            <button className='btn btn-default dropdown-toggle' data-toggle='dropdown' title='size'>
                                <span className='size-content' title='20'>20</span>
                                <span className='caret-content'>
                                    <span className='caret'></span>
                                </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {fontSizeCollection.map((size, index) => {
                                    return (
                                        <li className='font-size-item' title={size} key={index}>{size}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* font-size settings */}
                        <div className="nd-btn-group" >
                            {/* font-color settings */}
                            <div className="btn-group btn-group-sm font-fill" data-toggle="tooltip" data-placement="top" title="Font color">
                                <label data-color="#fff" className="btn btn-default active" data-toggle="tooltip" data-placement="top" title="White">
                                    <span className="circle white" role="img" aria-label='color'></span>
                                </label>
                                <label data-color="#000" className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Black">
                                    <span className="circle black" role="img" aria-label='color'></span>
                                </label>
                                <div className="btn btn-default font-fill-action ">
                                    <div className="minicolors minicolors-theme-default">
                                        <input type="text" className="minicolors-input" size="7" />
                                        <span className="minicolors-swatch minicolors-sprite">
                                            <span className="minicolors-swatch-color"></span>
                                        </span>
                                        <div className="minicolors-panel minicolors-slider-hue minicolors-with-swatches">
                                            <div className="minicolors-slider minicolors-sprite">
                                                <div className="minicolors-picker"></div>
                                            </div>
                                            <div className="minicolors-opacity-slider minicolors-sprite">
                                                <div className="minicolors-picker"></div>
                                            </div>
                                            <div className="minicolors-grid minicolors-sprite" >
                                                <div className="minicolors-grid-inner"></div>
                                                <div className="minicolors-picker">
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            {/* font color settings end */}
                            <div className="btn-group btn-group-sm">
                                <label className="btn btn-default js-pick-color-btn" title="Color picker">
                                    <span className='color-picker'>
                                        <img src={imgURL} alt=''/>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="nd-btn-group" style={{marginTop: "10px"}}>
                            {/* style settings */}
                            <div className="btn-group btn-group-sm font-weight-style">
                                <label className="btn btn-default active" data-toggle="tooltip" data-placement="top" title="Bold">
                                    <input className="font-bold-item" type="checkbox" name="font-bold" />
                                    <i className="glyphicon glyphicon-bold"></i>
                                </label>
                                <label className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Italics">
                                    <input className="font-italic-item" type="checkbox" name="font-italic" />
                                    <i className="glyphicon glyphicon-italic"></i>
                                </label>
                            </div>
                            {/* style settings end*/}
                            {/* text-align settings */}
                            <div className="btn-group btn-group-sm text-align">
                                <label className="btn btn-default " data-toggle="tooltip" data-placement="top" title="Left-align">
                                    <input className="text-align-item" type="radio" name="text-align" autoComplete="off" value="left" onChange={()=>{}} />
                                    <i className="glyphicon glyphicon-align-left"></i>
                                </label>
                                <label className="btn btn-default active" data-toggle="tooltip" data-placement="top" title="Center-align">
                                    <input className="text-align-item" type="radio" name="text-align" autoComplete="off" value="center" onChange={()=>{}} />
                                    <i className="glyphicon glyphicon-align-center"></i>
                                </label>
                                <label className="btn btn-default " data-toggle="tooltip" data-placement="top" title="Right-align">
                                    <input className="text-align-item" type="radio" name="text-align" autoComplete="off" value="right" onChange={()=>{}} />
                                    <i className="glyphicon glyphicon-align-right"></i>
                                </label>
                            </div>
                            {/* text-align settings end*/}
                        </div>
                        {/* outline settings start */}
                        <div className='func-title'>Outline</div>
                        <div className='nd-btn-group'>
                            <div className="btn-group btn-group-sm stroke-style">
                                <label data-color="#ffffff" className="btn btn-default mb-0 js-stroke-color active" data-toggle="tooltip" data-placement="top" title="White outline">
                                    <span className="circle white" role="img" aria-label='color'></span>
                                </label>
                                <label data-color="#000000" className="btn btn-default mb-0 js-stroke-color " data-toggle="tooltip" data-placement="top" title="Black outline">
                                    <span className="circle black" role="img" aria-label='color'></span>
                                </label>
                            </div>

                            <div className="btn-group btn-group-sm stroke-width">
                                <label className="btn btn-default">
                                    <span className="">0</span>px
                                </label>
                                <input className="stroke-width-input" type="range" step="1" min="0" max="10" value="0" onChange={()=>{}} />
                            </div>
                        </div>
                        {/* outline settings end */}
                        <div className='func-title'>Shadow</div>
                        <div className='nd-btn-group'>
                            <div className="btn-group btn-group-sm stroke-style">
                                <label data-color="#ffffff" className="btn btn-default mb-0 js-stroke-color active" data-toggle="tooltip" data-placement="top" title="White outline">
                                    <span className="circle white" role="img" aria-label='color'></span>
                                </label>
                                <label data-color="#000000" className="btn btn-default mb-0 js-stroke-color " data-toggle="tooltip" data-placement="top" title="Black outline">
                                    <span className="circle black" role="img" aria-label='color'></span>
                                </label>
                            </div>

                            <div className="btn-group btn-group-sm stroke-width">
                                <label className="btn btn-default">
                                    <span className="">0</span>px
                                </label>
                                <input className="stroke-width-input" type="range" step="1" min="0" max="10" value="0" onChange={()=>{}} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className='one-step-translate-step'>
                    <span className="btn translate-finish">
                        Use
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TranslpopUp;