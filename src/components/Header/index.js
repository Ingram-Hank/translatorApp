import React from 'react';
import classNames from 'classnames';
import { Link } from "react-router-dom";
import {Button, ButtonDropDown, Toggle, Notification, Modal} from '../';
import PreviewTranslResult from './PreviewTranslResult';
import FeedBackMessage from './FeedBackMessage';
import GlossaryModal from './GlossaryModal';
import RemarkModal from './RemarkModal';
import './header.css';

function Header ({contentText, marquee, modalOpen, modalId, switchAutoClear, switchAutoOCR, 
    switchAutoTranslate, language, handlerDropDownItem, handlerPreview, handlerClosePreview, 
    onToggle, status, imgWidth, imgHeight, selectedImage, startPreview, handlerSaveData, 
    feedMsg = [], handlerSelectFeedBackMsg, handlerRestore, notificationMsg, closeModal, 
    handlerAbandonSave, getCropedImgURL, resultImgURL, remark, handlerOpenGlossary, glossaryData,
    handlerOriginTextChange, handlerTranslTextChange, handlerAddGlossary, handlerQueryGlossary,
    handlerOpenRemarkModal, handlerdeleteGlossary }){
    
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
            onClick: ()=> handlerSaveData()
        }
    }
    const previewProps = {
        attributes: {
            onClick: ()=> {
                handlerPreview();
                getCropedImgURL();
            },
            className: classNames('button', {"disabled": !selectedImage})
        }
    };
    
    const previewTranslResultProps = {
        contentText,
        img: resultImgURL,
        imgWidth,
        imgHeight,
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
    const glossaryProps = {
        attributes: {
            onClick: ()=> {
                handlerOpenGlossary()
            }
        }
    };
    const remarkProps = {
        attributes: {
            onClick: ()=> {
                handlerOpenRemarkModal()
            }
        }
    };
    const glossaryModalProps = {
        contentText,
        modalId,
        modalOpen,
        closeModal,
        glossaryData,
        handlerOriginTextChange,
        handlerTranslTextChange,
        handlerAddGlossary, 
        handlerQueryGlossary,
        handlerdeleteGlossary
    };
    const remarkModalProps = {
        contentText,
        modalId,
        modalOpen,
        closeModal,
        remark
    };
    return (
        <div className="header" data-html2canvas-ignore>
            <div className="col-md-2 col-xs-2 col-lg-2">
                <Button data={saveDataProps}>
                    <span className="glyphicon glyphicon-floppy-save"></span> {contentText.save} 
                </Button>
            </div>
            <div className="col-md-8 col-xs-8 col-lg-8">
                <div className="btn-group">
                    <Button data={contrastBtnProps}>
                        <Link to="/contrast">
                            <span className="fa fa-photo"></span> {contentText.contrast}
                        </Link>
                    </Button>
                    <Button data={previewProps}>
                        <span className="glyphicon glyphicon-eye-open"></span> {contentText.preview} 
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
                <div className="btn-group">
                    <Button data={glossaryProps}>
                        <span className="fa fa-navicon"></span> {contentText.glossary} 
                    </Button>
                </div>
                <div className="btn-group">
                    <Button data={remarkProps}>
                        <span className="fa fa-book"></span> {contentText.remark} 
                    </Button>
                </div>
            </div>
            <div className="col-md-2 col-xs-2 col-lg-2">
                <div className="btn-group">
                    <ButtonDropDown {...switchLanguageProps}/>
                </div>
                <div className="btn-group">
                    <div className="comments dropdown-toggle" data-toggle="dropdown">
                        <span className="fa fa-bell-o"></span>
                        {feedMsg && feedMsg.length > 0 && <span className="badge">{feedMsg.length}</span>}
                    </div>
                    <FeedBackMessage {...feedBackMessageProps}/>
                </div>
            </div>
            {startPreview && <PreviewTranslResult {...previewTranslResultProps}/>}
            {notificationMsg && <Notification type="danger">{notificationMsg}</Notification>}
            <GlossaryModal {...glossaryModalProps}/>
            <RemarkModal {...remarkModalProps} />
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
                    <button type="button" className="btn btn-default active" onClick={() => {
                        handlerSaveData()
                        closeModal();
                    }}> {contentText.save} </button>
                </div>
            </Modal>}
        </div>
    )
}

export default Header;