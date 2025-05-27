import { createPageOne } from "./pageOne";
import { createPageTwo } from "./pageTwo";
import { margePages } from "./mergePages";

const baseUrl = import.meta.env.BASE_URL;

// funkcja do pobierania pliku tła z public
const fetchBackgroundPdf = async () => {
  const response = await fetch(`${baseUrl}wniosek.pdf`);
  return await response.arrayBuffer();
};

// funkcja do pobierania fonta np: lato
const fetchLatoFont = async () => {
  const response = await fetch(`${baseUrl}fonts/Roboto-Regular.ttf`);
  return await response.arrayBuffer();
};

export const openPdfInNewTab = async () => {
  const backgroundArrayBuffer = await fetchBackgroundPdf();
  const latoFont = await fetchLatoFont();
  const page1 = await createPageOne(backgroundArrayBuffer, latoFont);
  const page2 = await createPageTwo();
  const mergedPdf = await margePages([page1, page2]);

  const blob = new Blob([mergedPdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  // Otwieramy PDF w nowym oknie/kartcie
  window.open(url, "_blank");

  // UWAGA: nie wywołuj od razu URL.revokeObjectURL(url), bo PDF się nie wyświetli
  // Możesz posprzątać później (np. po kilku sekundach, ale nie jest to konieczne natychmiast)
  // setTimeout(() => URL.revokeObjectURL(url), 10000);
};
