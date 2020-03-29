import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {Button, Content, Contrast as ContrastBody} from '../components';
import {
    getTranslImages,
    clearSelectedImage
} from '../modules/images';
import {
    handlerSelectImage,
    backToTransl
} from '../modules/ui';
import strings from '../contents';

const ContrastContainer = ({contentText, selectedImage, selectedTranslImage, status, currentTip, handlerSelectFeedBackMsg, handlerbacktoTranslPage, history}) => {
    const contrastBodyProps = {
        contentText,
        selectedImage,
        selectedTranslImage,
        status,
        currentTip,
        handlerSelectFeedBackMsg,
        history
    };
    const backProps = {
        attributes: {
            onClick: handlerbacktoTranslPage
        }
    }
    return (
            <div className="main">
                <div className="header">
                    <div className="col-md-2 col-xs-2 col-lg-2">
                        <Button data={backProps}>&lt; {contentText.back}</Button>
                    </div>
                </div>
                <Content>
                    <ContrastBody {...contrastBodyProps}/>
                </Content>
            </div>
    )
}

const mapStateToProps =(state)=> {
    const language = state.languageMoudels.language || "Chinese";
    const contentText = strings.screen[language];
    const {
        selectedImage,
        selectedTranslImage,
        status,
        currentTip
    } = state.images;
    return {
        contentText,
        selectedImage,
        selectedTranslImage,
        status,
        currentTip
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        handlerbacktoTranslPage: ()=> {
            window.history.back();
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
        },
        handlerSelectFeedBackMsg: (comicTranslationOrderId, orderNo)=> {
            dispatch(getTranslImages({comicTranslationOrderId, orderNo}));
            dispatch(handlerSelectImage(null));
            dispatch(clearSelectedImage());
            dispatch(backToTransl());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContrastContainer);