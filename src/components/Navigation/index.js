import React from 'react';
import './navigation.css';
const requireContext = require.context("../../images/", true, /^\.\/.*\.jpg$/);
const images = requireContext.keys().map(requireContext);

function Navigation ({contentText}){
    return (
        <div className="navigation">
            <div className="navigation-header text-center">
                <h5>{contentText.selectImage}</h5>
            </div>
            <div className="navigation-body">
                <ul className="list-group">
                    {images.map((src, index)=>{
                        return (
                            <li className="list-group-item text-right" key={index}>
                                <span className="item_position pr-1">{index+1}</span>
                                <a href="javascript: void(0);">
                                    <img src={src} alt={"image_"+ index} />
                                </a>
                            </li>
                        )
                    })}
                    
                </ul>
            </div>
        </div>
    )
}

export default Navigation;