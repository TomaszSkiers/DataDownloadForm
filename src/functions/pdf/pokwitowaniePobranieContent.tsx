import type { Content } from "pdfmake/interfaces";
import type { FormValues } from "../../components/home2/Home2.types";


/**
 * Funkcja generuje stronę pdf "Pokwitowanie przekazania danych z tachografu cyfrowego"
 * przyjmuje argument oryginał / kopia
 */

export function getPokwitowaniePrzekazaniaDanychContent(
  oryginalCopy: string,
  data: FormValues
): Content {
  return [
    // Nagłówek na środku
    {
      text: "Pokwitowanie przekazania danych z tachografu cyfrowego", // Nagłówek
      style: "header", // Odwołanie do stylu w pliku syylesForPdf.tsx
      alignment: "center",
      margin: [0, 0, 0, 20],
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
    //Nowa linia: wydane przez
    {
      text: [{ text: "Wydane przez" }],
      margin: [0, 0, 0, 10],
    },
    //Nowa linia: zmienna z adresem warsztatu
    {
      text: [{ text: data.serviceName, bold: true }],
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: imię i nazwisko technika pobierającego dane
    {
      text: [
        { text: "Imię i nazwisko technika pobierającego dane " },
        { text: data.technicianFirstName + ' ', bold: true }, 
        { text: data.technicianLastName, bold: true}
      ],
      margin: [0, 0, 0, 5],
    },
    //Nowa linia: numer karty warsztatowej
    {
      text: [
        { text: "Numer karty warsztatowej " },
        { text: data.workshopCardNumber, bold: true },
      ], 
      margin: [0, 0, 0, 10],
    },
    {
      canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
      margin: [0, 0, 0, 10],
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
    {
      canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
      margin: [0, 0, 0, 10],
    },
    //Nowa linia: właściciel danych z tachografu
    {
      text: [{ text: "Właściciel danych z tachografu" }],
      margin: [0, 0, 0, 10],
    },
    //Nowa linia: zmienna z adresem włąściciela - klienta
    {
      text: [{ text: data.companyName, bold: true }],
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: osoba która pobiera pokwitowanie
    {
      text: [{ text: data.firstName + ' ', bold: true },
        {text: data.lastName, bold: true}
      ],
      margin: [50, 0, 0, 20],
    },
    //nowa linia: przyczyna pobrania danych
    {
        text: [{text: 'Przyczyna pobrania danych'}],
        margin: [0,0,0,10],
    },
    //nowa linia: zmienna 'reason' - czyli dlaczego pobieramy
    {
        text: [{text: data.dataReason, bold: true}],
        margin: [50,0,0,0]
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
