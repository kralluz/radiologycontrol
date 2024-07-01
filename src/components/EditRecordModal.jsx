// components/EditRecordModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditRecordModal = ({ isOpen, onRequestClose, record, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    doctorName: '',
    radiologistName: '',
    procedureName: '',
  });

  useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="Modal" overlayClassName="Overlay">
      <h2>Editar Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label>Data:</label>
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Início:</label>
          <input type="time" className="form-control" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Fim:</label>
          <input type="time" className="form-control" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Médico:</label>
          <input type="text" className="form-control" name="doctorName" value={formData.doctorName} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Técnico:</label>
          <input type="text" className="form-control" name="radiologistName" value={formData.radiologistName} onChange={handleChange} required />
        </div>
        <div className="form-group mb-4">
          <label>Procedimento:</label>
          <input type="text" className="form-control" name="procedureName" value={formData.procedureName} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default EditRecordModal;
