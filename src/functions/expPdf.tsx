// functions/exportPdf.ts
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

import { getWniosekContent, wniosekStyles } from "./wniosekPobranieContent"

export const exportPdf = (): void => {
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],
    defaultStyle: { font: "Roboto", fontSize: 12 },
    content: getWniosekContent(),
    styles: wniosekStyles,
  };

  pdfMake.createPdf(docDefinition).download("wniosek.pdf");
};
