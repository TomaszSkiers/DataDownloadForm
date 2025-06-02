import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { dataInfoLabelSx, dataInfoSectionSx } from "../Home2.styles";

export function DataInfoSection({ control, errors }: Props) {
  return (
    <Box sx={dataInfoSectionSx}>
      <Typography component="span" sx={dataInfoLabelSx}>
        Informacje o danych
      </Typography>
      <Stack direction="column" spacing={2}>
        <Controller
          name="dataType"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 255, message: "Maksymalnie 255 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rodzaj danych"
              error={!!errors.dataType}
              helperText={
                errors.dataType?.message ??
                `${field.value?.length || 0}/255 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 255 }}
              multiline
            />
          )}
        />
        <Controller
          name="dataScope"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Zakres danych"
              error={!!errors.dataScope}
              helperText={
                errors.dataScope?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
            />
          )}
        />
        <Controller
          name="dataReason"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 225, message: "Maksymalnie 225 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Powód pobrania"
              error={!!errors.dataReason}
              helperText={
                errors.dataReason?.message ??
                `${field.value?.length || 0}/225 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 225 }}
              multiline
            />
          )}
        />
      </Stack>
    </Box>
  );
}
