import React from 'react';
import './content.css';

function Content ({children}){
    return (
        <div className="content">
            {children}
        </div>
    )
}

export default Content;