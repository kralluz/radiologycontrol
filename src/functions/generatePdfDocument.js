import { jsPDF } from 'jspdf';

const generatePdfDocument = (records, pdfResults, contrastEvents) => {const doc = new jsPDF();
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
        doc.text('Eventos Adversos:', marginLeft, yOffset);
        yOffset += 10;
      
        contrastEvents.forEach((event) => {
          doc.setFontSize(12);
          doc.text(`Tipo de Evento: ${event.eventType}`, marginLeft, yOffset);
          yOffset += 7;
          doc.text(`Data: ${event.occurrenceDate}`, marginLeft, yOffset);
          yOffset += 7;
          doc.text(`ID do Paciente: ${event.patientId}`, marginLeft, yOffset);
          yOffset += 7;
          doc.text(`Nome: ${event.patientFirstName}`, marginLeft, yOffset);
          yOffset += 7;
      
          // Adicionar tabulação ao relatório
          const tabulation = '    '; // Quatro espaços como tabulação
          const reportLines = doc.splitTextToSize(tabulation + event.report, 180); // Ajuste a largura conforme necessário
      
          doc.text('Relatório:', marginLeft, yOffset);
          yOffset += 7;
          reportLines.forEach((line) => {
            doc.text(line, marginLeft, yOffset);
            yOffset += 7;
          });
      
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

    doc.save('relatorio_procedimentos.pdf')
};

export default generatePdfDocument;