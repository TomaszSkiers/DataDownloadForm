import {  useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Stack,
  
  Typography,
} from "@mui/material";
import type { FormValues } from "./Home2.types";
import {
  tachoSectionSx,
  tachoLabelSx,
  formBoxSx,
  vehicleSectionSx,
  vehicleLabelSx,
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
      <Stack direction="row" spacing={2}>
        <TextField
          label="Nr dokumentu"
          {...register("documentNumber", { required: "To pole jest wymagane" })}
          error={!!errors.documentNumber?.message}
          helperText={errors.documentNumber?.message}
          fullWidth
        />

        <TextField
          label="Data"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("date", { required: "To pole jest wymagane" })}
          fullWidth
        />
      </Stack>

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

      <Button type="submit" variant="contained">
        Zapisz
      </Button>
    </Box>
  );
}
