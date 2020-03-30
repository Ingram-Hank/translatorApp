import React from 'react';
import './dropDown.css';

function ButtonDropDown ({defaultText, id, selectedItem, data = [], handlerDropDownItem}){
    return (
        <div className="btn-dropDown">
            <button type="button" className="button dropdown-toggle" data-toggle="dropdown">
                {selectedItem || defaultText} <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" role="menu">
                {data.map((item, index)=>{
                    return <li key={index} onClick={()=> {handlerDropDownItem(id, item.key)}}>{item.text}</li>
                })}
            </ul>
        </div>
    )
}

export default ButtonDropDown;