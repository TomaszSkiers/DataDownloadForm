import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { FormValues } from "./Home2.types";
import { formBoxSx } from "./Home2.styles";
import { saveToFile } from "../../functions/saveLoadFromComputer/saveToFile";
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
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Stan do obsługi dialogu informacyjnego
  const [openDialog, setOpenDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sprawdź obecność danych w localStorage przy starcie i załaduj je do formularza
  useEffect(() => {
    const stored = localStorage.getItem("serviceSettings");
    if (!stored) {
      setOpenDialog(true);
    } else {
      try {
        const parsed = JSON.parse(stored);
        reset({
          ...getValues(), // zachowaj aktualne wartości innych pól
          serviceName: parsed.serviceName || "",
          serviceAddress: parsed.serviceAddress || "",
        });
      } catch {
        setOpenDialog(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

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
      <TahographSection control={control} errors={errors} setValue={setValue} />
      <VehicleSection control={control} errors={errors} />
      <DataInfoSection control={control} errors={errors} />
      <ServiceSection  control={control} errors={errors} setValue={setValue}/>

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
          disabled={isGenerating}
          onClick={handleSubmit(async (data) => {
            setIsGenerating(true);
            try {
              await openPdfInNewTab(data); // jeśli funkcja jest asynchroniczna
            } finally {
              setIsGenerating(false);
            }
          })}
        >
          Generuj nowy wniosek
        </Button>
      </Stack>

      {/* Okienko dialogowe informujące o braku danych w localStorage */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Brak danych ustawień</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nie znaleziono danych serwisu w ustawieniach. Uzupełnij nazwę i
            adres serwisu w zakładce <b>Ustawienia</b>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => navigate("/settings")}
            color="primary"
            autoFocus
          >
            Przejdź do ustawień
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
