
import type { FormValues } from "../../components/home2/Home2.types";
import { generateFileName } from "../other/filenameUtils";

// Prosty, wielokrotnego użytku util do zapisywania danych jako plik JSON (lub inny)
export function saveToFile(
  data: FormValues,
  //   fileName: string = "data.json",
  mimeType: string = "application/json"
) {
  const fileData =
    mimeType === "application/json"
      ? JSON.stringify(data, null, 2)
      : String(data);

  const fileName = generateFileName(data);
  console.log('nazwa pliku',fileName)

  const blob = new Blob([fileData], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName; //* <-nazwa pliku
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
