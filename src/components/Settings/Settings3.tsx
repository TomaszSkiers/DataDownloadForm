import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import { settingsBoxSx } from "./Settings.styles";
import { useFieldArray, useForm } from "react-hook-form";
import type { FormData } from "./components/types";
import { ServiceData } from "./components/ServiceData";
import { AddTechnician} from "./components/AddTechnician";
import { DisplayTechnicians } from "./components/DisplayTechnicians";

// const example = {
//   serviceName: "Przykładowa Usługa",
//   serviceAddress: "Przykładowy Adres 123",
//   technicians: [
//     { fullName: "Jan Kowalski", number: "123456789" },
//     { fullName: "Anna Nowak", number: "987654321" },
//   ],
// }

// localStorage.setItem("serviceSettings", JSON.stringify(example));

export const Settings3: React.FC = () => {
  const [editSttings, setEditSettings] = React.useState(false);

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      serviceName: "",
      serviceAddress: "",
      technicians: [],
    },
  });

  const { fields, replace, append } = useFieldArray({
    control,
    name: "technicians",
  });

  // Wczytaj dane z localStorage i ustaw je w formularzu po załadowaniu komponentu
  useEffect(() => {
    const stored = localStorage.getItem("serviceSettings");
    if (stored) {
      const parsed = JSON.parse(stored);
      reset(parsed);
      replace(parsed.technicians); // ustawia tablicę technicians
    }
  }, [reset, replace]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    setEditSettings(!editSttings);
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
          <SettingsIcon /> ustawienia
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="secondary"
            disabled={!editSttings}
            sx={{ border: "1px solid", width: 40, height: 40 }}
            onClick={handleSubmit(onSubmit)}
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
      <ServiceData control={control} />  
      <DisplayTechnicians technicians={fields} />
      <AddTechnician onAdd={append} editSettings={editSttings} />
    </Box>
  );
};
