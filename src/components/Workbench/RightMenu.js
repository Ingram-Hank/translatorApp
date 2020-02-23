import React from 'react';

function RightMenu({ contentText, resultLayers}) {
    return (
        <div className="trans-result-right-menu bg-color-white  col-sm-2 col-xs-12">
            <div className="result-header">
                <div className="result-inner">
                    <div className="result-title">
                        {contentText.target}
                    </div>
                    <div className="result-select">
                        <div className="btn-group">
                            <button type="button" className="potato-btn">
                                {contentText.English}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="content-inner">
                <div className="translate-code-content">
                    {resultLayers.length ? 
                        resultLayers.map(({ index, originalText, translText }) => {
                            return (
                                <div className="result_item" key={index}>
                                    <div className="result-inner">
                                        <span className="result-index">
                                            #{index}
                                        </span>
                                        <div className="origin-image-area">
                                            <p className="result-origin-text">{originalText}</p>
                                        </div>
                                        <div className="result-translate-btn-area"></div>
                                        <div className="result-text">{translText}</div>
                                    </div>
                                </div>
                            )
                        }) : 
                        <div className="empty-inner">
                            <span className="empty-text">{contentText.noContent}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RightMenu;