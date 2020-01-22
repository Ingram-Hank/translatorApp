import React from 'react';
import classNames from 'classnames';
import './navigation.css';

function Navigation ({contentText, selectedImg, selectItem, images = [] }){
    return (
        <div className="navigation">
            <div className="navigation-header text-center">
                <h5>{contentText.selectImage}</h5>
            </div>
            <div className="navigation-body">
                <ul className="list-group">
                    {images.map((src, index)=>{
                        const className = classNames("list-group-item text-right", {
                            "active": selectedImg ? selectedImg === index: index===0
                        })
                        const listGroupItemProps = {
                            key: index,
                            className,
                            onClick: ()=> selectItem(index)
                        };
                        return (
                            <li {...listGroupItemProps}>
                                <span className="item_position pr-1">{index+1}</span>
                                <a href="##">
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