import React from 'react';

function GlossaryModal ({contentText, modalId, modalOpen, closeModal, glossaryData, handlerOriginTextChange,
    handlerTranslTextChange, handlerAddGlossary, handlerQueryGlossary, handlerdeleteGlossary}) {
    if(modalOpen && modalId === "glossary") {
        const data = glossaryData || [];
        return (
            <div className="popup">
                <div className="popup-glossary">
                    <div className="popup-header">
                        <h5>{contentText.glossaryTitle}</h5>
                        <span className="dismissPopUp" onClick={closeModal}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </span>
                    </div>
                    <div className="popup-content">
                        <form className="form-inline">
                            <div className="form-group">
                                <label className="sr-only" htmlFor={contentText.originText}>{contentText.originText}</label>
                                <input type="text" className="form-control" onChange={(e)=> handlerOriginTextChange(e)} id={contentText.originText} placeholder={contentText.originTextPlaceholder}/>
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor={contentText.translText}>{contentText.translText}</label>
                                <input type="text" className="form-control" onChange={(e)=> handlerTranslTextChange(e)} id={contentText.translText} placeholder={contentText.translTextPlaceholder}/>
                            </div>
                            <div className="btn-group">
                                <button type="button" onClick={handlerAddGlossary} className="btn btn-default">{contentText.add}</button>
                                <button type="button" onClick={handlerQueryGlossary} className="btn btn-default">{contentText.search}</button>
                            </div>
                        </form>
                        <div className="glossary_body">
                            {data.length > 0 ? <ul className="glossaryList">
                                {data.map((item, index)=> {
                                    return (
                                        <li className="glossary-item" key={index}>
                                            <div className="orginText">{item.termSource}</div>
                                            <div className="translTo">{contentText.translTo}</div>
                                            <div className="translText">{item.termTarget}</div>
                                            <div className="deleteAction" onClick={()=> handlerdeleteGlossary(item.comicListId, item.orderNo, item.comicTermId)}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            : <div className="noContent text-center">{contentText.noContent}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }else {
        return null
    }
}

export default GlossaryModal;