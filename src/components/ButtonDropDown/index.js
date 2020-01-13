import React from 'react';

function ButtonDropDown ({defaultText, id, selectedItem, data=[], handlerDropDownItem}){
    return (
        <div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                {selectedItem || defaultText} <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu">
                {data.map((item, index)=>{
                    return <li key={index} onClick={()=> {handlerDropDownItem(id, item)}}>{item}</li>
                })}
            </ul>
        </div>
    )
}

export default ButtonDropDown;