import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { vehicleLabelSx, vehicleSectionSx } from "../Home2.styles";
import { useState } from "react";

export function VehicleSection({ control, errors }: Props) {
  const [isVinFocused, setIsVinFocused] = useState(false);
  return (
    <Box sx={vehicleSectionSx}>
      <Typography component="span" sx={vehicleLabelSx}>
        Dane pojazdu
      </Typography>
      <Stack direction="column" spacing={2}>
        <Controller
          name="vehicleBrand"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 30, message: "Maksymalnie 30 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marka pojazdu"
              error={!!errors.vehicleBrand}
              helperText={
                errors.vehicleBrand?.message ??
                `${field.value?.length || 0}/30 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 30 }}
            />
          )}
        />
        <Controller
          name="vehicleModel"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 25, message: "Maksymalnie 25 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Model"
              error={!!errors.vehicleModel}
              helperText={
                errors.vehicleModel?.message ??
                `${field.value?.length || 0}/25 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 25 }}
            />
          )}
        />
        <Controller
          name="vehicleVRN"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 15, message: "Maksymalnie 15 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Numer VRN"
              error={!!errors.vehicleVRN}
              helperText={
                errors.vehicleVRN?.message ??
                `${field.value?.length || 0}/15 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 15 }}
              onChange={(e) => {
                // Zamień małe litery na wielkie
                const upperValue = e.target.value.toUpperCase();
                field.onChange(upperValue);
              }}
            />
          )}
        />
        <Controller
          name="vehicleVin"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            validate: (value) => {
              const cleanedValue = value?.replace(/\s/g, "") || "";
              if (cleanedValue.length > 17) {
                return "VIN nie może mieć więcej niż 17 znaków";
              }
              return true; // Walidacja passed
            },
          }}
          render={({ field }) => {
            const cleanedValue = field.value?.replace(/\s/g, "") || "";
            const currentLength = cleanedValue.length;

            return (
              <TextField
                {...field}
                label="Numer VIN"
                error={!!errors.vehicleVin}
                helperText={
                  isVinFocused
                    ? `Wprowadź VIN (${currentLength}/17)`
                    : errors.vehicleVin?.message ||
                      (currentLength > 0 && currentLength < 17
                        ? `VIN jest za krótki (${currentLength}/17)`
                        : currentLength === 17
                        ? "VIN poprawny"
                        : " ")
                }
                fullWidth
                inputProps={{
                  maxLength: 17,
                  style: { textTransform: "uppercase" },
                }}
                onChange={(e) => {
                  const upperValue = e.target.value
                    .toUpperCase()
                    .replace(/\s/g, "");
                  field.onChange(upperValue);
                }}
                onFocus={() => setIsVinFocused(true)}
                onBlur={() => {
                  setIsVinFocused(false);
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
