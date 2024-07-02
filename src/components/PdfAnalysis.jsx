import React, { useState } from "react";
import "./PdfAnalysis.css"; // Arquivo de estilos para PdfAnalysis

function PdfAnalysis({ setPdfResults }) {
  const [analysisResults, setAnalysisResults] = useState("");
  const [tcCount, setTcCount] = useState(0);
  const [rxCount, setRxCount] = useState(0);
  const [lombarFemurCount, setLombarFemurCount] = useState(0);
  const [corpoInteiroCount, setCorpoInteiroCount] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false); // Estado para controlar a exibição da área de drop

  const processPDF = (file) => {
    setFileUploaded(true); // Atualiza o estado para indicar que um arquivo foi carregado
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const typedArray = new Uint8Array(this.result);
      const loadingTask = window["pdfjsLib"].getDocument(typedArray);
      loadingTask.promise.then(
        (pdf) => {
          const numPages = pdf.numPages;
          const pagePromises = [];
          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            pagePromises.push(
              pdf.getPage(pageNum).then((page) => {
                return page.getTextContent().then((textContent) => {
                  const text = textContent.items
                    .map((item) => item.str)
                    .join(" ");
                  return text; // Retorna o texto para futura agregação
                });
              })
            );
          }

          Promise.all(pagePromises).then((pagesTexts) => {
            const fullText = pagesTexts.join(" ");
            setAnalysisResults(fullText); // Atualiza o estado com os resultados da análise de todas as páginas
            // Calcula as contagens de termos específicos
            const tcTotalCount = (
              fullText.match(/\bTC\b(?=[ ,.;?!]|$)/gi) || []
            ).length;
            const rxTotalCount = (
              fullText.match(/\bRX\b(?=[ ,.;?!]|$)/gi) || []
            ).length;
            const lombarFemurTotalCount = (
              fullText.match(/do coluna lombar e do fêmu/gi) || []
            ).length;
            const corpoInteiroTotalCount = (
              fullText.match(/do corpo inteiro/gi) || []
            ).length;
            setTcCount(tcTotalCount);
            setRxCount(rxTotalCount);
            setLombarFemurCount(lombarFemurTotalCount);
            setCorpoInteiroCount(corpoInteiroTotalCount);
            setPdfResults(
              `Tomografias Realizadas: ${tcTotalCount}\nRaio-X Realizados: ${rxTotalCount}\nDesitometrias Realizadas: ${
                lombarFemurTotalCount + corpoInteiroTotalCount
              }\nTotal: ${
                tcTotalCount +
                rxTotalCount +
                lombarFemurTotalCount +
                corpoInteiroTotalCount
              }`
            );
          });
        },
        (reason) => {
          console.error(reason);
        }
      );
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processPDF(file);
    e.target.classList.remove("over");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    e.target.classList.add("over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("over");
  };

  const handleChange = (e) => {
    processPDF(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFileUploaded(false);
    setAnalysisResults("");
    setTcCount(0);
    setRxCount(0);
    setLombarFemurCount(0);
    setCorpoInteiroCount(0);
    setPdfResults("");
  };

  return (
    <div className="pdf-analysis-container">
      {!fileUploaded ? (
        <div
          className="drop_zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <p>
            Arraste seu arquivo PDF aqui ou clique no botão abaixo para escolher o arquivo
          </p>
          <input
            type="file"
            onChange={handleChange}
            accept="application/pdf"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="button">
            Escolher arquivo
          </label>
        </div>
      ) : (
        <div className="analysis-results fadeIn">
          <p>Tomografias realizadas: {tcCount}</p>
          <p>Raio-x realizados: {rxCount}</p>
          <p>Desitometrias realizadas: {lombarFemurCount + corpoInteiroCount}</p>
          <button onClick={handleRemoveFile} className="button">
            Remover arquivo
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfAnalysis;
