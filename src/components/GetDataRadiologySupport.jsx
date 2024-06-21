import React, { useState } from 'react';

function GetDataRadiologySupport({ addRecord }) {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    doctorName: '',
    radiologistName: '',
    procedureName: '',
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

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day} / ${month} / ${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeSpent = calculateTimeSpent(formData.startTime, formData.endTime);
    const formattedDate = formatDate(formData.date);
    const dataWithTimeSpent = { ...formData, date: formattedDate, timeSpent };
    addRecord(dataWithTimeSpent);
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      doctorName: '',
      radiologistName: '',
      procedureName: '',
    });
  };

  const clearForm = () => {
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      doctorName: '',
      radiologistName: '',
      procedureName: '',
    });
  };

  return (
    <div className="card bg-dark text-light">
      <div className="card-body">
        <h3 className="card-title">Centro Cirúrgico</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label>Data:</label>
            <input
              type="date"
              className="form-control bg-dark text-light"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Início:</label>
            <input
              type="time"
              className="form-control bg-dark text-light"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Fim:</label>
            <input
              type="time"
              className="form-control bg-dark text-light"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Médico:</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Técnico:</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              name="radiologistName"
              value={formData.radiologistName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Procedimento:</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              name="procedureName"
              value={formData.procedureName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearForm}
            >
              Limpar
            </button>
            <button type="submit" className="btn btn-primary">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GetDataRadiologySupport;
