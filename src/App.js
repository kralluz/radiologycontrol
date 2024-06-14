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
  const [pdfResults, setPdfResults] = useState(""); // Este estado armazena os resultados da análise do PDF
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

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
    doc.text(
      "RadiologyControl - Relatório de Procedimentos",
      marginLeft,
      yOffset
    );
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
      <GetDataRadiologySupport addRecord={addRecord} />
      <button onClick={generatePdfDocument} className="generate-pdf-button">
        Gerar PDF dos Dados
      </button>
      <div className="results">
        {records.map((record, index) => (
          <div key={index} className="record">
            <button className="remove-button" onClick={() => openModal(index)}>
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
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;
