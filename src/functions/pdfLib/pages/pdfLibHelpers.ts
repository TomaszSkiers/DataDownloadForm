import type { PDFPage, PDFFont, RGB } from "pdf-lib";

// Helper do wrapowania tekstu (dzieli na linie do szerokości i po enterach)
function wrapTextToLines(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(' ');
    let line = '';

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

export function createPageDrawer(
  page: PDFPage,
  font: PDFFont,
  fontSize = 15,
  color?: RGB
) {
  return {
    // drawWrapped jest teraz domyślną i uniwersalną metodą do rysowania tekstu
    drawWrapped: (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      opts: { size?: number; color?: RGB; lineHeight?: number } = {}
    ) => {
      const size = opts.size ?? fontSize;
      const lines = wrapTextToLines(text, font, size, maxWidth);
      const lineHeight = opts.lineHeight ?? size + 7;

      lines.forEach((line, idx) => {
        page.drawText(line, {
          x,
          y: y - idx * lineHeight,
          font,
          size,
          ...(opts.color ? { color: opts.color } : color ? { color } : {}),
        });
      });
    },
    page, // dostęp do surowej strony dla innych metod, np. drawLine
  };
}


