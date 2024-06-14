import React, { useState } from "react";
import "./PdfAnalysis.css"; // Arquivo de estilos para PdfAnalysis

function PdfAnalysis({ setPdfResults }) {
  const [analysisResults, setAnalysisResults] = useState("");
  const [tcCount, setTcCount] = useState(0); // Estado para contar as ocorrências de 'TC'
  const [rxCount, setRxCount] = useState(0); // Estado para contar as ocorrências de 'RX'
  const [lombarFemurCount, setLombarFemurCount] = useState(0); // Conta 'do coluna lombar e do fêmur'
  const [corpoInteiroCount, setCorpoInteiroCount] = useState(0); // Conta 'do corpo inteiro'

  const processPDF = (file) => {
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
            setTcCount(tcTotalCount); // Atualiza o contador de 'TC' no estado
            setRxCount(rxTotalCount); // Atualiza o contador de 'RX' no estado
            setLombarFemurCount(lombarFemurTotalCount); // Atualiza o contador para 'do coluna lombar e do fêmur'
            setCorpoInteiroCount(corpoInteiroTotalCount); // Atualiza o contador para 'do corpo inteiro'
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

  return (
    <div
      className="drop_zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p>
        Arraste seu arquivo PDF aqui ou clique no botão abaixo para escolher o
        arquivo
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
      {analysisResults && (
        <div className="analysis-results">
          <p>Tomografias realizadas: {tcCount}</p>{" "}
          {/* Exibe o contador de 'TC' */}
          <p>Raio-x realizados: {rxCount}</p> {/* Exibe o contador de 'RX' */}
          <p>
            Desitometrias ralizadas: {lombarFemurCount + corpoInteiroCount}
          </p>{" "}
          {/* Exibe o contador de 'do coluna lombar e do fêmur' */}
        </div>
      )}
    </div>
  );
}

export default PdfAnalysis;
