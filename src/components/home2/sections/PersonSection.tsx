import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { personLabelSx, personSectionSx } from "../Home2.styles";

export function PersonSection({ control, errors }: Props) {
    return (
        <Box sx={personSectionSx}>
                <Typography component="span" sx={personLabelSx}>
                  Imię i nazwisko właściciela / osoby reprezentującej
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "To pole jest wymagane" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Imię"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "To pole jest wymagane" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nazwisko"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                      />
                    )}
                  />
                </Stack>
              </Box>
    )
}
