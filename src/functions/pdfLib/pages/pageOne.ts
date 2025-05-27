import { PDFDocument } from "pdf-lib";
// @ts-expect-error - fontkit wymagany przez pdf-lib
import * as fontkit from "fontkit";

export async function createPageOne(
  backgroundPdfArrayBuffer: ArrayBuffer,
  latoFontArrayBuffer: ArrayBuffer
): Promise<Uint8Array> {
  // 1. Tworzymy nowy dokument PDF
  const pdfDoc = await PDFDocument.create();


  pdfDoc.registerFontkit(fontkit); // <<< TO JEST KLUCZOWE!

  // 2. Ładujemy PDF z tłem
  const backgroundPdf = await PDFDocument.load(backgroundPdfArrayBuffer);

  // 3. Kopiujemy stronę z tłem do nowego dokumentu
  const [backgroundPage] = await pdfDoc.copyPages(backgroundPdf, [0]); // bierzemy pierwszą stronę z tła
  pdfDoc.addPage(backgroundPage);

  // 4. Wstrzykujemy font Lato
  const latoFont = await pdfDoc.embedFont(latoFontArrayBuffer);

  // 4. Na tej stronie dodajemy nasz tekst

  backgroundPage.drawText("'Zażółć gęślą jaźń! – Strona 1, Tomasz'", {
    x: 50,
    y: 800,
    size: 24,
    font: latoFont,
  });

  return await pdfDoc.save();
}


//* przy ustawianiu tła strony kopiowane są jej wymiary i ten kod jest już nie potrzebny
// const page = pdfDoc.addPage([595.28, 841.89]);
// const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
// page.drawText('Strona 1 - witaj Tomasz', {x: 50, y: 800, size: 24, font});
