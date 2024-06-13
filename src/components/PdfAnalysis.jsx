import React, { useState } from 'react';
import './PdfAnalysis.css'; // Arquivo de estilos para PdfAnalysis

function PdfAnalysis({ setPdfResults }) {
  const [analysisResults, setAnalysisResults] = useState("");

  const processPDF = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const typedArray = new Uint8Array(this.result);
      const loadingTask = window['pdfjsLib'].getDocument(typedArray);
      loadingTask.promise.then(pdf => {
        pdf.getPage(1).then(page => {
          page.getTextContent().then(textContent => {
            const text = textContent.items.map(item => item.str).join(' ');
            analyzeText(text);
          });
        });
      }, reason => {
        console.error(reason);
      });
    };
    fileReader.readAsArrayBuffer(file);
  };

  const analyzeText = (text) => {
    const countRX = (text.match(/ RX /g) || []).length;
    const countTC = (text.match(/ TC /g) || []).length;
    const countUS = (text.match(/ US /g) || []).length;
    const countDO = (text.match(/DO CORPO INTEIRO|DO COLUNA LOMBAR E DO FÊMU/g) || []).length;
    const resultsString = `Total RX: ${countRX}\nTotal TC: ${countTC}\nTotal US: ${countUS}\nTotal DO: ${countDO}\nTotal Exams: ${countDO + countRX + countTC + countUS}`;
    setPdfResults(resultsString);
    setAnalysisResults(resultsString); // Atualiza o estado local com os resultados
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processPDF(file);
    e.target.classList.remove('over');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.target.classList.add('over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove('over');
  };

  const handleChange = (e) => {
    processPDF(e.target.files[0]);
  };

  return (
    <div className="drop_zone" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
      <p>Arraste seu arquivo PDF aqui ou clique no botão abaixo para escolher o arquivo</p>
      <input type="file" onChange={handleChange} accept="application/pdf" style={{ display: 'none' }} id="fileInput"/>
      <label htmlFor="fileInput" className="button">Escolher arquivo</label>
      {analysisResults && (
        <div className="analysis-results">
          <pre>{analysisResults}</pre> {/* Exibe os resultados da análise */}
        </div>
      )}
    </div>
  );
}

export default PdfAnalysis;
