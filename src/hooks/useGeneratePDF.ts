import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const useGeneratePDF = (elementId: string) => {
  const generatePDF = async () => {
    const input = document.getElementById(elementId);
    if (!input) return;

    try {
      // Captura o conteúdo do elemento como imagem usando html2canvas
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // Largura da página A4 em mm
      const pageHeight = 295; // Altura da página A4 em mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Adiciona a primeira imagem ao PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Caso a imagem seja maior que uma página, adiciona novas páginas
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Gera o arquivo Blob do PDF
      const pdfBlob = pdf.output("blob");

      // Cria uma URL Blob e força o download
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "resultados.pdf";

      // Adiciona rel para evitar vulnerabilidades
      link.rel = "noopener noreferrer";

      // Anexa o link temporariamente no DOM, clica nele e remove em seguida
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoga a URL do Blob após o download para liberar memória
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return generatePDF;
};

