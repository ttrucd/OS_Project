import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (results, ChartRefs, tableRef, progressRef) => {
  if (!results || results.length === 0) {
    console.error("No results available for export.");
    return;
  }

  const doc = new jsPDF("p", "mm", "a4"); // A4 size
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yOffset = 10; // Start position for content

  // Function to check if we need to add a new page
  const checkPage = (contentHeight) => {
    if (yOffset + contentHeight > pageHeight - 20) {
      doc.addPage();
      yOffset = 10;
    }
  };

  // Loop through results and capture chart and other data
  for (let i = 0; i < results.length; i++) {
    const currentResult = results[i]; // Renaming this variable to avoid conflict

    // Add algorithm name to the PDF
    doc.setFontSize(14);
    doc.text(`Algorithm: ${currentResult.algorithm.toUpperCase()}`, 10, yOffset);
    yOffset += 8;

    // Capture Bar Chart
    const chartRef = ChartRefs[i]; // Fix chartRef variable name
    if (chartRef && chartRef.current) {
      const chartCanvas = chartRef.current.querySelector("canvas"); // Get canvas elements
      if (chartCanvas) {
        const chartImg = chartCanvas.toDataURL("image/png");

        checkPage(110); // Check if we need a new page before adding the image
        doc.addImage(chartImg, "PNG", 10, yOffset, pageWidth - 20, 90);
        yOffset += 100; // Move the Y offset for the next content
      } else {
        console.warn(`Chart not found for algorithm: ${currentResult.algorithm}`);
      }
    }

    // Capture Results Table
    if (tableRef.current) {
      try {
        const tableCanvas = await html2canvas(tableRef.current, { scale: 2 });
        const imgData = tableCanvas.toDataURL("image/png");

        checkPage(110); // Ensure enough space for the table
        doc.addImage(imgData, "PNG", 10, yOffset, pageWidth - 20, 90);
        yOffset += 100; // Move the Y offset for the next content
      } catch (error) {
        console.error("Error capturing results table:", error);
      }
    }

    // Capture Progress Bar
    if (progressRef.current) {
      try {
        const progressCanvas = await html2canvas(progressRef.current, { scale: 2 });
        const imgData = progressCanvas.toDataURL("image/png");

        checkPage(50); // Ensure enough space for the progress bar
        doc.addImage(imgData, "PNG", 10, yOffset, pageWidth - 20, 30);
        yOffset += 40;
      } catch (error) {
        console.error("Error capturing progress bar:", error);
      }
    }

    yOffset += 10; // Space before the next algorithm
  }

  // Save the generated PDF
  doc.save("results.pdf");
};
