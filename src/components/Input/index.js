import React from 'react';

function Input ({type= "text", className, id, defaultValue}){
    switch (type){
        case 'checkbox':
            return <input type={type} className={className} />
        default:
            return <input type="text" id={id} className={className} placeholder={defaultValue}/>
    }
}

export default Input;