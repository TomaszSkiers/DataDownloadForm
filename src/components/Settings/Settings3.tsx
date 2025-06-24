import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import { settingsBoxSx } from "./Settings.styles";
import { useFieldArray, useForm } from "react-hook-form";
import { ServiceData } from "./components/ServiceData";
import { AddTechnician } from "./components/AddTechnician";
import { DisplayTechnicians } from "./components/DisplayTechnicians";
import type { FormData } from "./components/types";
import AddManufacturer from "./components/AddManufacturer";
import { DisplayManufacturers } from "./components/DisplayManufacturers";
import DisplayVehicles from "./components/DisplayVehicles";
import { AddVehicle } from "./components/AddVehicle";

export const Settings3: React.FC = () => {
  const [editSettings, setEditSettings] = React.useState(false);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      serviceName: "",
      serviceAddress: "",
      technicians: [],
      manufacturers: [],
      vehicles: [],
    },
  });

  const {
    fields: technicianFields,
    replace: replaceTechnicians,
    append: appendTechnician,
    remove: removeTechnician,
  } = useFieldArray({
    control,
    name: "technicians",
  });

  const {
    fields: manufacturerFields,
    // replace: replaceManufacturers,
    append: appendManufacturer,
    remove: removeManufacturer,
  } = useFieldArray({
    control,
    name: "manufacturers",
  });

  const {
    // fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    control,
    name: "vehicles",
  });

  // Odczyt z localStorage przy starcie
  useEffect(() => {
    const stored = localStorage.getItem("serviceSettings");
    if (stored) {
      const parsed = JSON.parse(stored);
      reset(parsed);
      replaceTechnicians(parsed.technicians);
    }
  }, [reset, replaceTechnicians]);

  // Zapis do localStorage po zapisie ustawień
  const onSubmit = (data: FormData) => {
    localStorage.setItem("serviceSettings", JSON.stringify(data));
    setEditSettings(false);
  };

  return (
    <Box sx={settingsBoxSx}>
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
          <SettingsIcon /> Ustawienia
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="secondary"
            disabled={!editSettings}
            sx={{ border: "1px solid", width: 40, height: 40 }}
            onClick={handleSubmit(onSubmit)}
          >
            <SaveIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => setEditSettings((prev) => !prev)}
            sx={{ border: "1px solid", width: 40, height: 40 }}
          >
            {editSettings ? <LockIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>
      <ServiceData control={control} editSettings={editSettings} />
      <DisplayVehicles
        vehicles={control._formValues.vehicles}
        editSettings={editSettings}
        onRemove={removeVehicle}
      />
      <AddVehicle onAdd={appendVehicle} editSettings={editSettings}  />
      <DisplayTechnicians
        technicians={technicianFields}
        onRemove={removeTechnician}
        editSettings={editSettings}
      />
      <AddTechnician onAdd={appendTechnician} editSettings={editSettings} />
      <DisplayManufacturers
        manufacturers={manufacturerFields}
        onRemove={removeManufacturer}
        editSettings={editSettings}
      />
      <AddManufacturer onAdd={appendManufacturer} editSettings={editSettings} />
    </Box>
  );
};
