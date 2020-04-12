import React from 'react';
import { mapToObject } from "../../utilities";

const buildDataGroup = (params) => {
    const {
        resultLayers,
        resultBoxStyleParams,
        fonts,
        wholeFontSize,
        wholeFontColor,
        wholeFontTextAlign,
        wholeFontLineHeight,
        globalHasFontItalic,
        globalHasFontWeight,
        globalFontDirection,
        globalFontTextCase,
        defaultFontFamily,
        wholeFonFamily
    } = params;
    let data = [];
    const defaultFontSetting = {
        font_family: wholeFonFamily || defaultFontFamily || "CCWildWords",
        font_size: wholeFontSize || 40,
        font_color: wholeFontColor || "black",
        lineHeight: wholeFontLineHeight || 1.5,
        hasFontItalic: globalHasFontItalic,
        hasFontWeight: globalHasFontWeight,
        text_align: wholeFontTextAlign || "center",
        text_case: globalFontTextCase || "uppercase",
        font_direction: globalFontDirection || "horizontal"
    };
    const layersToObject = mapToObject(resultLayers, 'index');
    if (Object.keys(resultBoxStyleParams).length) {
        Object.keys(resultBoxStyleParams).forEach((key) => {
            const { left, top, width, height, transform } = resultBoxStyleParams[key];
            const currentLayer = layersToObject[key] || {};
            const currentFont = fonts[key] || {};
            const font = currentFont || Object.assign({}, defaultFontSetting, currentFont);
            if (data.length) {
                const obj = mapToObject(data, 'key');
                const addLayer = {
                    [key]: {
                        key,
                        left,
                        top,
                        width,
                        height,
                        transform,
                        translatedText: currentLayer.translText || "",
                        font
                    }
                };
                const newObj = Object.assign({}, obj, addLayer);
                data = Object.values(newObj);
            } else {
                data.push({
                    key,
                    left,
                    top,
                    width,
                    height,
                    transform,
                    translatedText: currentLayer.translText || "",
                    font
                });
            }
        })
    }
    return data;
}

function ResultBox(props) {
    const data = buildDataGroup(props);
    return (
        <React.Fragment>
            {data.length ? data.map((item, index) => {
                const {
                    left,
                    top,
                    width,
                    height,
                    transform,
                    translatedText,
                    font = {}
                } = item;
                const {
                    font_family,
                    font_size,
                    font_color,
                    lineHeight,
                    hasFontItalic,
                    hasFontWeight,
                    text_align,
                    text_case,
                    font_direction,
                    outline_color,
                    shadow_color,
                    outline_size,
                    shadow_size
                } = font;
                const resultBoxProps = {
                    id: `${index}_resultContainer`,
                    className: "resultContainer",
                    style: {
                        display: props.clearPreTranslResult ? "none" : "block",
                        left: `${left}px`,
                        top: `${top}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: transform,
                        textTransform: text_case,
                        fontFamily: font_family,
                        fontSize: `${font_size}px`,
                        color: font_color,
                        fontStyle: hasFontItalic ? "italic" : "normal",
                        fontWeight: hasFontWeight ? "bold" : "normal",
                        lineHeight: lineHeight,
                        writingMode: font_direction === "horizontal" ? "horizontal-tb" : "vertical-lr",
                        textAlign: text_align,
                        WebkitTextStroke: `${outline_size}px ${outline_color}`,
                        textShadow: `${shadow_size}px ${shadow_size}px ${shadow_size}px ${shadow_color}`
                    }
                };
                return (
                    <div {...resultBoxProps} key={index}>{translatedText}</div>
                )
            }) : null}
        </React.Fragment>
    )
}

export default ResultBox;