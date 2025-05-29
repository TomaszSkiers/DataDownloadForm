//generowanie pdfa za pomocą pdfLib - pobieranie na komputer

const handleCreatePdf = async () => {
  const blob = await generatePdf("Przykładowy tekst");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nowy.pdf";
  a.click();
  URL.revokeObjectURL(url);
};

//generowanie pdfa za pomocą pdfLib - otwieranie w nowym oknie przeglądarki

const handleGeneratePdf = async (data: FormValues) => {
  try {
    const pdfUrl = await generatePdfCard(data);

    // Otwórz PDF w nowej karcie
    window.open(pdfUrl, "_blank");

    // Zwolnienie pamięci po 10 sekundach (opcjonalne)
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
  } catch (error) {
    console.error("Błąd podczas generowania PDF:", error);
  }
};

<Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={() => {
    const formData = getValues();
    handleGeneratePdf(formData);
  }}
>
  Otwórz PDF w nowej karcie
</Button>;
