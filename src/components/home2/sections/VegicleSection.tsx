import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { vehicleLabelSx, vehicleSectionSx } from "../Home2.styles";

export function VehicleSection({ control, errors }: Props) {
  return (
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
          rules={{
            required: "To pole jest wymagane",
            maxLength: {
              value: 17,
              message: "Maksymalnie 17 znaków",
            },
          }}
          render={({ field }) => {
            // Liczymy znaki bez spacji na końcu (żeby nie wprowadzało w błąd)
            const currentLength = field.value?.trimEnd().length ?? 0;
            return (
              <TextField
                {...field}
                label="Numer VIN"
                error={!!errors.vehicleVin}
                // Helper text pokazuje komunikat walidacyjny lub licznik znaków
                helperText={
                  errors.vehicleVin?.message
                    ? errors.vehicleVin.message
                    : `Wprowadź dokładnie 17 znaków VIN (${currentLength}/17)`
                }
                fullWidth
                inputProps={{ maxLength: 17 }}
                onBlur={(e) => {
                  // Zamiana na wielkie litery + dopełnienie spacjami do 17 znaków
                  const value = e.target.value.toUpperCase().padEnd(17, " ");
                  field.onChange(value);
                  field.onBlur();
                }}
              />
            );
          }}
        />
      </Stack>
    </Box>
  );
}
