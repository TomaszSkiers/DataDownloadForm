import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import type { FormValues } from "./Home2.types";
import {
  tachoSectionSx,
  tachoLabelSx,
  formBoxSx,
  vehicleSectionSx,
  vehicleLabelSx,
  dataInfoSectionSx,
  dataInfoLabelSx,
  serviceSectionSx,
  serviceLabelSx,
  documentSectionSx,
  documentLabelSx,
  personSectionSx,
  personLabelSx,
  companySectionSx,
  companyLabelSx,
} from "./Home2.styles";
import { saveToFile } from "../../functions/saveLoadFromComputer/saveToFile";
import { useRef } from "react";
import { readFileAsJson } from "../../functions/saveLoadFromComputer/readFileAsJson";
import { defaultValues } from "./defaultValues";
import { exportPdf } from "../../functions/pdf/expPdf";

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
    console.log("Dane formularza", data);
    saveToFile(data, "moja_nazwa_pliku.json");
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
      {/* Sekcja DOKUMENT */}
      <Box sx={documentSectionSx}>
        <Typography component="span" sx={documentLabelSx}>
          Dane dokumentu
        </Typography>
        <Stack direction="row" spacing={2}>
          <Controller
            name="documentNumber"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nr dokumentu"
                error={!!errors.documentNumber}
                helperText={errors.documentNumber?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Data"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </Box>

      {/* Sekcja OSOBA */}
      <Box sx={personSectionSx}>
        <Typography component="span" sx={personLabelSx}>
          Imię i nazwisko właściciela / osoby reprezentującej
        </Typography>
        <Stack direction="row" spacing={2}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Imię"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwisko"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </Box>

      {/* Sekcja FIRMA */}
      <Box sx={companySectionSx}>
        <Typography component="span" sx={companyLabelSx}>
          Nazwa i adres firmy
        </Typography>
        <Stack direction="column" spacing={2}>
          <Controller
            name="companyName"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwa firmy"
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Adres"
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </Box>

      {/* Sekcja TACHOGRAF */}
      <Box sx={tachoSectionSx}>
        <Typography component="span" sx={tachoLabelSx}>
          Tachograf
        </Typography>
        <Stack direction="column" spacing={2}>
          <Controller
            name="tachoBrand"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Marka tachografu"
                error={!!errors.tachoBrand}
                helperText={errors.tachoBrand?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="tachoSerial"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nr seryjny tachografu"
                error={!!errors.tachoSerial}
                helperText={errors.tachoSerial?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="tachoYear"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rok produkcji tachografu"
                error={!!errors.tachoYear}
                helperText={errors.tachoYear?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </Box>

      {/* Sekcja POJAZD */}
      <Box sx={vehicleSectionSx}>
        <Typography component="span" sx={vehicleLabelSx}>
          Dane pojazdu
        </Typography>
        <Stack direction="column" spacing={2}>
          <Controller
            name="vehicleBrand"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Marka pojazdu"
                error={!!errors.vehicleBrand}
                helperText={errors.vehicleBrand?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="vehicleModel"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Model"
                error={!!errors.vehicleModel}
                helperText={errors.vehicleModel?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="vehicleVRN"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Numer VRN"
                error={!!errors.vehicleVRN}
                helperText={errors.vehicleVRN?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="vehicleVin"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Numer VIN"
                error={!!errors.vehicleVin}
                helperText={errors.vehicleVin?.message}
                fullWidth
                inputProps={{ maxLength: 17 }}
              />
            )}
          />
        </Stack>
      </Box>

      {/* Sekcja INFORMACJE O DANYCH */}
      <Box sx={dataInfoSectionSx}>
        <Typography component="span" sx={dataInfoLabelSx}>
          Informacje o danych
        </Typography>
        <Stack direction="column" spacing={2}>
          <Controller
            name="dataType"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rodzaj danych"
                error={!!errors.dataType}
                helperText={errors.dataType?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="dataScope"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zakres danych"
                error={!!errors.dataScope}
                helperText={errors.dataScope?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="dataReason"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Powód pobrania"
                error={!!errors.dataReason}
                helperText={errors.dataReason?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </Box>

      {/* Sekcja SERWIS */}
      <Box sx={serviceSectionSx}>
        <Typography component="span" sx={serviceLabelSx}>
          Dane serwisu i technika
        </Typography>
        <Stack direction="column" spacing={2}>
          <Controller
            name="serviceName"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwa serwisu"
                error={!!errors.serviceName}
                helperText={errors.serviceName?.message}
                fullWidth
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <Controller
              name="technicianFirstName"
              control={control}
              rules={{ required: "To pole jest wymagane" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Imię technika"
                  error={!!errors.technicianFirstName}
                  helperText={errors.technicianFirstName?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="technicianLastName"
              control={control}
              rules={{ required: "To pole jest wymagane" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nazwisko technika"
                  error={!!errors.technicianLastName}
                  helperText={errors.technicianLastName?.message}
                  fullWidth
                />
              )}
            />
          </Stack>
          <Controller
            name="workshopCardNumber"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nr karty warsztatowej"
                error={!!errors.workshopCardNumber}
                helperText={errors.workshopCardNumber?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </Box>

      {/* PRZYCISKI */}
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
