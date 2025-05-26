import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { tachoLabelSx, tachoSectionSx } from "../Home2.styles";

export function TahographSection({control, errors}: Props) {
    return (
        <Box sx={tachoSectionSx}>
                <Typography component="span" sx={tachoLabelSx}>
                  Tachograf
                </Typography>
                <Stack direction="column" spacing={2}>
                  <Controller
                    name="tachoBrand"
                    control={control}
                    rules={{ required: "To pole jest wymagane" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Marka tachografu"
                        error={!!errors.tachoBrand}
                        helperText={errors.tachoBrand?.message}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="tachoSerial"
                    control={control}
                    rules={{ required: "To pole jest wymagane" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nr seryjny tachografu"
                        error={!!errors.tachoSerial}
                        helperText={errors.tachoSerial?.message}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="tachoYear"
                    control={control}
                    rules={{ required: "To pole jest wymagane" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Rok produkcji tachografu"
                        error={!!errors.tachoYear}
                        helperText={errors.tachoYear?.message}
                        fullWidth
                      />
                    )}
                  />
                </Stack>
              </Box>
    )
}