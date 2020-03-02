import React from 'react';
import moment from 'moment';
import './contrast.css';

class Contrast extends React.Component {
    componentDidMount() {
        const { selectedImage, selectedTranslImage } = this.props;
        const img_origin = new Image();
        img_origin.width = 450;
        img_origin.height = 568;
        img_origin.src = selectedImage;
        const img_transl = new Image();
        img_transl.width = 450;
        img_transl.height = 568;
        img_transl.src = selectedTranslImage;
        const originPic = document.getElementById("orginComicSrc");
        originPic.width = img_origin.width;
        originPic.height = img_origin.height;
        const translPic = document.getElementById("translComicSrc");
        translPic.width = img_transl.width;
        translPic.height = img_transl.height;
        const ctx_origin = originPic.getContext('2d');
        const ctx_transl = translPic.getContext('2d');
        img_origin.onload = () => {
            ctx_origin.drawImage(img_origin, 0, 0, img_origin.width, img_origin.height);
        }
        img_transl.onload = () => {
            ctx_transl.drawImage(img_transl, 0, 0, img_transl.width, img_transl.height);
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