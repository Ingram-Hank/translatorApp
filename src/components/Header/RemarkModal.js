import React from 'react';

class RemarkModal extends React.Component {
    componentDidUpdate() {
        const remarkContainer = document.getElementById("remarkContainer");
        if(remarkContainer) {
            remarkContainer.innerHTML = this.props.remark;
        }
    }
    render () {
        const {contentText, modalId, modalOpen, closeModal} = this.props;
        if(modalOpen && modalId === "remark") {
            return (
                <div className="popup">
                    <div className="popup-remark">
                        <div className="popup-header">
                            <h5>{contentText.remarkTitle}</h5>
                            <span className="dismissPopUp" onClick={closeModal}>
                                <span className="glyphicon glyphicon-remove"></span>
                            </span>
                        </div>
                        <div className="popup-content" id="remarkContainer"></div>
                    </div>
                </div>
            )
        }else {
            return null
        }
    }
}

export default RemarkModal;