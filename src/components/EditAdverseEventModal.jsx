import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css'; // Importe o arquivo CSS

const EditAdverseEventModal = ({ isOpen, onRequestClose, onConfirm, itemToEdit, itemType }) => {


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Editar {itemType}</h2>
     
    </Modal>
  );
};

export default EditAdverseEventModal;
