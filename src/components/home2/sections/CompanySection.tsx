import { Controller } from "react-hook-form";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Props } from "./interfaceProps.types";
import { companyLabelSx, companySectionSx } from "../Home2.styles";

export function CompanySection({ control, errors }: Props) {
  return (
    <Box sx={companySectionSx}>
      <Typography component="span" sx={companyLabelSx}>
        Nazwa i adres firmy
      </Typography>
      <Stack direction="column" spacing={2}>
        <Controller
          name="companyName"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nazwa firmy"
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Adres"
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
            />
          )}
        />
      </Stack>
    </Box>
  );
}
