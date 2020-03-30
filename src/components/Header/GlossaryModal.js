import React from 'react';

function GlossaryModal({ contentText, expandGlossaryModal, glossaryData, handlerOriginTextChange,
    handlerTranslTextChange, handlerAddGlossary, handlerQueryGlossary, handlerdeleteGlossary }) {
    if (expandGlossaryModal) {
        const data = glossaryData || [];
        return (
            <div className="glossaryModal" id="glossaryModal">
                <div className="glossaryModal-header">
                    <h5 id="glossaryModal-header">{contentText.glossaryTitle}</h5>
                </div>
                <div className="glossaryModal-content" id="glossaryModal-content">
                    <form className="form-inline" id="glossaryModal-form">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="orginText">{contentText.originText}</label>
                            <input type="text" id="orginText" className="form-control" onChange={(e) => handlerOriginTextChange(e)} placeholder={contentText.originTextPlaceholder} />
                        </div>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="translText">{contentText.translText}</label>
                            <input type="text" id="translText" className="form-control" onChange={(e) => handlerTranslTextChange(e)} placeholder={contentText.translTextPlaceholder} />
                        </div>
                        <div className="btn-group">
                            <button type="button" id="add" onClick={handlerAddGlossary} className="btn btn-default">{contentText.add}</button>
                            <button type="button" id="delete" onClick={handlerQueryGlossary} className="btn btn-default">{contentText.search}</button>
                        </div>
                    </form>
                    <div className="glossary_body">
                        {data.length > 0 ? <ul className="glossaryList">
                            {data.map((item, index) => {
                                return (
                                    <li className="glossary-item" key={index}>
                                        <div className="orginText" id="glossary-orginText">{item.termSource}</div>
                                        <div className="translTo" id="glossary-translTo">{contentText.translTo}</div>
                                        <div className="translText" id="glossary-translText">{item.termTarget}</div>
                                        <div className="deleteAction" id="glossary-deleteAction" onClick={() => handlerdeleteGlossary(item.comicListId, item.orderNo, item.comicTermId)}>
                                            <span id="glossary-deleteAction-icon" className="glyphicon glyphicon-remove"></span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                            : <div className="noContent text-center" id="noContent">{contentText.noContent}</div>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default GlossaryModal;