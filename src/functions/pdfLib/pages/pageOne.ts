import { PDFDocument, rgb } from "pdf-lib";
// @ts-expect-error - fontkit wymagany przez pdf-lib
import * as fontkit from "fontkit";
import type { FormValues } from "../../../components/home2/Home2.types";


export async function createPageOne(
  backgroundPdfArrayBuffer: ArrayBuffer,
  fontArrayBuffer: ArrayBuffer,
  text: FormValues
): Promise<Uint8Array> {
  // 1. Tworzymy nowy dokument PDF
  const pdfDoc = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit); // <<< TO JEST KLUCZOWE!

  // 2. Ładujemy PDF z tłem
  const backgroundPdf = await PDFDocument.load(backgroundPdfArrayBuffer);

  // 3. Kopiujemy stronę z tłem do nowego dokumentu
  const [page] = await pdfDoc.copyPages(backgroundPdf, [0]); // bierzemy pierwszą stronę z tła
  pdfDoc.addPage(page);

  // 4. Wstrzykujemy font Lato
  const charmBoldFont = await pdfDoc.embedFont(fontArrayBuffer);

 

  // 4. Na tej stronie dodajemy nasz tekst
  const znaki = [...text.documentNumber];

  //todo NUMER DOKUMENTU
  const startX = 104;
  const startY = 752.5;
  const charSpacing = 14.35; // Odstęp między znakami
  const fontSize = 15;

  // Rysowanie wszystkich 8 znaków w pętli
  for (let i = 0; i < 8; i++) {
    page.drawText(znaki[i] || "", {
      // || '' zabezpiecza przed undefined
      x: startX + i * charSpacing,
      y: startY,
      size: fontSize,
      font: charmBoldFont, // Używamy pogrubionej czcionki
      color: rgb(0, 0, 0), // Czarny kolor
    });
  }

  //TODO ORYGINAŁ
  page.drawLine({
    start: { x: 460, y: 753 },
    end: { x: 482, y: 753 },
    thickness: 2,
    color: rgb(0, 0, 0), // Lepiej użyć czarnego (rgb(0,0,0))
  });

  //TODO DATA - ROK
  const [year, month, day] = text.date.split("-");

  page.drawText(year, { x: 185, y: 720, font: charmBoldFont, size: 15 });
  page.drawText(month, {x: 140, y: 720, font: charmBoldFont, size: 15 });
  page.drawText(day, {x: 100, y: 720, font: charmBoldFont, size: 15})

  //TODO JA NIŻEJ PODPISANY 

  page.drawText(text.firstName + '  ' + text.lastName,{x: 100, y: 661, font: charmBoldFont, size: 15})

  return await pdfDoc.save();
}

//* przy ustawianiu tła strony kopiowane są jej wymiary i ten kod jest już nie potrzebny
// const page = pdfDoc.addPage([595.28, 841.89]);
// const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
// page.drawText('Strona 1 - witaj Tomasz', {x: 50, y: 800, size: 24, font});
