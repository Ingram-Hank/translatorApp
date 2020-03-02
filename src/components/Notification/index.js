import React from 'react';
import classNames from 'classnames';
import './index.css';

const Notification = ({children, text, type})=> {
    const notificationClassName = classNames("alert alert-" + type)
    return (
        <div className={notificationClassName}>{children || text}</div>
    )
};

export default Notification