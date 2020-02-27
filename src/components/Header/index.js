import React from 'react';
import {Button, ButtonDropDown, Toggle} from '../';
import PreviewTranslResult from './PreviewTranslResult';
import FeedBackMessage from './FeedBackMessage';
import './header.css';
import ImgMerge from './ImgMerge ';

const buildImgs = (selectedImage, resultData)=> {
    let imgs = [
        {
            url: selectedImage,
            x: 0,
            y: 0,
            width: 565,
            height: 800
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

function Header ({contentText, marquee, switchAutoClear, switchAutoOCR, switchAutoTranslate, language,
    handlerDropDownItem, handlerPreview, handlerClosePreview, onToggle, selectedImage, resultData, 
    startPreview, handlerSaveData, feedMsg = [], handlerSelectFeedBackMsg }){
    const imgs = buildImgs(selectedImage, resultData);
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
    const contrastProps = {
        attributes: {
            onClick: ()=> {}
        }
    };
    const saveDataProps = {
        attributes: {
            onClick: ()=> {
                handlerSaveData(resultImg);
            }
        }
    }
    const previewProps = {
        attributes: {
            onClick: ()=> handlerPreview()
        }
    };
    
    const previewTranslResultProps = {
        img: resultImg,
        handlerClosePreview
    };
    const feedBackMessageProps = {
        contentText,
        feedMsg,
        handlerSelectFeedBackMsg
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
                    <Button data={contrastProps}>
                        <span className="fa fa-photo"></span> {contentText.contrast}
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
                        {feedMsg.length && <span className="badge">{feedMsg.length}</span>}
                    </div>
                    <FeedBackMessage {...feedBackMessageProps}/>
                </div>
            </div>
            {startPreview && <PreviewTranslResult {...previewTranslResultProps}/>}
            
        </div>
    )
}

export default Header;