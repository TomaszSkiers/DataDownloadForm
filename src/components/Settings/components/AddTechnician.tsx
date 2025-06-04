import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharCounter } from "../../commonComponents/CharCounter";

// Schemat walidacji Zod dla formularza dodawania technika
const addTechnicianSchema = z.object({
  fullName: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(40, "Maksymalnie 40 znaków"),
  number: z
    .string()
    .length(16, "Numer musi mieć dokładnie 16 znaków")
    .regex(/^[A-Za-z0-9]{16}$/, "Tylko litery lub cyfry, bez spacji"),
});

type AddTechnicianForm = z.infer<typeof addTechnicianSchema>;

type AddTechnicianFormProps = {
  onAdd: (technician: AddTechnicianForm) => void;
  editSettings?: boolean;
};

const AddTechnicianComponent = ({
  onAdd,
  editSettings,
}: AddTechnicianFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddTechnicianForm>({
    resolver: zodResolver(addTechnicianSchema),
    defaultValues: { fullName: "", number: "" },
  });

  const onSubmit = (data: AddTechnicianForm) => {
    onAdd(data);
    reset();
  };

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
      <TextField
        label="Imię i nazwisko"
        variant="outlined"
        fullWidth
        disabled={!editSettings}
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: 24,
              width: "100%",
            }}
          >
            <span style={{ color: errors.fullName ? "red" : "inherit" }}>
              {errors.fullName?.message ?? ""}
            </span>
            <CharCounter control={control} name="fullName" max={40} />
          </span>
        }
        inputProps={{ maxLength: 40 }}
      />
      <TextField
        label="Nr karty warsztatowej"
        variant="outlined"
        fullWidth
        disabled={!editSettings}
        {...register("number")}
        error={!!errors.number}
        helperText={
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: 24,
              width: "100%",
            }}
          >
            <span style={{ color: errors.number ? "red" : "inherit" }}>
              {errors.number?.message ?? ""}
            </span>
            <CharCounter control={control} name="number" max={16} />
          </span>
        }
        inputProps={{ maxLength: 16 }}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        disabled={!editSettings}
      >
        Dodaj technika
      </Button>
    </Box>
  );
};

export const AddTechnician = React.memo(AddTechnicianComponent);
