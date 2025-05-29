import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { serviceLabelSx, serviceSectionSx } from "../Home2.styles";
import { useState } from "react";

export function ServiceSection({ control, errors }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  return (
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
          rules={{
            required: "To pole jest wymagane",
            validate: (value) =>
              value.length === 16 || "Pole musi zawierać dokładnie 16 znaków",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nr karty warsztatowej"
              error={!!errors.workshopCardNumber}
              helperText={
                isFocused
                  ? `${field.value?.length || 0}/16`
                  : errors.workshopCardNumber?.message || " "
              }
              fullWidth
              inputProps={{ maxLength: 16 }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur();
              }}
              onChange={(e) => {
                // Zamień małe litery na wielkie
                const upperValue = e.target.value.toUpperCase();
                field.onChange(upperValue);
              }}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
