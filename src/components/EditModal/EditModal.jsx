import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css'; // Importe o arquivo CSS

const EditModal = ({ isOpen, onRequestClose, onConfirm, itemToEdit, itemType }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData, itemType);
  };

  if (!itemToEdit) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Editar {itemType}</h2>
      <form onSubmit={handleSubmit}>
        <div className="timeInputs">
        <label>
          Data:
          <input
            type="date"
            name="date"
            value={formData.date || ''}
            onChange={handleChange}
          />
        </label>
          <label>
            Hora de Início:
            <input
              type="time"
              name="startTime"
              value={formData.startTime || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Hora de Término:
            <input
              type="time"
              name="endTime"
              value={formData.endTime || ''}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Nome do Médico:
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Nome do Procedimento:
          <input
            type="text"
            name="procedureName"
            value={formData.procedureName || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Nome do Radiologista:
          <input
            type="text"
            name="radiologistName"
            value={formData.radiologistName || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </Modal>
  );
};

export default EditModal;
