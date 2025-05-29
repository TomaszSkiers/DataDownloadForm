//pdf-Lib pobieranie pliku na dysk

import { createPageOne } from "../functions/pdfLib/pages/pageOne";
import { createPageTwo } from "../functions/pdfLib/pages/pageTwo";
import { margePages } from "../functions/pdfLib/pages/mergePages";

export const handleDownload = async () => {
  const page1 = await createPageOne();
  const page2 = await createPageTwo();
  const mergedPdf = await margePages([page1, page2]);

  const blob = new Blob([mergedPdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "połączony.pdf";
  link.click();
  URL.revokeObjectURL(url);
};

//podłączam sobie to funkcję w komponencie pod przycisk
//alw co jak chcę przekazać obiekt z danymi?
//czyli dodać argumenty do funkcji createPageOne i handleDownload
