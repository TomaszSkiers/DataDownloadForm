import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts"; // Roboto z pl znakami

interface FormData {
  firstName: string;
  lastName: string;
}

const number: string = "123/2025";
const date: string = "18.05.2025";
const personOwner: string = "Jan Kowalski";
const companyName: string =
  "Transport Miedzynarodowy Witold Przeciąg 00-488 Nowa Huta Stalowa ul. Stalowego Pręta 122 m. 44 NIP: 1112223344";

export const exportPdf = (data: FormData): void => {
  // 1. Definicja dokumentu PDF
  const docDefinition: TDocumentDefinitions = {
    // Ustawienia globalne strony
    pageSize: "A4", // rozmiar strony: A4
    pageOrientation: "portrait", // orientacja: pionowa (domyślna)
    pageMargins: [40, 60, 40, 60], // marginesy: lewy, górny, prawy, dolny (w punktach)

    // Domyślna czcionka dla całego dokumentu
    defaultStyle: {
      font: "Roboto", // Roboto obsługuje polskie znaki
      fontSize: 12,
    },

    // Treść dokumentu
    content: [
      // Nagłówek na środku
      {
        text: "Wniosek o pobranie danych z przyrządu rejestrującego", // Nagłówek
        style: "header", // Odwołanie do stylu 'header' poniżej
        alignment: "center", // Wyśrodkowanie tekstu
        margin: [0, 0, 0, 20], // Dodatkowy dolny margines (30pt)
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: Numer po lewej
      {
        columns: [
          // Lewa kolumna: Numer: [wartość]
          {
            width: "auto",
            text: [
              { text: "Numer: " }, // "Numer:" pogrubione
              { text: number, bold: true }, // wartość numeru (np. "001/2024")
            ],
            alignment: "left", // Do lewego marginesu (domyślnie)
            margin: [0, 0, 0, 10], // Dolny margines 10pt (odstęp od kolejnej sekcji)
          },
          // Prawa kolumna: "oryginał"
          {
            width: "*",
            text: "oryginał",
            alignment: "right", // Do prawego marginesu
            margin: [0, 0, 0, 10],
          },
        ],
      },
      //Nowa linia: data
      {
        text: [{ text: "Data: " }, { text: date, bold: true }],
        alignment: "left",
        margin: [0, 0, 0, 10],
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: Ja niżej podpisany
      {
        text: [
          { text: "Ja niżej podpisany: " },
          {
            text: "( Imię i nazwisko właściciela / osoby reprezentującej właściciela danych )",
            fontSize: 8,
          },
        ],
        margin: [0, 0, 0, 10],
      },
      
      //Nowa linia: imię i nazwisko właściciela lub osoby go reprezentującej
      {
        text: [{ text: personOwner, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 10],
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: występując w imieniu
      {
        text: [
          { text: "Występując w imieniu: " },
          { text: "( Nazwa i adres właściciela danych )", fontSize: 8 },
        ],
        alignment: "left",
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: nazwa właściciela danych
      {
        text: [{ text: companyName, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 10],
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: zwracam się z prośbą o pobranie danych z tachografu
      {
        text: [{text: 'Zwracam się z prośbą o pobranie danych z tachografu', bold: true, fontSize: 16}],
        alignment: "center",
        margin: [0,0,0,10]
      },
      

      //*koniec strony
    ],



    // Definicje stylów dla elementów content
    styles: {
      header: {
        fontSize: 18, // Większy rozmiar
        bold: true, // Pogrubienie
        // Możesz dodać więcej opcji, np. color, italics, letterSpacing
      },
    },
  };

  // 2. Tworzymy i pobieramy PDF
  pdfMake.createPdf(docDefinition).download("wniosek.pdf");
};
