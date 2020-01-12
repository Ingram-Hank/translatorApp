import React from React;

function Button ({children, text, attributes, data}){

    return (
        <button>{text || children}</button>
    )
}