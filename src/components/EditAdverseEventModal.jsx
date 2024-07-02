import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditAdverseEventModal.css'; // Importe o arquivo CSS

const EditAdverseEventModal = ({ isOpen, onRequestClose, onConfirm, itemToEdit, itemType }) => {
  const [formData, setFormData] = useState({
    eventType: itemToEdit.eventType || '',
    occurrenceDate: itemToEdit.occurrenceDate || '',
    patientId: itemToEdit.patientId || '',
    patientFirstName: itemToEdit.patientFirstName || '',
    report: itemToEdit.report || ''
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        eventType: itemToEdit.eventType || '',
        occurrenceDate: itemToEdit.occurrenceDate || '',
        patientId: itemToEdit.patientId || '',
        patientFirstName: itemToEdit.patientFirstName || '',
        report: itemToEdit.report || ''
      });
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
    onConfirm(formData);
    onRequestClose();
  };

  const clearForm = () => {
    setFormData({
      eventType: '',
      occurrenceDate: '',
      patientId: '',
      patientFirstName: '',
      report: ''
    });
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
      <form onSubmit={handleSubmit} className="form">
        <div className='input-group'>
          <div className="form-group mb-1">
            <label>Tipo de Evento Adverso</label>
            <select
              name="eventType"
              value={formData.eventType || ''}
              onChange={handleChange}
              className="form-control bg-dark text-light"
              required
            >
              <option value="">Selecione o tipo de evento</option>
              <option value="Extravasamento de contraste">Extravasamento de Contraste</option>
              <option value="Reação alérgica">Reação Alérgica</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="form-group mb-1">
            <label>Data da Ocorrência:</label>
            <input
              type="date"
              name="occurrenceDate"
              value={formData.occurrenceDate || ''}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light"
            />
          </div>
        </div>
        <div className="form-group mb-1">
          <label>ID do Paciente:</label>
          <input
            type="text"
            name="patientId"
            placeholder="ID do paciente"
            value={formData.patientId || ''}
            onChange={handleChange}
            required
            className="form-control bg-dark text-light"
          />
        </div>
        <div className="form-group mb-1">
          <label>Nome</label>
          <input
            type="text"
            name="patientFirstName"
            placeholder="Primeiro nome do paciente"
            value={formData.patientFirstName || ''}
            onChange={handleChange}
            required
            className="form-control bg-dark text-light"
          />
        </div>
        <div className="form-group mb-1">
          <label>Relatório</label>
          <textarea
            name="report"
            placeholder="Descreva o evento adverso"
            value={formData.report || ''}
            onChange={handleChange}
            required
            maxLength={200}
            className="form-control bg-dark text-light"
          ></textarea>
          <small className="text-light">{formData.report.length}/200</small>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-danger"
            onClick={clearForm}
          >
            Limpar
          </button>
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAdverseEventModal;
