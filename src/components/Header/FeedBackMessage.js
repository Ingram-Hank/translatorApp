import React from 'react';

const FeedBackMessage = ({contentText, feedMsg=[], handlerSelectFeedBackMsg})=> {
    return (
        <div className="dropdown-menu feedMsg" role="menu">
            <div className="feedMsg-header">
                <h5>{contentText.feedMsgTitle}</h5>
            </div>
            {feedMsg.length && feedMsg.map((item, index)=> {
                const {comicTranslationOrderId, tag, content, orderNo} = item;
                return (
                    <div className="feedMsg-item" key={index} onClick={()=> handlerSelectFeedBackMsg(comicTranslationOrderId, orderNo)}> 
                        <div>{tag} {content}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default FeedBackMessage;