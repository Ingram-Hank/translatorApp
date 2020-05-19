import React from 'react';
import moment from 'moment';

const FeedBackMessage = ({contentText, feedMsg=[], handlerSelectFeedBackMsg})=> {
    return (
        <div className="dropdown-menu feedMsg" role="menu">
            <div className="feedMsg-header">
                <h5>{contentText.feedMsgTitle}</h5>
            </div>
            {feedMsg && feedMsg.length > 0 ? feedMsg.map((item, index)=> {
                const {comicTranslationOrderId, tag, content, orderNo, createTime} = item;
                return (
                    <div className="feedMsg-item" key={index}> 
                        <div className="feedMsg-item-content shortContent" onClick={()=> {handlerSelectFeedBackMsg(comicTranslationOrderId, orderNo)}}>
                            【{tag}】 {content}
                        </div>
                        <div className="time">
                            -- {moment(createTime).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                    </div>
                )
                }) : <div className="feedMsg-item">{contentText.noContent}</div>}
        </div>
    )
}

export default FeedBackMessage;