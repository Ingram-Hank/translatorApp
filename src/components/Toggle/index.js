import React from 'react';
import './toggle.css';

function Toggle ({contentText, defaultText, id, switchOn, onToggle}){
    const size = id ==='autoTranslate' ? "large": "small";
    const toggleClass = `toggle btn btn-sm ios ${switchOn ? `btn-success`: `btn-secondary off`} toggle-${size}`;
    return (
        <span className="switch" onClick={()=> onToggle(id, switchOn)}>
            <div className={toggleClass}>
                <div className="toggle-group">
                    <label className="btn btn-success btn-sm toggle-on">
                        {defaultText}
                    </label>
                    <label className="btn btn-secondary btn-sm toggle-off">
                        {contentText.close}
                    </label>
                    <span className="toggle-handle btn btn-light btn-sm"></span>
                </div>
            </div>
        </span>
    )
}

export default Toggle;