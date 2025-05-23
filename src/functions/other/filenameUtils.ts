// filenameUtils.ts

/**
 * Usuwa polskie znaki z tekstu
 * @param str - tekst wejściowy
 * @returns tekst bez polskich znaków
 */
export function removePolishChars(str: string): string {
  return str
    .replace(/[ąĄ]/g, 'a')
    .replace(/[ćĆ]/g, 'c')
    .replace(/[ęĘ]/g, 'e')
    .replace(/[łŁ]/g, 'l')
    .replace(/[ńŃ]/g, 'n')
    .replace(/[óÓ]/g, 'o')
    .replace(/[śŚ]/g, 's')
    .replace(/[źŹżŻ]/g, 'z');
}

/**
 * Czyści nazwę pliku z niedozwolonych znaków, zamienia spacje i usuwa polskie znaki
 * @param str - tekst wejściowy
 * @returns wyczyszczony tekst do użycia jako część nazwy pliku
 */
export function cleanFileName(str: string): string {
  return removePolishChars(str)
    .replace(/[\\/:*?"<>|]/g, '')   // znaki niedozwolone w Windows
    .replace(/\s+/g, '_')           // zamiana spacji na podkreślenia
    .replace(/,+/g, '')             // usunięcie przecinków
    .replace(/\.+/g, '.')           // jedna kropka
    .replace(/_+/g, '_');           // pojedyncze podkreślenia
}


/**
 * Generuje nazwę pliku na podstawie przekazanego obiektu (zgodnie z ustalonym formatem)
 * @param obj - obiekt z danymi dokumentu
 * @returns gotowa, bezpieczna nazwa pliku z rozszerzeniem .json
 */
export function generateFileName(obj: {
  documentNumber: string;
  vehicleVRN: string;
  date: string;
  companyName: string;
}): string {
  const { documentNumber, vehicleVRN, date, companyName } = obj;
  return (
    `${cleanFileName(documentNumber)}__` +
    `${cleanFileName(vehicleVRN)}__` +
    `${cleanFileName(date)}__` +
    `${cleanFileName(companyName)}.json`
  );
}
