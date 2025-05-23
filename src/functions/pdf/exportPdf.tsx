import type { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts"; // Roboto z pl znakami

//! pirwszy próbny dokument !!!

const number: string = "123/2025";
const date: string = "18.05.2025";
const personOwner: string = "Jan Kowalski";
const companyName: string =
  "Transport Miedzynarodowy Witold Przeciąg 00-488 Nowa Huta Stalowa ul. Stalowego Pręta 122 m. 44 NIP: 1112223344";
const vehicleMake: string = "Mercedes Benz";
const serialNumber: string = "ADE00000234";
const yearOfProduction: string = "A23";
const tachoMake: string = "Stoneridge Electronics";
const vehicleModel: string = "Actros";
const vrnNumber: string = "WND 00345";
const vinNumber: string = "WDB1290483982934";
const downloadDataRange: string =
  "dane dotyczące czasu pracy za okres ostatnich trzech miesięcy, oraz dane zdarzeń i usterek tachografu, oraz dodatkowe dane zapisywanie w tachografie np: dane pozycji pojazdu";
const reason: string =
  "brak karty przedsiębiorstwa, dokument - dowód osobisty nr FGH 229900";



export const exportPdf = (): void => {
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
            margin: [0, 0, 20, 10],
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
        text: [
          {
            text: "Zwracam się z prośbą o pobranie danych z tachografu",
            bold: true,
            fontSize: 16,
          },
        ],
        alignment: "center",
        margin: [0, 0, 0, 15],
      },
      //Nowa linia: dane tachografu
      {
        text: [{ text: "Dane tachografu:", bold: true }],
        alignment: "left",
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: Marka
      {
        text: [{ text: "Marka: " }, { text: tachoMake, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 5],
      },
      //Nowa linia: Numer seryjny
      {
        text: [{ text: "Numer seryjny: " }, { text: serialNumber, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 5],
      },
      //Nowa linia: Rok produkcji
      {
        text: [
          { text: "Rok produkcji: " },
          { text: yearOfProduction, bold: true },
        ],
        alignment: "left",
        margin: [50, 0, 0, 10],
      },
      //Nowa linia: Dane pojazdu
      {
        text: [{ text: "Dane pojazdu:", bold: true }],
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: Marka pojazdu
      {
        text: [{ text: "Marka pojazdu: " }, { text: vehicleMake, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 5],
      },
      //Nowa linia: Model
      {
        text: [{ text: "Model pojazdu: " }, { text: vehicleModel, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 5],
      },
      //Nowa linia: Numer VRN
      {
        text: [{ text: "Numer VRN: " }, { text: vrnNumber, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 5],
      },
      //Nowa linia: Numer VIN
      {
        text: [{ text: "Numer VIN: " }, { text: vinNumber, bold: true }],
        alignment: "left",
        margin: [50, 0, 0, 10],
      },
      //Nowa linia: W zakresie (rodzaj pobieranych danych oraz okres, którego dotyczy)
      {
        text: [
          { text: "W zakresie: ", bold: true },
          {
            text: "( Rodzaj pobieranych danych oraz okres, którego dotyczy )",
            fontSize: 8,
          },
        ],
        alignment: "left",
        margin: [0, 0, 0, 10],
      },
      //Nowa linia: rodzaj i zakres pobieranych danych
      {
        text: [{ text: downloadDataRange, bold: true }],
        margin: [50, 0, 0, 30],
      },
      //Nowa linia: Z wnioskiem o prbranie danych występuję na podstawie (podstawa prawna wniosku / dokument tożsamości wnioskodawcy)
      {
        text: [
          {
            text: "Z wnioskiem o pobranie danych występuję na podstawie",
            bold: true,
          },
        ],
        margin: [0, 0, 0, 1],
      },
      //Nowa linia:
      {
        text: [
          {
            text: "( Podstawa prawna wniosku / dokument toźsamości wnioskodawcy )",
            fontSize: 8,
          },
        ],
        margin: [0, 0, 0, 5],
      },
      //Nowa linia: np: z powodu braku karty przedsiębiorcy
      {
        text: [{ text: reason, bold: true }],
        margin: [50, 0, 0, 10],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0, // szerokość A4 pomniejszona o marginesy (595 - 2×40)
            lineWidth: 1,
          },
        ],
        absolutePosition: { x: 40, y: 697 }, // x: margines lewy, y: wyliczone powyżej
      },

      // podpis technika - zaraz nad dolnym marginesem, wyrównany do prawej
      {
        text: "podpis technika",
        fontSize: 10,
        alignment: "left", // przy prawym marginesie
        absolutePosition: {
          x: 400, // lewy margines (start elementu, alignment załatwia resztę)
          y: 842 - 80, // wysokość strony - dolny margines - wysokość tekstu (18pt = ok. 12pt fontu + zapas)
        },
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
