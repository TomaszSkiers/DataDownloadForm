import type { Content } from "pdfmake/interfaces";
import type { FormValues } from "../../components/home2/Home2.types";


/**
 * Funkcja generuje stronę pdf "Wniosek o pobranie danych z tachografu cyfrowego"
 * przyjmuje argument oryginał / kopia
 */


export function getWniosekContent(oryginalCopy: string, data: FormValues): Content {
  return [
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
            { text: data.documentNumber, bold: true }, // wartość numeru (np. "001/2024")
          ],
          margin: [0, 0, 0, 10], // Dolny margines 10pt (odstęp od kolejnej sekcji)
        },
        // Prawa kolumna: "oryginał"
        {
          width: "*",
          text: oryginalCopy,
          bold: true,
          alignment: "right", // Do prawego marginesu
          margin: [0, 0, 20, 10],
        },
      ],
    },
    //Nowa linia: data
    {
      text: [{ text: "Data: " }, { text: data.date, bold: true }],
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
      text: [{ text: data.firstName + ' ', bold: true }, {text: data.lastName, bold: true}],
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
      text: [{ text: data.companyName, bold: true }],
      alignment: "left",
      margin: [50, 0, 0, 5],
    },
    {
      text: [{ text: data.address, bold: true }],
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
      text: [{ text: "Marka: " }, { text: data.tachoBrand, bold: true }],
      alignment: "left",
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: Numer seryjny
    {
      text: [{ text: "Numer seryjny: " }, { text: data.tachoSerial, bold: true }],
      alignment: "left",
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: Rok produkcji
    {
      text: [
        { text: "Rok produkcji: " },
        { text: data.tachoYear, bold: true },
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
      text: [{ text: "Marka pojazdu: " }, { text: data.vehicleBrand, bold: true }],
      alignment: "left",
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: Model
    {
      text: [{ text: "Model pojazdu: " }, { text: data.vehicleModel, bold: true }],
      alignment: "left",
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: Numer VRN
    {
      text: [{ text: "Numer VRN: " }, { text: data.vehicleVRN, bold: true }],
      alignment: "left",
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: Numer VIN
    {
      text: [{ text: "Numer VIN: " }, { text: data.vehicleVin, bold: true }],
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
      text: [{ text: data.dataScope, bold: true }],
      margin: [50, 0, 0, 5],
    },
    {
      text: [{ text: data.dataType, bold: true }],
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
      text: [{ text: data.dataReason, bold: true }],
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
  ];
}

