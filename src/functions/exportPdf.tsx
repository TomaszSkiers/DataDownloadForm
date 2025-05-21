import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";          // Roboto z pl znakami

interface FormData {
  firstName: string;
  lastName: string;
  cardNumber?: string;       // numer karty kierowcy
  tachoNumber?: string;      // numer tachografu
  dateFrom?: string;         // zakres pobrania danych
  dateTo?: string;
  city?: string;             // miejscowość
}


export const exportPdf = (data: FormData) => {
  const today = new Date().toLocaleDateString("pl-PL");

  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],

    defaultStyle: { font: "Roboto", fontSize: 11 },

    content: [
      // --- nagłówek ---------------------------------------------------------
      {
        text: "POKWITOWANIE PRZEKAZANIA DANYCH Z TACHOGRAFU CYFROWEGO",
        style: "title",
        alignment: "center",
        margin: [0, 0, 0, 20],
      },

      // --- tabela danych ----------------------------------------------------
      {
        table: {
          headerRows: 0,
          widths: ["40%", "*"],
          body: [
            ["Imię i nazwisko kierowcy", `${data.firstName} ${data.lastName}`],
            ["Numer karty kierowcy", data.cardNumber ?? "–"],
            ["Numer tachografu", data.tachoNumber ?? "–"],
            [
              "Zakres dat pobrania",
              data.dateFrom && data.dateTo
                ? `${data.dateFrom} – ${data.dateTo}`
                : "–",
            ],
          ],
        },
        layout: "lightHorizontalLines",
      },

      { text: "\n\n" },

      // --- podpis -----------------------------------------------------------
      {
        columns: [
          { width: "*", text: " " },
          {
            width: "45%",
            stack: [
              { canvas: [{ type: "line", x1: 0, y1: 0, x2: 250, y2: 0 }] },
              {
                text: "podpis kierowcy",
                alignment: "center",
                margin: [0, 4, 0, 0],
                italics: true,
                fontSize: 10,
              },
            ],
          },
        ],
      },

      { text: "\n" },

      // --- miejsce i data ---------------------------------------------------
      {
        text: `Miejscowość i data: ${data.city ?? "………………"}, ${today}`,
        margin: [0, 20, 0, 0],
      },
    ],

    styles: {
      title: { fontSize: 14, bold: true },
    },
  };

  pdfMake.createPdf(docDefinition).download("pokwitowanie_tachograf.pdf");
};
