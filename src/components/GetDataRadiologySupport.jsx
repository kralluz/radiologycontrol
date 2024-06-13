// GetDataRadiologySupport.js
import React, { useState } from 'react';
import './GetDataRadiologySupport.css';
import { FaPlus, FaTimes } from 'react-icons/fa'; // Importar ícones

function GetDataRadiologySupport({ addRecord }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    timeSpent: '',
    doctorName: '',
    radiologistName: '',
    procedureName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecord(formData);
    setFormData({
      date: '',
      time: '',
      timeSpent: '',
      doctorName: '',
      radiologistName: '',
      procedureName: ''
    });
  };

  const clearForm = () => {
    setFormData({
      date: '',
      time: '',
      timeSpent: '',
      doctorName: '',
      radiologistName: '',
      procedureName: ''
    });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="timeSpent"
            placeholder="Horas e minutos gastos"
            value={formData.timeSpent}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="doctorName"
            placeholder="Nome do médico"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="radiologistName"
            placeholder="Nome do radiologista que auxiliou"
            value={formData.radiologistName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="procedureName"
            placeholder="Nome do procedimento"
            value={formData.procedureName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="button"  className="generate-pdf-button" onClick={clearForm}>
            <FaTimes color='white'/>
          </button>
          <button type="submit"  className="generate-pdf-button">
            <FaPlus color='white'/>
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetDataRadiologySupport;
