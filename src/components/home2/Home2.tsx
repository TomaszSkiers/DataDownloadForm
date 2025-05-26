import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import type { FormValues } from "./Home2.types";
import { formBoxSx } from "./Home2.styles";
import { saveToFile } from "../../functions/saveLoadFromComputer/saveToFile";
import { useRef } from "react";
import { readFileAsJson } from "../../functions/saveLoadFromComputer/readFileAsJson";
import { defaultValues } from "./defaultValues";
import { exportPdf } from "../../functions/pdf/expPdf";
import { DocumentDataSection } from "./sections/DocumentDataSection";
import { PersonSection } from "./sections/PersonSection";
import { CompanySection } from "./sections/CompanySection";
import { TahographSection } from "./sections/TagographSection";
import { VehicleSection } from "./sections/VegicleSection";
import { DataInfoSection } from "./sections/DataInfoSection";
import { ServiceSection } from "./sections/ServiceSection";

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

  const onSubmit = (data: FormValues) => {
    console.log("Dane formularza", data);   //debugger
    saveToFile(data);                       //* w data mogę przekazać nazwę pliku
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = await readFileAsJson<Partial<FormValues>>(file);
        reset({ ...defaultValues, ...data });
      } catch (error) {
        alert("Błąd odczytu pliku: " + (error as Error).message);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formBoxSx}>
      <DocumentDataSection control={control} errors={errors} />
      <PersonSection control={control} errors={errors} />
      <CompanySection control={control} errors={errors} />
      <TahographSection control={control} errors={errors} />
      <VehicleSection control={control} errors={errors} />
      <DataInfoSection control={control} errors={errors} />
      <ServiceSection control={control} errors={errors} />

      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="outlined" fullWidth color="secondary">
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
          Generuj PDF
        </Button>
      </Stack>
    </Box>
  );
}
