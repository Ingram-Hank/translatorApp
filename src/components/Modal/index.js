import React from 'react';
import './modal.css';

function Modal ({children, open = true}) {
    if(open) {
        return (
            <div className="popup">
                <div className="popup-body">
                    {children}
                </div>
            </div>
        )
    }else {
        return null
    }
    
}

export default Modal;