import type { Content } from "pdfmake/interfaces";

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
const reason: string =
  "brak karty przedsiębiorstwa, dokument - dowód osobisty nr FGH 229900";
const workshopData: string =
  "Tacho - Tech Bartosz Skierś 05-120 Skrzeszew ul. Nowodworska 1a";
const technicansName: string = "Bartosz Skierś";
const cardNumber: string = "9876345623239090";

/**
 * Funkcja generuje stronę pdf "Pokwitowanie przekazania danych z tachografu cyfrowego"
 * przyjmuje argument oryginał / kopia
 */

export function getPokwitowaniePrzekazaniaDanychContent(
  oryginalCopy: string
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
            { text: number, bold: true }, // wartość numeru (np. "001/2024")
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
      text: [{ text: "Data: " }, { text: date, bold: true }],
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
      text: [{ text: workshopData, bold: true }],
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: imię i nazwisko technika pobierającego dane
    {
      text: [
        { text: "Imię i nazwisko technika pobierającego dane: " },
        { text: technicansName, bold: true }, //* tu trzeba będzie przekazać odpowiednie dane ! bo techników będzie więcej
      ],
      margin: [0, 0, 0, 5],
    },
    //Nowa linia: numer karty warsztatowej
    {
      text: [
        { text: "Numer karty warsztatowej: " },
        { text: cardNumber, bold: true },
      ], //* tu trzeba przekazać odpowiedni nr
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
      text: [{ text: companyName, bold: true }],
      margin: [50, 0, 0, 5],
    },
    //Nowa linia: osoba która pobiera pokwitowanie
    {
      text: [{ text: personOwner, bold: true }],
      margin: [50, 0, 0, 20],
    },
    //nowa linia: przyczyna pobrania danych
    {
        text: [{text: 'Przyczyna pobrania danych'}],
        margin: [0,0,0,10],
    },
    //nowa linia: zmienna 'reason' - czyli dlaczego pobieramy
    {
        text: [{text: reason, bold: true}],
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
