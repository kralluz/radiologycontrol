// components/ConfirmDeleteModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Define o elemento root para acessibilidade

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Confirmação de Exclusão</h2>
      <p>Tem certeza de que deseja excluir este registro?</p>
      <button onClick={onConfirm}  className="confirm-button">Sim</button>
      <button onClick={onRequestClose} className="cancel-button">Não</button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
