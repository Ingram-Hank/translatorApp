import React from 'react';

class RemarkModal extends React.Component {
    componentDidUpdate() {
        const remarkContainer = document.getElementById("remarkContainer");
        if(remarkContainer) {
            remarkContainer.innerHTML = this.props.remark;
        }
    }
    render () {
        const {contentText, expandRemarkModal } = this.props;
        if(expandRemarkModal) {
            return (
                <div className="remark" id="remark">
                    <div className="remark-header">
                        <h5 id="remarkHeader">{contentText.remarkTitle}</h5>
                    </div>
                    <div className="remark-content" id="remarkContainer"></div>
                </div>
            )
        }else {
            return null
        }
    }
}

export default RemarkModal;