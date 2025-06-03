import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import type { FormValues } from "./Home2.types";
import { formBoxSx } from "./Home2.styles";
import { saveToFile } from "../../functions/saveLoadFromComputer/saveToFile";
import { useRef } from "react";
import { defaultValues } from "./defaultValues";
import { exportPdf } from "../../functions/pdf/expPdf";
import { DocumentDataSection } from "./sections/DocumentDataSection";
import { PersonSection } from "./sections/PersonSection";
import { CompanySection } from "./sections/CompanySection";
import { TahographSection } from "./sections/TagographSection";
import { VehicleSection } from "./sections/VegicleSection";
import { DataInfoSection } from "./sections/DataInfoSection";
import { ServiceSection } from "./sections/ServiceSection";
import { openPdfInNewTab } from "../../functions/pdfLib/pages/openPdfInNewTab";
import { createHandleFileChange } from "../../functions/saveLoadFromComputer/handleFileChange";

//todo zrobić auto zapis do localStorage po każdej zmianie w formularzu
//żeby przejście z jednej sekcji do drugiej nie powodowało utraty danych

export default function Home2() {
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  //pobranie pliku .json i załadowanie wartości do formularza
  const handleFileChange = createHandleFileChange<FormValues>(
    reset,
    defaultValues,
    fileInputRef
  );

  return (
    <Box component="form" sx={formBoxSx}>
      <DocumentDataSection control={control} errors={errors} />
      <PersonSection control={control} errors={errors} />
      <CompanySection control={control} errors={errors} />
      <TahographSection control={control} errors={errors} />
      <VehicleSection control={control} errors={errors} />
      <DataInfoSection control={control} errors={errors} />
      <ServiceSection control={control} errors={errors} />

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          onClick={handleSubmit((data) => saveToFile(data))}
        >
          Zapisz na dysk
        </Button>

        <Button variant="outlined" component="label" fullWidth>
          Wczytaj z pliku
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Button>

        <Button
          variant="outlined"
          fullWidth
          color="success"
          onClick={() => {
            const formData = getValues();
            exportPdf(formData);
          }}
        >
          Generuj stary PDF
        </Button>

        <Button
          variant="outlined"
          color="success"
          fullWidth
          onClick={handleSubmit(openPdfInNewTab)}
        >
          Generuj nowy wniosek
        </Button>
      </Stack>
    </Box>
  );
}
