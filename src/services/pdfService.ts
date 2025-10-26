// This tells TypeScript that these variables are globally available,
// as they are loaded from a <script> tag in index.html.
declare const jspdf: any;
declare const html2canvas: any;

export const generatePdf = async (element: HTMLElement, fileName: string) => {
  if (typeof jspdf === "undefined" || typeof html2canvas === "undefined") {
    alert(
      "PDF generation libraries are not loaded. Please check your internet connection and try again.",
    );
    return;
  }

  try {
    // Use html2canvas to capture the element
    const canvas = await html2canvas(element, {
      scale: 2, // Increase scale for better resolution
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    // Initialize jsPDF
    const { jsPDF } = jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    let imgWidth = pdfWidth;
    let imgHeight = imgWidth / ratio;
    let heightLeft = imgHeight;

    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // If content is longer than one page, add new pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Save the PDF
    pdf.save(`${fileName.replace(/ /g, "_")}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF.");
  }
};
