import React from 'react';
import {Button, ButtonDropDown} from '../';

function Header ({contentText, marquee, language, handlerDropDownItem}){
    const switchMouseProps = {
        defaultText: contentText.marquee,
        selectedItem: marquee,
        id: "marquee",
        data: contentText.marqueeCollection,
        handlerDropDownItem
    };
    const switchLanguageProps = {
        defaultText: contentText.language,
        selectedItem: language,
        id: "language",
        data: contentText.languageCollection,
        handlerDropDownItem
    };
    return (
        <header className="header">
            <div className="row">
                <div className="col-md-3 col-xs-3 col-lg-3">
                    <div className="text-left">
                        <Button>
                            <span className="glyphicon glyphicon-chevron-left"></span> {contentText.back} 
                        </Button>
                    </div>
                </div>
                <div className="col-md-6 col-xs-6 col-lg-6">
                    <div className="btn-group">
                        <Button>
                            <span className="glyphicon glyphicon-eye-open"></span> {contentText.preview} 
                        </Button>
                        <Button>
                            <span className="glyphicon glyphicon-floppy-save"></span> {contentText.save} 
                        </Button>
                        <ButtonDropDown {...switchMouseProps}/>
                    </div>
                </div>
                <div className="col-md-3 col-xs-3 col-lg-3">
                    <ButtonDropDown {...switchLanguageProps}/>
                </div>
            </div>
        </header>
    )
}

export default Header;