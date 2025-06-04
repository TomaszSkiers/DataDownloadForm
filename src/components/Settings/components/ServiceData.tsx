import { Box, TextField } from "@mui/material";
import { Controller, type Control, useFormState } from "react-hook-form";
import type { FormData } from "./types";
import { CharCounter } from "../../commonComponents/CharCounter";

type Props = {
  control: Control<FormData>;
  editSettings: boolean;
};

export const ServiceData = ({ control, editSettings }: Props) => {
  const { errors } = useFormState({ control });

  return (
    <Box>
      <Controller
        name="serviceName"
        control={control}
        rules={{
          required: "Nazwa serwisu jest wymagana",
          maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nazwa serwisu"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.serviceName}
            helperText={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: 24,
                  width: "100%",
                }}
              >
                <span style={{ color: errors.serviceName ? "red" : "inherit" }}>
                  {errors.serviceName?.message ?? ""}
                </span>
                <CharCounter control={control} name="serviceName" max={75} />
              </span>
            }
            inputProps={{ maxLength: 75 }}
            disabled={!editSettings}
          />
        )}
      />
      <Controller
        name="serviceAddress"
        control={control}
        rules={{
          maxLength: { value: 150, message: "Maksymalnie 150 znaków" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Adres serwisu"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            error={!!errors.serviceAddress}
            helperText={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: 24,
                  width: "100%",
                }}
              >
                <span
                  style={{ color: errors.serviceAddress ? "red" : "inherit" }}
                >
                  {errors.serviceAddress?.message ?? ""}
                </span>
                <CharCounter
                  control={control}
                  name="serviceAddress"
                  max={150}
                />
              </span>
            }
            inputProps={{ maxLength: 150 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            disabled={!editSettings}
          />
        )}
      />
    </Box>
  );
};
