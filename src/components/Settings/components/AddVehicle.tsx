import React, { useEffect } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharCounter } from "../../commonComponents/CharCounter";

// Schemat walidacji Zod dla pojazdu
const addVehicleSchema = z.object({
  name: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(40, "Maksymalnie 40 znaków"),
});

type AddVehicleForm = z.infer<typeof addVehicleSchema>;

type AddVehicleProps = {
  onAdd: (vehicle: AddVehicleForm) => void;
  editSettings?: boolean;
};

const AddVehicleComponent = ({ onAdd, editSettings }: AddVehicleProps) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddVehicleForm>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: AddVehicleForm) => {
    onAdd(data);
    reset();
  };

  useEffect(() => {
    if (!editSettings) {
      reset();
    }
  }, [editSettings, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2,
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: !editSettings ? theme.palette.text.disabled : undefined,
        }}
      >
        Dodaj pojazd
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nazwa pojazdu"
            variant="outlined"
            fullWidth
            disabled={!editSettings}
            error={!!errors.name}
            helperText={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: 24,
                  width: "100%",
                }}
              >
                <span style={{ color: errors.name ? "red" : "inherit" }}>
                  {errors.name?.message ?? ""}
                </span>
                <CharCounter control={control} name="name" max={40} />
              </span>
            }
            inputProps={{ maxLength: 40 }}
          />
        )}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        disabled={!editSettings}
        sx={{ mt: 2 }}
      >
        Dodaj pojazd
      </Button>
    </Box>
  );
};

export const AddVehicle = React.memo(AddVehicleComponent);
