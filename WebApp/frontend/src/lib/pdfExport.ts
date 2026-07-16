import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportElementAsPdf(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    backgroundColor: "#05080d",
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height + 120],
  });

  pdf.setFillColor(5, 8, 13);
  pdf.rect(0, 0, canvas.width, canvas.height + 120, "F");

  pdf.setTextColor(34, 211, 238);
  pdf.setFontSize(26);
  pdf.text("HistoDx AI — Diagnostic Report", 32, 48);

  pdf.setTextColor(139, 162, 189);
  pdf.setFontSize(12);
  pdf.text(`Generated ${new Date().toLocaleString()}`, 32, 72);
  pdf.text("Research prototype — not a certified diagnostic device.", 32, 92);

  pdf.addImage(imgData, "PNG", 0, 120, canvas.width, canvas.height);
  pdf.save(filename);
}
