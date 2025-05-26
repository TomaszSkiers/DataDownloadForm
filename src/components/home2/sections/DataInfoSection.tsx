import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { dataInfoLabelSx, dataInfoSectionSx } from "../Home2.styles";

export function DataInfoSection ({control, errors}: Props) {
    return (
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
    )
}