import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
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
  const [deleteType, setDeleteType] = useState('');

  const addContrastEvent = (newEvent) => {
    setContrastEvents([...contrastEvents, newEvent]);
  };

  const addRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  const openModal = (index, type) => {
    setIndexToDelete(index);
    setDeleteType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIndexToDelete(null);
    setDeleteType('');
  };

  const confirmDelete = () => {
    if (indexToDelete !== null) {
      if (deleteType === 'record') {
        setRecords(records.filter((_, index) => index !== indexToDelete));
      } else if (deleteType === 'contrastEvent') {
        setContrastEvents(
          contrastEvents.filter((_, index) => index !== indexToDelete),
        );
      }
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
      <div className="container">
        <div className="row">
          <div className="col-md-6 surgical-center bg-dark text-light p-3">
            <GetDataRadiologySupport addRecord={addRecord} />
            {records.length > 0 && (
              <div className="results">
                <h2 style={{ textAlign: 'center' }}>Registros Cirúrgicos</h2>
                {records.map((record, index) => (
                  <div
                    key={index}
                    className="record card bg-dark text-light mb-2 p-2"
                    style={{ position: 'relative' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h5>{record.procedureName}</h5>
                      <strong>{record.date}</strong>
                    </div>
                    <div></div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <span>
                          <strong>Início: </strong>
                          {record.startTime}
                        </span>
                      </div>
                      <div>
                        <span>
                          <strong>Término: </strong>
                          {record.endTime}
                        </span>
                      </div>
                      <div>
                        <span>
                          <strong>Tempo gasto:</strong> {record.timeSpent}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span>
                        <strong>Médico:</strong> {record.doctorName}
                      </span>
                    </div>
                    <div>
                      <span>
                        <strong>Técnico:</strong> {record.radiologistName}
                      </span>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                      }}
                    >
                      <button
                        className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                        onClick={() => openModal(index, 'record')}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-6 contrast-events bg-dark text-light p-3">
            <GetDataContrastEvent addContrastEvent={addContrastEvent} />
            {contrastEvents.length > 0 && (
              <div className="results">
                <h2 style={{ textAlign: 'center' }}>Eventos Adversos</h2>
                <div>
                  {contrastEvents.map((event, index) => (
                    <div
                      key={index}
                      className="record card bg-dark text-light mb-2 p-2"
                      style={{ position: 'relative' }}
                    >
                      <div>
                        <h3> {event.eventType}</h3>
                        <div>
                          <strong>Data da Ocorrência:</strong>{' '}
                          {event.occurrenceDate}
                        </div>
                        <div>
                          <strong>ID do Paciente:</strong> {event.patientId}
                        </div>
                        <div>
                          <strong>Primeiro Nome do Paciente:</strong>{' '}
                          {event.patientFirstName}
                        </div>
                        <div>
                          <strong>Relatório:</strong>{' '}
                          <p className="report-box">{event.report}</p>
                        </div>
                        <button
                          className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '10px',
                          }}
                          onClick={() => openModal(index, 'contrastEvent')}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
