import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import "./GetDataContrastEvent.css";

function GetDataContrastEvent({ addContrastEvent }) {
  const [formData, setFormData] = useState({
    eventType: "extravasamento de contraste",
    contrastAmount: "",
    occurrenceDate: "",
    patientId: "",
    patientFirstName: "",
    report: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContrastEvent(formData);
    setSubmittedData(formData);
    setFormData({
      eventType: "extravasamento de contraste",
      contrastAmount: "",
      occurrenceDate: "",
      patientId: "",
      patientFirstName: "",
      report: "",
    });
  };

  const clearForm = () => {
    setFormData({
      eventType: "extravasamento de contraste",
      contrastAmount: "",
      occurrenceDate: "",
      patientId: "",
      patientFirstName: "",
      report: "",
    });
  };

  return (
<div className="card bg-dark text-light">
      <div className="card-body">
        <h2 className="card-title">Eventos Adversos</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group mb-4">
            <label>Tipo de Evento Adverso</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="form-control bg-dark text-light"
              required
            >
              <option value="extravasamento de contraste">
                Extravasamento de Contraste
              </option>
              <option value="reação alérgica">Reação Alérgica</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          <div className="form-group mb-4">
            <label>Quantidade de Contraste (mL)</label>
            <input
              type="text"
              name="contrastAmount"
              placeholder="Quantidade de contraste extravasado em mL"
              value={formData.contrastAmount}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light"
            />
          </div>
          <div className="form-group mb-4">
            <label>Data de Ocorrência</label>
            <input
              type="date"
              name="occurrenceDate"
              value={formData.occurrenceDate}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light"
            />
          </div>
          <div className="form-group mb-4">
            <label>ID do Paciente</label>
            <input
              type="text"
              name="patientId"
              placeholder="ID do paciente"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light"
            />
          </div>
          <div className="form-group mb-4">
            <label>Primeiro Nome do Paciente</label>
            <input
              type="text"
              name="patientFirstName"
              placeholder="Primeiro nome do paciente"
              value={formData.patientFirstName}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light"
            />
          </div>
          <div className="form-group mb-4">
            <label>Relatório</label>
            <textarea
              name="report"
              placeholder="Descreva o evento adverso"
              value={formData.report}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              <FaTimes /> Limpar
            </button>
            <button type="submit" className="btn btn-primary">
              <FaPlus /> Adicionar
            </button>
          </div>
        </form>
        {submittedData && (
          <div className="submitted-data mt-4 bg-secondary p-3 rounded">
            <h3>Dados Submetidos:</h3>
            <p>
              <strong>Tipo de Evento:</strong> {submittedData.eventType}
            </p>
            <p>
              <strong>Quantidade de Contraste:</strong> {submittedData.contrastAmount} mL
            </p>
            <p>
              <strong>Data de Ocorrência:</strong> {submittedData.occurrenceDate}
            </p>
            <p>
              <strong>ID do Paciente:</strong> {submittedData.patientId}
            </p>
            <p>
              <strong>Nome do Paciente:</strong> {submittedData.patientFirstName}
            </p>
            <p>
              <strong>Relatório:</strong> {submittedData.report}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetDataContrastEvent;
