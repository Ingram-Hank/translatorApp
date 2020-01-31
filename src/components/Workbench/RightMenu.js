import React from 'react';

function RightMenu ({cropedImage}){
    return (
        <div className="trans-result-right-menu bg-color-white  col-sm-2 col-xs-12">
            {cropedImage && <img src={cropedImage.src} alt="cropedImg"/>}
        </div>
    )
}

export default RightMenu;