import React from 'react';
import './modal.css';

function Modal ({children, open = true}) {
    if(open) {
        return (
            <div className="popup" data-html2canvas-ignore>
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