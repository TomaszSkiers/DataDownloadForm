import { PDFDocument, rgb } from 'pdf-lib';
// @ts-expect-error it must be that
import * as fontkit from 'fontkit';


export async function generatePdf(text: string): Promise<Blob> {
  const baseUrl = import.meta.env.BASE_URL;
  const existingPdfBytes = await fetch(`${baseUrl}wniosek.pdf`).then(res => res.arrayBuffer());
  const fontBytes = await fetch(`${baseUrl}fonts/Roboto-Regular.ttf`).then(res => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const firstPage = pdfDoc.getPages()[0];
  const customFont = await pdfDoc.embedFont(fontBytes);

  firstPage.drawText(text, {
    x: 200,
    y: 400,
    size: 24,
    font: customFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
