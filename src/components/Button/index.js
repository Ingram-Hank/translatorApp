import React from 'react';
import localData from './button.json';
import './button.css';

function Button ({children, text, attributes, data={}}){
    const combiData = Object.assign({}, localData.attributes, data.attributes) || attributes;
    return (
        <button {...combiData}>{text || children}</button>
    )
}

export default Button;