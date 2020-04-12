import React from 'react';
import imgURL from './loading.png';

const LoadingSpinner =()=> {
    return (
        <div className="popup" data-html2canvas-ignore>
            <div className="popup-loading text-center">
                <img src={imgURL} alt="loading"/>
                <p>小主我正在为您加载数据请稍等</p>
            </div>
        </div>
    )
}

export default LoadingSpinner;