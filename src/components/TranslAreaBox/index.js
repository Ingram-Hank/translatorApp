import React from 'react';
import Modal from '../Modal';

function TranslAreaBox ({data, createNewCropArea, modalOpen, openModal, closeModal}) {
    if(data){
        const translAreaBoxStyle = {
            height: `${data.height}px`,
            width: `${data.width}px`,
            left: `${data.left}px`,
            top: `${data.top}px`
        };
        return (
            <div className='translAreaBox' id='translAreaBox' style={translAreaBoxStyle}>
                <div id="cropBoxCancel" className="cancel" title="delete" onClick={openModal}>
                    <span className="glyphicon glyphicon-trash"></span>
                </div>
                {modalOpen &&
                    <Modal>
                        <div className="popup-header">
                            <h5>Delete</h5>
                            <span className="dismissPopUp" onClick={closeModal}>
                                <span className="glyphicon glyphicon-remove"></span>
                            </span>
                        </div>
                        <div className="popup-content text-center">
                            Are you sure you want to delete?
                        </div>
                        <div className="popup-footer text-right">
                            <button type="button" className="btn btn-default" onClick={closeModal}> Cancel </button>
                            <button type="button" className="btn btn-default" onClick={()=> {closeModal() ; createNewCropArea()}}> Confirm </button>
                        </div>
                    </Modal>
                }
            </div>
        )
    }else {
        return null
    }
}

export default TranslAreaBox;