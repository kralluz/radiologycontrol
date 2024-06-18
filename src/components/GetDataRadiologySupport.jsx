// GetDataRadiologySupport.js
import React, { useState } from "react";
import "./GetDataRadiologySupport.css";
import { FaPlus, FaTimes } from "react-icons/fa"; // Importar ícones

function GetDataRadiologySupport({ addRecord }) {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    doctorName: "",
    radiologistName: "",
    procedureName: "",
  });

  const calculateTimeSpent = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diff = end - start;
    const minutes = Math.floor(diff / 60000);
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeSpent = calculateTimeSpent(formData.startTime, formData.endTime);
    const dataWithTimeSpent = { ...formData, timeSpent };
    addRecord(dataWithTimeSpent);
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      doctorName: "",
      radiologistName: "",
      procedureName: "",
    });
  };

  const clearForm = () => {
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      doctorName: "",
      radiologistName: "",
      procedureName: "",
    });
  };

  return (
    <div className="card">
      <h3>Centro Cirurgico</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Início</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />

          <label>Fim</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />

          <label>Médico</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />

          <label>Radiologista</label>
          <input
            type="text"
            name="radiologistName"
            value={formData.radiologistName}
            onChange={handleChange}
            required
          />

          <label>Procedimento</label>
          <input
            type="text"
            name="procedureName"
            value={formData.procedureName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            className="generate-pdf-button"
            onClick={clearForm}
          >
            <FaTimes color="white" />
          </button>
          <button type="submit" className="generate-pdf-button">
            <FaPlus color="white" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetDataRadiologySupport;
