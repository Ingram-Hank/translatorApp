import React from 'react';
import moment from 'moment';
import './contrast.css';

class Contrast extends React.Component {
    componentDidMount() {
        const { selectedImage, selectedTranslImage } = this.props;
        console.log("selectedImage-------------", selectedImage);
        console.log("selectedTranslImage-------------", selectedTranslImage);
        const img_origin = new Image();
        img_origin.src = selectedImage;
        const img_transl = new Image();
        img_transl.src = selectedTranslImage;
        img_origin.onload = () => {
            const elementWidth = window.innerWidth / 3;
            const elementHeight = img_origin.naturalHeight * ( elementWidth / img_origin.naturalWidth);
            img_origin.width = elementWidth;
            img_origin.height = elementHeight;
            const originPic = document.getElementById("orginComicSrc");
            const ctx_origin = originPic.getContext('2d');
            originPic.width = elementWidth;
            originPic.height = elementHeight;
            ctx_origin.drawImage(img_origin, 0, 0, elementWidth, elementHeight);
        }
        img_transl.onload = () => {
            const elementWidth = window.innerWidth / 3;
            const elementHeight = img_transl.naturalHeight * ( elementWidth / img_transl.naturalWidth);
            img_transl.width = elementWidth;
            img_transl.height = elementHeight;
            const translPic = document.getElementById("translComicSrc");
            const ctx_transl = translPic.getContext('2d');
            translPic.width = elementWidth;
            translPic.height = elementHeight;
            ctx_transl.drawImage(img_transl, 0, 0, elementWidth, elementHeight);
        }
    }
    render() {
        const { contentText, currentTip = [], status, handlerSelectFeedBackMsg, history } = this.props;
        return (
            <React.Fragment>
                <div className="originPicContainer">
                    <h5 className="originPicContainer-title">{contentText.originPic}</h5>
                    <canvas id='orginComicSrc'></canvas>
                </div>
                <div className="feedbackMessageContainer">
                    <h5>{contentText.feedMsgTitle}</h5>
                    <div className="feedbackMessageContainer-body">
                        {status === 2 && currentTip.length > 0 ? currentTip.map((item, index)=> {
                                const {comicTranslationOrderId, tag, content, orderNo, createTime} = item;
                                return (
                                    <div className="feedMsg-item" key={index}>
                                        <div className="feedMsg-item-content" onClick={()=> {
                                            handlerSelectFeedBackMsg(comicTranslationOrderId, orderNo);
                                            history.push({pathname: '/'});
                                        }}>
                                            【{tag}】 {content}
                                        </div>
                                        <div className="time text-right">
                                           -- {moment(createTime).format('YYYY-MM-DD HH:mm:ss')}
                                        </div>
                                    </div>
                                )
                        }): <div className="noContent text-center">{contentText.noContent}</div>}
                    </div>
                </div>
                <div className="translPicContainer">
                    <h5 className="translPicContainer-title">{contentText.translPic}</h5>
                    <canvas id='translComicSrc'></canvas>
                </div>
            </React.Fragment>
        )

    }
}

export default Contrast;