// functions/exportPdf.ts
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

import { getWniosekContent } from "./wniosekPobranieContent"
import { getPokwitowaniePrzekazaniaDanychContent } from "./pokwitowaniePobranieContent";
import { wniosekStyles } from "./stylesForPdf";
import type { FormValues } from "../../components/home2/Home2.types";

//! tu trzeba przekazać obiekt z informacjami do drukowania a nie zmienne w plikach

export const exportPdf = (data: FormValues): void => { //tu przekazuję obiekt z danymi
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],
    defaultStyle: { font: "Roboto", fontSize: 12 },
    content: [
        getWniosekContent('oryginał', data),
        { text: "", pageBreak: "before" }, // przerwa na nową stronę
        getWniosekContent('kopia', data),
        { text: "", pageBreak: "before" },
        getPokwitowaniePrzekazaniaDanychContent('oryginał'),
        {text: '', pageBreak: 'before'},
        getPokwitowaniePrzekazaniaDanychContent('kopia')
    ],
    styles: wniosekStyles,
  };

  pdfMake.createPdf(docDefinition).download("wniosek.pdf");
};
