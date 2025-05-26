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
  );
}
