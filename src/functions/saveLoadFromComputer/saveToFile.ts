// Prosty, wielokrotnego użytku util do zapisywania danych jako plik JSON (lub inny)
export function saveToFile(
  data: unknown,
  fileName: string = "data.json",
  mimeType: string = "application/json"
) {
  const fileData = mimeType === "application/json"
    ? JSON.stringify(data, null, 2)
    : String(data);

  const blob = new Blob([fileData], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
