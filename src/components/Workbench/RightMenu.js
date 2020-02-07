import React from 'react';

function RightMenu ({contentText, cropedImage}){
    return (
        <div className="trans-result-right-menu bg-color-white  col-sm-2 col-xs-12">
            {cropedImage && <img src={cropedImage.src} alt={contentText.cropedImg}/>}
        </div>
    )
}

export default RightMenu;