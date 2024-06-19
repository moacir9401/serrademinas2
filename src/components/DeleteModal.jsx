import React from 'react';
import  './DeleteModal.css'

const DeleteModal = ({ isOpen, onClose, onConfirm, mensagem }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar Exclus�o</h2>
                <p>{mensagem}</p>
                <div className="modal-buttons">
                    <button className="btn btn-primary" onClick={onConfirm}>Sim</button>
                    <button className="btn btn-primary" onClick={onClose}>N�o</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
