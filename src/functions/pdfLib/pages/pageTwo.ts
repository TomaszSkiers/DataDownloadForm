import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function createPageTwo(): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create(); // Nowy dokument PDF
  const page = pdfDoc.addPage([595.28, 841.89]); // Rozmiar A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // Czcionka

  // Inna treść na stronie 2
  page.drawText('Strona 2 - completely other context', { x: 50, y: 800, size: 24, font });

  // Zwracamy stronę jako plik w pamięci (Uint8Array)
  return await pdfDoc.save();
}
