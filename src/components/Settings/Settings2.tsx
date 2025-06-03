import React, { useEffect } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useForm, Controller } from "react-hook-form";
import { settingsBoxSx } from "./Settings.styles";
// import { Technicians } from "./Technicians";
import { Technicians2 } from "./Technicans2";

type Technician = {
  fullName: string;
  number: string;
};

type FormData = {
  serviceName: string;
  serviceAddress: string;
  technicians: Technician[];
};

const STORAGE_KEY = "serviceSettings";

const Settings2: React.FC = () => {
  const [editSttings, setEditSettings] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      serviceName: "",
      serviceAddress: "",
      technicians: [],
    },
  });

  // Wczytaj dane z localStorage i ustaw je w formularzu po załadowaniu komponentu
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      reset(JSON.parse(stored));
    }
  }, [reset]);

  const onSubmit = (data: FormData) => {
    try {
      const newData = localStorage.getItem(STORAGE_KEY) 
      const parsedData = newData ? JSON.parse(newData) : {};
      data.technicians = parsedData.technicians || [];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Dane zapisane:", data);
      setEditSettings(false);
    } catch (error) {
      console.error("Błąd zapisu do localStorage:", error);
      alert("Wystąpił błąd podczas zapisywania ustawień");
    }
  };

  return (
    <Box sx={settingsBoxSx} component="form"  onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <SettingsIcon /> ustawienia
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            type="submit"
            color="secondary"
            disabled={!editSttings}
            sx={{ border: "1px solid", width: 40, height: 40 }}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => setEditSettings(!editSttings)}
            sx={{ border: "1px solid", width: 40, height: 40 }}
          >
            {editSttings ? <LockIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>

      <Controller
        name="serviceName"
        control={control}
        rules={{
          required: "To pole jest wymagane",
          maxLength: {
            value: 75,
            message: "Maksymalnie 75 znaków",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nazwa serwisu"
            error={!!errors.serviceName}
            helperText={
              errors.serviceName?.message ??
              `${field.value?.length || 0}/75 znaków`
            }
            fullWidth
            disabled={!editSttings}
            inputProps={{ maxLength: 75 }}
          />
        )}
      />

      <Controller
        name="serviceAddress"
        control={control}
        rules={{
          required: "To pole jest wymagane",
          maxLength: {
            value: 150,
            message: "Maksymalnie 150 znaków",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Adres serwisu"
            error={!!errors.serviceAddress}
            helperText={
              errors.serviceAddress?.message ??
              `${field.value?.length || 0}/150 znaków`
            }
            fullWidth
            disabled={!editSttings}
            inputProps={{ maxLength: 150 }}
            multiline
            minRows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        )}
      />

      <Technicians2 editSttings={editSttings} />
    </Box>
  );
};

export default Settings2;
