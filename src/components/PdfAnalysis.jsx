import React from 'react';
import './PdfAnalysis.css'; // Certifique-se de que o caminho está correto

function PdfAnalysis({ setPdfResults }) {
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
        console.error('Error processing PDF: ', reason);
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
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove('over');
    const file = e.dataTransfer.files[0];
    if (file) {
      processPDF(file);
    }
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
    const file = e.target.files[0];
    if (file) {
      processPDF(file);
    }
  };

  return (
    <div className="drop_zone" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
      <p>Arraste seu arquivo PDF aqui ou clique no botão abaixo para escolher o arquivo</p>
      <input type="file" onChange={handleChange} accept="application/pdf" style={{ display: 'none' }} id="fileInput" />
      <label htmlFor="fileInput" className="button">Escolher arquivo</label>
    </div>
  );
}

export default PdfAnalysis;
