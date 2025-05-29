import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { tachoLabelSx, tachoSectionSx } from "../Home2.styles";

export function TahographSection({ control, errors }: Props) {
  return (
    <Box sx={tachoSectionSx}>
      <Typography component="span" sx={tachoLabelSx}>
        Tachograf
      </Typography>
      <Stack direction="column" spacing={2}>
        <Controller
          name="tachoBrand"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marka tachografu"
              error={!!errors.tachoBrand}
              helperText={
                errors.tachoBrand?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
              
            />
          )}
        />
        <Controller
          name="tachoSerial"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nr seryjny tachografu"
              error={!!errors.tachoSerial}
              helperText={
                errors.tachoSerial?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
              onChange={(e) => {
                // Zamień małe litery na wielkie
                const upperValue = e.target.value.toUpperCase();
                field.onChange(upperValue);
              }}
            />
          )}
        />
        <Controller
          name="tachoYear"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rok produkcji tachografu"
              error={!!errors.tachoYear}
              helperText={
                errors.tachoYear?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
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
