import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import {
  settingsBoxSx,
  settingsDropdownSx,
  settingsLabelSx,
} from "./Settings.styles";

type SampleUser = {
  fullName: string;
  cardNumber: string;
};

type FormData = {
  serviceName: string;
  serviceAddress: string;
  selectedUser: string;
};

const STORAGE_KEY = "serviceSettings";

const Settings: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [sampleUsers, setSampleUsers] = useState<SampleUser[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newUser, setNewUser] = useState<SampleUser>({
    fullName: "",
    cardNumber: "",
  });

  // Ładowanie przykładowych użytkowników z localStorage
  // lub ustawienie domyślnej wartości, jeśli nie ma zapisanych użytkowników
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("sampleUsers");
      if (storedUsers) {
        const parsedUsers: SampleUser[] = JSON.parse(storedUsers);
        setSampleUsers(parsedUsers);
      }
    } catch (error) {
      console.error("Błąd ładowania użytkowników:", error);
      setSampleUsers([]);
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: (() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored
          ? JSON.parse(stored)
          : { serviceName: "", serviceAddress: "" };
      } catch {
        return { serviceName: "", serviceAddress: "" };
      }
    })(),
  });

  const onSubmit = (data: FormData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Dane zapisane:", data);
      alert("Ustawienia zostały zapisane!");
      setIsEditable(false);
    } catch (error) {
      console.error("Błąd zapisu do localStorage:", error);
      alert("Wystąpił błąd podczas zapisywania ustawień");
    }
  };

  // Funkcja do usuwania użytkownika
  const handleDeleteUser = (indexToDelete: number) => {
    const updatedUsers = sampleUsers.filter((_, idx) => idx !== indexToDelete);
    setSampleUsers(updatedUsers);
    localStorage.setItem("sampleUsers", JSON.stringify(updatedUsers));
  };

  // Dodawanie nowego technika
  const handleAddUser = () => {
    if (!newUser.fullName.trim()) return;
    const updatedUsers = [...sampleUsers, newUser];
    setSampleUsers(updatedUsers);
    localStorage.setItem("sampleUsers", JSON.stringify(updatedUsers));
    setNewUser({ fullName: "", cardNumber: "" });
    setOpenAddDialog(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={settingsBoxSx}>
      <Typography sx={settingsLabelSx} component="span">
        Settings
      </Typography>

      <TextField
        label="Nazwa serwisu"
        {...register("serviceName", { required: "To pole jest wymagane" })}
        error={!!errors.serviceName}
        helperText={errors.serviceName?.message}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={!isEditable}
      />

      <TextField
        label="Adres serwisu"
        {...register("serviceAddress", { required: "To pole jest wymagane" })}
        error={!!errors.serviceAddress}
        helperText={errors.serviceAddress?.message}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={!isEditable}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        {!isEditable ? (
          <Button
            variant="outlined"
            color="primary"
            type="button" // <-- dodaj ten atrybut
            onClick={() => setIsEditable(true)}
            fullWidth
          >
            Edytuj ustawienia
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Zapisz ustawienia
          </Button>
        )}
      </Box>

      {/* to będzie dobre na formularz z wniskiem - wybór technika*/}
      <Box sx={settingsDropdownSx}>
        <Typography sx={settingsLabelSx} component="span">
          Lista rozwijana
        </Typography>
        <Controller
          name="selectedUser"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              SelectProps={{
                MenuProps: {
                  transitionDuration: 0, // Wyłącza animację
                  disableScrollLock: true, // Wyłącza blokadę przewijania
                },
              }}
              label="Użytkownik"
              fullWidth
            >
              {sampleUsers.map((user, index) => (
                <MenuItem key={index} value={user.fullName}>
                  <Typography variant="subtitle1">{user.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.cardNumber || "Brak numeru karty"}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      {/* wyświetlanie wszystkich techników z localStorage*/}
      <Box sx={settingsBoxSx}>
        <Typography sx={settingsLabelSx} component="span">
          Lista techników
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
          onClick={() => setOpenAddDialog(true)}
        >
          Dodaj technika
        </Button>
        {sampleUsers.length > 0 ? (
          <List>
            {sampleUsers.map((user, index) => (
              <ListItem
                key={index}
                divider
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="usuń"
                    onClick={() => handleDeleteUser(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={user.fullName}
                  secondary={user.cardNumber}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Brak zapisanych techników.
          </Typography>
        )}
      </Box>

      {/* Dialog do dodawania technika */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Dodaj technika</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Imię i nazwisko"
            fullWidth
            value={newUser.fullName}
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Numer karty"
            fullWidth
            value={newUser.cardNumber}
            onChange={(e) =>
              setNewUser({ ...newUser, cardNumber: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Anuluj</Button>
          <Button onClick={handleAddUser} variant="contained">
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
