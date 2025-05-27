import { PDFDocument, rgb } from "pdf-lib";
// @ts-expect-error - fontkit wymagany przez pdf-lib
import * as fontkit from "fontkit";
import type { FormValues } from "../../../components/home2/Home2.types";
import { createPageDrawer } from "./pdfLibHelpers";

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

  // 5. Tworzymy drawera
  const drawer = createPageDrawer(page, charmBoldFont, 15, rgb(0, 0, 0));

  // 6. Na tej stronie dodajemy nasz tekst
  let znaki = [...text.documentNumber];

  //numer dokumentu
  let startX = 104;
  let startY = 752.5;
  let charSpacing = 14.35; // Odstęp między znakami
  let fontSize = 15;

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
  //oryginał/kopia
  page.drawLine({
    start: { x: 460, y: 753 },
    end: { x: 482, y: 753 },
    thickness: 2,
    color: rgb(0, 0, 0), // Lepiej użyć czarnego (rgb(0,0,0))
  });
  //data
  const [year, month, day] = text.date.split("-");

  page.drawText(year, { x: 185, y: 720, font: charmBoldFont, size: 15 });
  page.drawText(month, { x: 140, y: 720, font: charmBoldFont, size: 15 });
  page.drawText(day, { x: 100, y: 720, font: charmBoldFont, size: 15 });
  //imię i nazwisko
  drawer.drawWrapped(`${text.firstName}  ${text.lastName}`, 100, 661, 400);
  //nazwa firmy
  drawer.drawWrapped(text.companyName, 100, 588, 400);
  //marka tachografu
  drawer.drawWrapped(text.tachoBrand, 100, 475, 400);
  //numer tachografu
  page.drawText(text.tachoSerial, {
    x: 140,
    y: 446,
    font: charmBoldFont,
    size: 15,
  });
  //rok produkcji tachografu
  page.drawText(text.tachoYear, {
    x: 370,
    y: 446,
    font: charmBoldFont,
    size: 15,
  });
  //marka pojazdu
  page.drawText(text.vehicleBrand, {
    x: 100,
    y: 400,
    font: charmBoldFont,
    size: 15,
  });
  //model pojazdu
  page.drawText(text.vehicleModel, {
    x: 365,
    y: 400,
    font: charmBoldFont,
    size: 15,
  });
  //numer vrn
  page.drawText(text.vehicleVRN, {
    x: 130,
    y: 364,
    font: charmBoldFont,
    size: 15,
  });
  //numer vin
  znaki = [...text.vehicleVin];
  startX = 294;
  startY = 366;
  charSpacing = 14.35; // Odstęp między znakami
  fontSize = 15;

  // Rysowanie wszystkich 8 znaków w pętli
  for (let i = 0; i < 17; i++) {
    page.drawText(znaki[i] || "", {
      // || '' zabezpiecza przed undefined
      x: startX + i * charSpacing,
      y: startY,
      size: fontSize,
      font: charmBoldFont, // Używamy pogrubionej czcionki
      color: rgb(0, 0, 0), // Czarny kolor
    });
  }

  //zakres pobieranych danych
  page.drawText(text.dataScope, {x: 100, y: 315, font: charmBoldFont, size:15})
  //rodzaj pobieranych danych
  drawer.drawWrapped(text.dataType, 100, 293, 400)
  //podstawa wniosku powód wniosku
  drawer.drawWrapped(text.dataReason, 100,195,400)

  return await pdfDoc.save();
}

//* przy ustawianiu tła strony kopiowane są jej wymiary i ten kod jest już nie potrzebny
// const page = pdfDoc.addPage([595.28, 841.89]);
// const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
// page.drawText('Strona 1 - witaj Tomasz', {x: 50, y: 800, size: 24, font});
//473
