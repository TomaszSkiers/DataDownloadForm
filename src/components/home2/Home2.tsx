import { useForm } from "react-hook-form";
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

export default function Home2() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Dane formularza", data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formBoxSx}>
      <Box sx={documentSectionSx}>
        <Typography component="span" sx={documentLabelSx}>
          Dane dokumentu
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Nr dokumentu"
            {...register("documentNumber", {
              required: "To pole jest wymagane",
            })}
            error={!!errors.documentNumber}
            helperText={errors.documentNumber?.message}
            fullWidth
          />

          <TextField
            label="Data"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors.date}
            helperText={errors.date?.message}
            {...register("date", { required: "To pole jest wymagane" })}
          />
        </Stack>
      </Box>

      <Box sx={personSectionSx}>
        <Typography component="span" sx={personLabelSx}>
          Imię i nazwisko właściciela / osoby reprezentującej
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Imię"
            {...register("firstName", { required: "To pole jest wymagane" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
          />
          <TextField
            label="Nazwisko"
            {...register("lastName", { required: "To pole jest wymagane" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
          />
        </Stack>
      </Box>

      <Box sx={companySectionSx}>
        <Typography component="span" sx={companyLabelSx}>
          Nazwa i adres firmy
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Nazwa firmy"
            {...register("companyName", { required: "To pole jest wymagane" })}
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
            fullWidth
          />
          <TextField
            label="Adres"
            {...register("address", { required: "To pole jest wymagane" })}
            error={!!errors.address}
            helperText={errors.address?.message}
            fullWidth
          />
        </Stack>
      </Box>

      {/* Sekcja TACHOGRAF */}
      <Box sx={tachoSectionSx}>
        <Typography component="span" sx={tachoLabelSx}>
          Tachograf
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Marka tachografu"
            {...register("tachoBrand", { required: "To pole jest wymagane" })}
            error={!!errors.tachoBrand}
            helperText={errors.tachoBrand?.message}
            fullWidth
          />
          <TextField
            label="Nr seryjny tachografu"
            {...register("tachoSerial", { required: "To pole jest wymagane" })}
            error={!!errors.tachoSerial}
            helperText={errors.tachoSerial?.message}
            fullWidth
          />
          <TextField
            label="Rok produkcji tachografu"
            {...register("tachoYear", { required: "To pole jest wymagane" })}
            error={!!errors.tachoYear}
            helperText={errors.tachoYear?.message}
            fullWidth
          />
        </Stack>
      </Box>

      <Box sx={vehicleSectionSx}>
        <Typography component="span" sx={vehicleLabelSx}>
          Dane pojazdu
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Marka pojazdu"
            {...register("vehicleBrand", { required: "To pole jest wymagane" })}
            error={!!errors.vehicleBrand}
            helperText={errors.vehicleBrand?.message}
            fullWidth
          />
          <TextField
            label="Model"
            {...register("vehicleModel", { required: "To pole jest wymagane" })}
            error={!!errors.vehicleModel}
            helperText={errors.vehicleModel?.message}
            fullWidth
          />
          <TextField
            label="Numer VRN"
            {...register("vehicleVRN", { required: "To pole jest wymagane" })}
            error={!!errors.vehicleVRN}
            helperText={errors.vehicleVRN?.message}
            fullWidth
          />
          <TextField
            label="Numer VIN"
            {...register("vehicleVin", {
              required: "To pole jest wymagane",
            })}
            error={!!errors.vehicleVin}
            helperText={errors.vehicleVin?.message}
            fullWidth
            inputProps={{ maxLength: 17 }}
          />
        </Stack>
      </Box>

      <Box sx={dataInfoSectionSx}>
        <Typography component="span" sx={dataInfoLabelSx}>
          Informacje o danych
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Rodzaj danych"
            {...register("dataType", { required: "To pole jest wymagane" })}
            error={!!errors.dataType}
            helperText={errors.dataType?.message}
            fullWidth
          />
          <TextField
            label="Zakres danych"
            {...register("dataScope", { required: "To pole jest wymagane" })}
            error={!!errors.dataScope}
            helperText={errors.dataScope?.message}
            fullWidth
          />
          <TextField
            label="Powód pobrania"
            {...register("dataReason", { required: "To pole jest wymagane" })}
            error={!!errors.dataReason}
            helperText={errors.dataReason?.message}
            fullWidth
          />
        </Stack>
      </Box>

      <Box sx={serviceSectionSx}>
        <Typography component="span" sx={serviceLabelSx}>
          Dane serwisu i technika
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Nazwa serwisu"
            {...register("serviceName", { required: "To pole jest wymagane" })}
            error={!!errors.serviceName}
            helperText={errors.serviceName?.message}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Imię technika"
              {...register("technicianFirstName", {
                required: "To pole jest wymagane",
              })}
              error={!!errors.technicianFirstName}
              helperText={errors.technicianFirstName?.message}
              fullWidth
            />
            <TextField
              label="Nazwisko technika"
              {...register("technicianLastName", {
                required: "To pole jest wymagane",
              })}
              error={!!errors.technicianLastName}
              helperText={errors.technicianLastName?.message}
              fullWidth
            />
          </Stack>
          <TextField
            label="Nr karty warsztatowej"
            {...register("workshopCardNumber", {
              required: "To pole jest wymagane",
            })}
            error={!!errors.workshopCardNumber}
            helperText={errors.workshopCardNumber?.message}
            fullWidth
          />
        </Stack>
      </Box>

      <Button type="submit" variant="contained">
        Zapisz
      </Button>
    </Box>
  );
}
