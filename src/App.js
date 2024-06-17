import { FaPlus, FaTimes } from "react-icons/fa"; // Importar ícones
import React, { useState } from "react";
import "./App.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import GetDataRadiologySupport from "./components/GetDataRadiologySupport";
import PdfAnalysis from "./components/PdfAnalysis";
import Header from "./components/Header";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

function App() {
  const [records, setRecords] = useState([]);
  const [contrastEvents, setContrastEvents] = useState([]); // Estado para armazenar eventos de contraste
  const [pdfResults, setPdfResults] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const addContrastEvent = (newEvent) => {
    setContrastEvents([...contrastEvents, newEvent]); // Adiciona novo evento ao estado
  };

  const addRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  const openModal = (index) => {
    setIndexToDelete(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIndexToDelete(null);
  };

  const confirmDelete = () => {
    if (indexToDelete !== null) {
      setRecords(records.filter((_, index) => index !== indexToDelete));
      closeModal();
    }
  };

  const generatePdfDocument = () => {
    const doc = new jsPDF();
    const marginLeft = 10;
    let yOffset = 10;
  
    doc.setFontSize(16);
    doc.text("Relatório de Procedimentos Realizados", marginLeft, yOffset);
    yOffset += 15;
  
    doc.setFontSize(14);
    doc.text("Relatório de exames:", marginLeft, yOffset);
    yOffset += 10;
  
    doc.setFontSize(12);
    pdfResults.split("\n").forEach((line) => {
      doc.text(line, marginLeft, yOffset);
      yOffset += 7;
    });
  
    yOffset += 15; // Espaço adicional entre seções
  
    // Adicionando Eventos de Contraste
    if (contrastEvents.length > 0) {
      doc.setFontSize(14);
      doc.text("Eventos de Contraste:", marginLeft, yOffset);
      yOffset += 10;
  
      contrastEvents.forEach((event) => {
        doc.text(`Data: ${event.occurrenceDate}`, marginLeft, yOffset);
        yOffset += 7;
        doc.text(`Quantidade de Contraste: ${event.contrastAmount} mL`, marginLeft, yOffset);
        yOffset += 7;
        doc.text(`ID do Paciente: ${event.patientId}`, marginLeft, yOffset);
        yOffset += 7;
        doc.text(`Nome: ${event.patientFirstName}`, marginLeft, yOffset);
        yOffset += 10; // Espaço extra antes do próximo evento
      });
    }

    // Registros Cirúrgicos - Usando AutoTable
    if (records.length > 0) {
      doc.setFontSize(14);
      doc.text("Registros Cirúrgicos:", marginLeft, yOffset);
      yOffset += 10;

      const tableData = records.map((record) => [
        `${record.date} ${record.time}`,
        record.timeSpent,
        record.doctorName,
        record.radiologistName,
        record.procedureName,
      ]);

      doc.autoTable({
        startY: yOffset,
        head: [
          ["Data e Hora", "Horas", "Médico", "Radiologista", "Procedimento"],
        ],
        body: tableData,
        margin: { top: 10, left: 10, right: 10 },
        styles: { cellPadding: 3, fontSize: 12, halign: "center" },
        headStyles: { fillColor: [0, 77, 153] }, // Cor azul similar ao header
        theme: "grid",
      });

      yOffset = doc.lastAutoTable.finalY + 10; // Atualiza o yOffset para o final da tabela
    }

    doc.save("relatorio_procedimentos.pdf");
  };

  return (
    <div className="App">
      <Header />
      <PdfAnalysis setPdfResults={setPdfResults} />
      <GetDataContrastEvent addContrastEvent={addContrastEvent} />
      <GetDataRadiologySupport addRecord={addRecord} />
      <button
        onClick={generatePdfDocument}
        className="generate-pdf-button float"
      >
        Gerar PDF dos Dados
      </button>

      <div className="contrast-events">
        {contrastEvents.length > 0 && (
          <div>
            <h2>Eventos de Contraste</h2>
            {contrastEvents.map((event, index) => (
              <div key={index} className="event">
                <div>Data: {event.occurrenceDate}</div>
                <div>Quantidade de Contraste: {event.contrastAmount} mL</div>
                <div>ID do Paciente: {event.patientId}</div>
                <div>Primeiro Nome do Paciente: {event.patientFirstName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {records.length > 0 && (
        <div className="results">
          {records.map((record, index) => (
            <div key={index} className="record">
              <button
                className="remove-button"
                onClick={() => openModal(index)}
              >
                X
              </button>
              <div>
                <label>Data e Hora:</label>
                <span>
                  {record.date} {record.time}
                </span>
              </div>
              <div>
                <label>Horas gastas:</label>
                <span>{record.timeSpent}</span>
              </div>
              <div>
                <label>Médico:</label>
                <span>{record.doctorName}</span>
              </div>
              <div>
                <label>Radiologista:</label>
                <span>{record.radiologistName}</span>
              </div>
              <div>
                <label>Procedimento:</label>
                <span>{record.procedureName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;

// GetDataContrastEvent.js

function GetDataContrastEvent({ addContrastEvent }) {
  const [formData, setFormData] = useState({
    contrastAmount: "",
    occurrenceDate: "",
    patientId: "",
    patientFirstName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContrastEvent(formData);
    setFormData({
      contrastAmount: "",
      occurrenceDate: "",
      patientId: "",
      patientFirstName: "",
    });
  };

  const clearForm = () => {
    setFormData({
      contrastAmount: "",
      occurrenceDate: "",
      patientId: "",
      patientFirstName: "",
    });
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="contrastAmount"
            placeholder="Quantidade de contraste estravazado em mL"
            value={formData.contrastAmount}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="occurrenceDate"
            value={formData.occurrenceDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="patientId"
            placeholder="ID do paciente"
            value={formData.patientId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="patientFirstName"
            placeholder="Primeiro nome do paciente"
            value={formData.patientFirstName}
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
