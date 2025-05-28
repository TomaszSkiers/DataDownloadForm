import { PDFDocument, rgb } from "pdf-lib";
// @ts-expect-error - fontkit wymagany przez pdf-lib
import * as fontkit from "fontkit";
import type { FormValues } from "../../components/home2/Home2.types";

export async function generatePdfCard(text: FormValues): Promise<string> {
  const baseUrl = import.meta.env.BASE_URL;

  console.log(text.date)

  // 1. Pobieranie istniejącego PDF i czcionek
  const [existingPdfResponse, regularFontResponse, boldFontResponse] =
    await Promise.all([
      fetch(`${baseUrl}pokwitowanie.pdf`),
      fetch(`${baseUrl}fonts/Roboto-Regular.ttf`),
      fetch(`${baseUrl}fonts/Roboto-Bold.ttf`), 
    ]);

  // 2. Konwersja na ArrayBuffer
  const [existingPdfBytes, regularFontBytes, boldFontBytes] = await Promise.all(
    [
      existingPdfResponse.arrayBuffer(),
      regularFontResponse.arrayBuffer(),
      boldFontResponse.arrayBuffer(),
    ]
  );

  // 3. Ładowanie PDF i rejestracja fontkit
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  // 4. Osadzanie czcionek (DOPIERO PO UTWORZENIU pdfDoc)
  const [regularFont, boldFont] = await Promise.all([
    pdfDoc.embedFont(regularFontBytes),
    pdfDoc.embedFont(boldFontBytes),
  ]);

  const page = pdfDoc.getPages()[0];

  //* rysownie siatki ---------------------------

  const gridColor = rgb(0.8, 0.8, 0.8); // Szare linie
  const textColor = rgb(0.5, 0.5, 0.5); // Szary tekst
  const mainLineColor = rgb(0.6, 0.1, 0.1); // Czerwone główne linie

  // Główne linie co 72pt (1 cal)
  for (let x = 0; x <= 595; x += 50) {
    page.drawLine({
      start: { x, y: 0 },
      end: { x, y: 842 },
      thickness: 0.5,
      color: mainLineColor,
      opacity: 0.7,
    });
  }

  for (let y = 0; y <= 842; y += 50) {
    page.drawLine({
      start: { x: 0, y },
      end: { x: 595, y },
      thickness: 0.5,
      color: mainLineColor,
      opacity: 0.7,
    });
  }

  // Drobna siatka co 10pt
  for (let x = 0; x <= 595; x += 10) {
    page.drawLine({
      start: { x, y: 0 },
      end: { x, y: 842 },
      thickness: x % 50 === 0 ? 0.3 : 0.1, // Grubsze linie co 50pt
      color: gridColor,
      opacity: 0.5,
    });
  }

  for (let y = 0; y <= 842; y += 10) {
    page.drawLine({
      start: { x: 0, y },
      end: { x: 595, y },
      thickness: y % 50 === 0 ? 0.3 : 0.1,
      color: gridColor,
      opacity: 0.5,
    });
  }

  // Etykiety współrzędnych (co 50pt)
  for (let x = 0; x <= 595; x += 50) {
    for (let y = 0; y <= 842; y += 50) {
      if (x % 100 === 0 || y % 100 === 0) {
        // Tylko co 100pt dla czytelności
        page.drawText(`${x},${y}`, {
          x: x + 2,
          y: y - 2,
          size: 6,
          color: textColor,
        });
      }
    }
  }

  //* koniec rysowania siatki ------------------------------

 

  // Zapis i zwrócenie URL
  const pdfBytes = await pdfDoc.save();
  return URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
}
