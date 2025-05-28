import { PDFDocument, rgb } from "pdf-lib";
// @ts-expect-error - fontkit wymagany przez pdf-lib
import * as fontkit from "fontkit";
import type { FormValues } from "../../../components/home2/Home2.types";
import { createPageDrawer } from "./pdfLibHelpers";

export async function createPageTwo(
  backgroundPdfArrayBuffer: ArrayBuffer,
  fontArrayBuffer: ArrayBuffer,
  text: FormValues,
  oryginalCopy: boolean = true
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const backgroundPdf = await PDFDocument.load(backgroundPdfArrayBuffer);
  const [page] = await pdfDoc.copyPages(backgroundPdf, [0]);
  pdfDoc.addPage(page);
  const charmBoldFont = await pdfDoc.embedFont(fontArrayBuffer);
  const drawer = createPageDrawer(page, charmBoldFont, 15, rgb(0, 0, 0));

  //numer dokumentu
  let znaki = [...text.documentNumber];
  let startX = 104;
  let startY = 760.5;
  let charSpacing = 14.35;
  let fontSize = 15;
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
    start: oryginalCopy ? { x: 460, y: 760 } : { x: 420, y: 760 },
    end: oryginalCopy ? { x: 482, y: 760 } : { x: 455, y: 760 },
    thickness: 2,
    color: rgb(0, 0, 0), // Lepiej użyć czarnego (rgb(0,0,0))
  });

  //data
  const [year, month, day] = text.date.split("-");

  page.drawText(year, { x: 185, y: 728, font: charmBoldFont, size: 15 });
  page.drawText(month, { x: 140, y: 728, font: charmBoldFont, size: 15 });
  page.drawText(day, { x: 100, y: 728, font: charmBoldFont, size: 15 });

  //nazwa serwisu
  page.drawText(text.serviceName, {
    x: 70,
    y: 660,
    font: charmBoldFont,
    size: 15,
  });
  //adres serwisu
  drawer.drawWrapped(text.serviceAddress, 70, 637, 450);
  //imię i nazwiko technika pobierającego dane
  page.drawText(`${text.technicianFirstName}  ${text.technicianLastName}`, {
    x: 280,
    y: 582,
    font: charmBoldFont,
    size: 15,
  });
  //numer karty warsztatowej
  znaki = [...text.workshopCardNumber];
  startX = 191;
  startY = 555;
  charSpacing = 14.45;
  fontSize = 15;

  for (let i = 0; i < 16; i++) {
    page.drawText(znaki[i] || "", {
      x: startX + i * charSpacing,
      y: startY,
      size: fontSize,
      font: charmBoldFont,
      color: rgb(0, 0, 0),
    });
  }

  //marka pojazdu
  page.drawText(text.vehicleBrand, {
    x: 100,
    y: 501,
    font: charmBoldFont,
    size: 15,
  });
  //model pojazdu
  page.drawText(text.vehicleModel, {
    x: 365,
    y: 501,
    font: charmBoldFont,
    size: 15,
  });
  //numer vrn
  page.drawText(text.vehicleVRN, {
    x: 130,
    y: 466,
    font: charmBoldFont,
    size: 15,
  });
  //numer vin
  znaki = [...text.vehicleVin];
  startX = 292.5;
  startY = 467;
  charSpacing = 14.45;
  fontSize = 15;

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
  //marka tachografu
  drawer.drawWrapped(text.tachoBrand, 100, 404, 400);
  //numer tachografu
  page.drawText(text.tachoSerial, {
    x: 140,
    y: 382,
    font: charmBoldFont,
    size: 15,
  });
  //rok produkcji tachografu
  page.drawText(text.tachoYear, {
    x: 370,
    y: 382,
    font: charmBoldFont,
    size: 15,
  });
  //nazwa firmy
  drawer.drawWrapped(text.companyName, 70, 325, 450);
  //adres fimry
  drawer.drawWrapped(text.address, 70, 302, 450);
  //imię i nazwisko
  drawer.drawWrapped(`${text.firstName}  ${text.lastName}`, 70, 270, 450);
  //podstawa wniosku powód wniosku
  drawer.drawWrapped(text.dataReason, 70, 218, 450);
  return await pdfDoc.save();
}
