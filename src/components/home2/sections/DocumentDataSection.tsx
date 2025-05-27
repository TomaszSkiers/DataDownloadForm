import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";

import { documentLabelSx, documentSectionSx } from "../Home2.styles";

export function DocumentDataSection({ control, errors }: Props) {
  return (
    <Box sx={documentSectionSx}>
      <Typography component="span" sx={documentLabelSx}>
        Dane dokumentu
      </Typography>
      <Stack direction="row" spacing={2}>
        <Controller
          name="documentNumber"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            pattern: {
              value: /^\d{8}$/,
              message: "Numer musi mieć dokładnie 8 cyfr",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nr dokumentu"
              error={!!errors.documentNumber}
              helperText={errors.documentNumber?.message}
              fullWidth
              inputProps={{ maxLength: 8 }}
              onBlur={(e) => {
                // Dopełnij zerami do 8, ale nie przekraczaj 8 znaków
                let value = e.target.value.replace(/\D/g, ""); // tylko cyfry
                if (value.length < 8) {
                  value = value.padStart(8, "0");
                }
                field.onChange(value);
                field.onBlur();
              }}
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
  );
}
