import React from 'react';

function Input ({type= "text", className}){
    switch (type){
        case 'checkbox':
            return <input type={type} className={className}/>
        default:
            return <input type="text" className={className}/>
    }
}

export default Input;