import React from 'react';
import classNames from 'classnames';
import { Link } from "react-router-dom";
import {Button, ButtonDropDown, Toggle, Notification, Modal} from '../';
import PreviewTranslResult from './PreviewTranslResult';
import FeedBackMessage from './FeedBackMessage';
import ImgMerge from './ImgMerge ';
import './header.css';


const buildImgs = (selectedImage, resultData)=> {
    const img = new Image();
    img.src = selectedImage;
    let imgWidth = 565;
    let imgHeight = 800;
    const promise = new Promise((resolve)=> {
        img.onload = resolve;
    });
    promise.then(() => {
        imgWidth = img.naturalWidth;
        imgHeight = img.naturalHeight;
    })
    let imgs = [
        {
            url: selectedImage,
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight
        }
    ];
    if(Object.keys(resultData).length) {
        Object.values(resultData).forEach(item => {
            const {mask, translText, font} = item;
            const {left, top, width, height, cropedImg} = mask;
            imgs.push({
                url: cropedImg,
                x: left,
                y: top,
                width,
                height,
                font,
                text: translText
            })
        })
    }
    return imgs;
};

function Header ({contentText, marquee, modalOpen, modalId, switchAutoClear, switchAutoOCR, 
    switchAutoTranslate, language, handlerDropDownItem, handlerPreview, handlerClosePreview, onToggle, 
    status, selectedImage, selectedTranslImage, resultData, startPreview, handlerSaveData, feedMsg = [], 
    handlerSelectFeedBackMsg, handlerRestore, notificationMsg, closeModal, handlerAbandonSave }){
    const buildImg = status ? selectedTranslImage : selectedImage;
    const imgs = buildImgs(buildImg, resultData);
    const imgMerge = new ImgMerge(imgs);
    let resultImg = new Image();
    imgMerge.then(img => resultImg.src = img);
    const switchMouseProps = {
        defaultText: contentText.marquee,
        selectedItem: contentText.marqueeText[marquee],
        id: "marquee",
        data: contentText.marqueeCollection,
        handlerDropDownItem
    };
    const switchLanguageProps = {
        defaultText: contentText.language,
        selectedItem: contentText.languageText[language],
        id: "language",
        data: contentText.languageCollection,
        handlerDropDownItem,
        action: "switchLanguage"
    };
    
    const saveDataProps = {
        attributes: {
            onClick: ()=> handlerSaveData(resultImg),
            className: classNames('button', {"disabled": imgs.length < 2})
        }
    }
    const previewProps = {
        attributes: {
            onClick: ()=> handlerPreview(),
            className: classNames('button', {"disabled": !selectedImage})
        }
    };
    
    const previewTranslResultProps = {
        contentText,
        img: resultImg,
        handlerClosePreview,
        handlerRestore
    };
    const feedBackMessageProps = {
        contentText,
        feedMsg,
        handlerSelectFeedBackMsg
    };
    const contrastBtnProps = {
        attributes: {
            className: classNames('button', {"disabled": !status || !selectedImage})
        }
    };
    return (
        <div className="header">
            <div className="col-md-2 col-xs-2 col-lg-2">
                <Button>
                    &lt; {contentText.back}
                </Button>
            </div>
            <div className="col-md-8 col-xs-8 col-lg-8">
                <div className="btn-group">
                    <Button data={contrastBtnProps}>
                        <Link to="/contrast">
                            <span className="fa fa-photo"></span> {contentText.contrast}
                        </Link>
                    </Button>
                </div>
                <div className="btn-group">
                    <Button data={previewProps}>
                        <span className="glyphicon glyphicon-eye-open"></span> {contentText.preview} 
                    </Button>
                    <Button data={saveDataProps}>
                        <span className="glyphicon glyphicon-floppy-save"></span> {contentText.save} 
                    </Button>
                </div>
                <div className="btn-group">
                    <ButtonDropDown {...switchMouseProps}/>
                </div>
                <div className="btn-group">
                    {contentText.configurationCollection.map((item, index)=>{
                        let switchOn = true;
                        switch(item.id){
                            case 'autoClear':
                                switchOn = switchAutoClear
                                break;
                            case 'autoOCR':
                                switchOn = switchAutoOCR
                                break;
                            case 'autoTranslate':
                                switchOn = switchAutoTranslate
                                break;
                            default: 
                                break;
                        }
                        const toggleProps = {
                            key: index,
                            contentText,
                            defaultText: item.text,
                            id: item.id,
                            switchOn,
                            onToggle
                        };
                        return (
                            <Toggle {...toggleProps}/>
                        )
                    })}
                </div>
            </div>
            <div className="col-md-2 col-xs-2 col-lg-2">
                <div className="btn-group">
                    <ButtonDropDown {...switchLanguageProps}/>
                </div>
                <div className="btn-group">
                    <div className="comments dropdown-toggle" data-toggle="dropdown">
                        <span className="fa fa-bell-o"></span>
                        {feedMsg.length > 0 && <span className="badge">{feedMsg.length}</span>}
                    </div>
                    <FeedBackMessage {...feedBackMessageProps}/>
                </div>
            </div>
            {startPreview && <PreviewTranslResult {...previewTranslResultProps}/>}
            {notificationMsg && <Notification type="danger">{notificationMsg}</Notification>}
            {modalOpen && modalId === "promteSave" && <Modal>
                <div className="popup-header">
                    <h5>{contentText.promoteTitle}</h5>
                    <span className="dismissPopUp" onClick={closeModal}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </span>
                </div>
                <div className="popup-content text-center">
                    {contentText.promoteHelpText}
                </div>
                <div className="popup-footer text-right">
                    <button type="button" className="btn btn-default" onClick={handlerAbandonSave}> {contentText.abandon} </button>
                    <button type="button" className="btn btn-default active" onClick={() => {handlerSaveData(resultImg); closeModal()}}> {contentText.save} </button>
                </div>
            </Modal>}
        </div>
    )
}

export default Header;