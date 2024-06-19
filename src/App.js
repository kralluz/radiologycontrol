import { GoMoveToEnd } from 'react-icons/go';
import { MdStart } from 'react-icons/md';
import { FaHourglassEnd } from 'react-icons/fa6';
import { LuTimer } from 'react-icons/lu';
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaUserNurse,
  FaProcedures,
} from 'react-icons/fa';
import { FaPlus, FaTimes, FaTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import './App.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import GetDataRadiologySupport from './components/GetDataRadiologySupport';
import PdfAnalysis from './components/PdfAnalysis';
import Header from './components/Header';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import GetDataContrastEvent from './components/GetDataContrastEvent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [records, setRecords] = useState([]);
  const [contrastEvents, setContrastEvents] = useState([]);
  const [pdfResults, setPdfResults] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  const addContrastEvent = (newEvent) => {
    setContrastEvents([...contrastEvents, newEvent]);
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
    doc.text('Relatório de Procedimentos Realizados', marginLeft, yOffset);
    yOffset += 15;

    doc.setFontSize(14);
    doc.text('Relatório de exames:', marginLeft, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    pdfResults.split('\n').forEach((line) => {
      doc.text(line, marginLeft, yOffset);
      yOffset += 7;
    });

    yOffset += 15;

    if (contrastEvents.length > 0) {
      doc.setFontSize(14);
      doc.text('Eventos de Contraste:', marginLeft, yOffset);
      yOffset += 10;

      contrastEvents.forEach((event) => {
        doc.text(`Data: ${event.occurrenceDate}`, marginLeft, yOffset);
        yOffset += 7;
        doc.text(
          `Quantidade de Contraste: ${event.contrastAmount} mL`,
          marginLeft,
          yOffset,
        );
        yOffset += 7;
        doc.text(`ID do Paciente: ${event.patientId}`, marginLeft, yOffset);
        yOffset += 7;
        doc.text(`Nome: ${event.patientFirstName}`, marginLeft, yOffset);
        yOffset += 10;
      });
    }

    if (records.length > 0) {
      doc.setFontSize(14);
      doc.text('Registros Cirúrgicos:', marginLeft, yOffset);
      yOffset += 10;

      const tableData = records.map((record) => [
        `${record.date}`,
        `${record.startTime} - ${record.endTime}`,
        record.timeSpent,
        record.doctorName,
        record.radiologistName,
        record.procedureName,
      ]);

      doc.autoTable({
        startY: yOffset,
        head: [
          [
            'Data',
            'Início - Término',
            'Tempo Gasto',
            'Médico',
            'Técnico',
            'Procedimento',
          ],
        ],
        body: tableData,
        margin: { top: 10, left: 10, right: 10 },
        styles: {
          cellPadding: 3,
          fontSize: 12,
          halign: 'center',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [0, 77, 153],
          halign: 'center',
          valign: 'middle',
        },
        theme: 'grid',
      });

      yOffset = doc.lastAutoTable.finalY + 10;
    }

    doc.save('relatorio_procedimentos.pdf');
  };

  return (
    <div className="App">
      <Header />
      <PdfAnalysis setPdfResults={setPdfResults} />
      <button
        onClick={generatePdfDocument}
        className="generate-pdf-button float"
      >
        Gerar PDF dos Dados
      </button>
      <div className="main">
        <div className="surgical-center">
          <GetDataRadiologySupport addRecord={addRecord} />
          {records.length > 0 && (
            <div className="results">
              {records.map((record, index) => (
                <div
                  key={index}
                  className="record card bg-dark text-light mb-2 p-2"
                >
                  <div>
                    <h4>{record.procedureName}</h4>
                  </div>
                  <div>
                    <span>Data: {record.date}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span>Início: {record.startTime}</span>
                    </div>
                    <div>
                      <span>Término: {record.endTime}</span>
                    </div>
                    <div>
                      <span>Tempo gasto: {record.timeSpent}</span>
                    </div>
                  </div>
                  <div>
                    <span>Médico: {record.doctorName}</span>
                  </div>
                  <div>
                    <span>Técnico: {record.radiologistName}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-danger float-end d-flex align-items-center justify-content-center"
                      onClick={() => openModal(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="contrast-events">
          <GetDataContrastEvent addContrastEvent={addContrastEvent} />
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
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;
