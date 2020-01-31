import React from 'react';
import {Button, ButtonDropDown, Toggle} from '../';
import './header.css';

function Header ({contentText, marquee, switchAutoClear, switchAutoOCR, switchAutoTranslate, language, handlerDropDownItem, onToggle}){
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
    
    return (
        <div className="header">
            <div className="col-md-2 col-xs-2 col-lg-2">
                <Button>
                    &lt; {contentText.back}
                </Button>
            </div>
            <div className="col-md-8 col-xs-8 col-lg-8">
                <div className="btn-group">
                    <Button>
                        <span className="glyphicon glyphicon-eye-open"></span> {contentText.preview} 
                    </Button>
                    <Button>
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
                <ButtonDropDown {...switchLanguageProps}/>
            </div>
        </div>
    )
}

export default Header;