import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharCounter } from "../../commonComponents/CharCounter";
import { useEffect } from "react";

const addManufacturerSchema = z.object({
  name: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(75, "Maksymalnie 75 znaków"),
});

type AddManufacturerForm = z.infer<typeof addManufacturerSchema>;

type AddManufacturerFormProps = {
  onAdd: (manufacturer: AddManufacturerForm) => void;
  editSettings?: boolean;
};

const AddManufacturer = ({ onAdd, editSettings }: AddManufacturerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddManufacturerForm>({
    resolver: zodResolver(addManufacturerSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: AddManufacturerForm) => {
    onAdd(data);
    reset();
  };

    // Resetuj formularz, gdy edycja zostaje wyłączona
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
        p: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 2, color: !editSettings ? "text.disabled" : undefined }}
      >
        Dodaj producenta
      </Typography>

      <TextField
        label="Nazwa producenta"
        variant="outlined"
        fullWidth
        disabled={!editSettings}
        {...register("name")}
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
            <CharCounter control={control} name="name" max={75} />
          </span>
        }
        inputProps={{ maxLength: 75 }}
      />

      <Button
      variant="outlined"
        color="primary"
        type="submit"
        disabled={!editSettings}
        fullWidth
      >
        Dodaj producenta tachografu
      </Button>
    </Box>
  );
};

export default AddManufacturer;
