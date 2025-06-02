import { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { settingsLabelSx, settingsTechniciansSx } from "./Settings.styles";

type Technician = {
  fullName: string;
  cardNumber: string;
};

export function Technicians({ editSettings }: { editSettings: boolean }) {
  // Stan przechowujący listę techników
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  // Stan do obsługi formularza dodawania technika
  const [newTech, setNewTech] = useState<Technician>({
    fullName: "",
    cardNumber: "",
  });

  // Ładowanie techników z localStorage przy pierwszym renderze
  useEffect(() => {
    const serviceSettings = localStorage.getItem("serviceSettings");
    if (serviceSettings) {
      const technicians = JSON.parse(serviceSettings).technicians || [];
      setTechnicians(technicians);
    }
  }, []);

  // Obsługa dodawania nowego technika
  const handleAddTechnician = () => {
    // Nie dodawaj pustych techników
    if (!newTech.fullName.trim() || !newTech.cardNumber.trim()) return;
    // Dodaj nowego technika do listy
    const updated = [...technicians, newTech];
    setTechnicians(updated);
    // Zapisz zaktualizowaną listę do localStorage (wraz z innymi ustawieniami)
    const serviceSettings = localStorage.getItem("serviceSettings");
    const parsed = serviceSettings ? JSON.parse(serviceSettings) : {};
    parsed.technicians = updated;
    localStorage.setItem("serviceSettings", JSON.stringify(parsed));
    // Wyczyść formularz
    setNewTech({ fullName: "", cardNumber: "" });
  };

  // Funkcja do usuwania technika po indeksie
  const handleRemoveTechnician = (index: number) => {
    const updated = technicians.filter((_, i) => i !== index);
    setTechnicians(updated);
    // Zapisz zaktualizowaną listę do localStorage
    const serviceSettings = localStorage.getItem("serviceSettings");
    const parsed = serviceSettings ? JSON.parse(serviceSettings) : {};
    parsed.technicians = updated;
    localStorage.setItem("serviceSettings", JSON.stringify(parsed));
  };

  return (
    <Box sx={settingsTechniciansSx}>
      {/* Nagłówek sekcji */}
      <Typography variant="subtitle1" sx={settingsLabelSx}>
        Technicy
      </Typography>

      {/* Formularz do dodawania nowego technika */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          label="Imię i nazwisko"
          value={newTech.fullName}
          onChange={(e) => setNewTech({ ...newTech, fullName: e.target.value })}
          disabled={!editSettings}
        />
        <TextField
          fullWidth
          label="Nr karty warsztatowej"
          value={newTech.cardNumber}
          onChange={(e) =>
            setNewTech({ ...newTech, cardNumber: e.target.value })
          }
          disabled={!editSettings}
        />
        <IconButton
          color="primary"
          disabled={!editSettings}
          onClick={handleAddTechnician}
          sx={{
            width: 40,
            height: 40,
            border: "1px solid",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Lista techników lub informacja o braku */}
      <Box sx={{ width: "100%", mt: 2 }}>
        {technicians.length === 0 ? (
          // Jeśli nie ma techników, wyświetl komunikat
          <Typography
            color="text.secondary"
            sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}
          >
            Brak techników
          </Typography>
        ) : (
          // Jeśli są technicy, wyświetl ich listę
          technicians.map((tech, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                borderBottom: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Typography sx={{ flex: 1 }}>{tech.fullName}</Typography>
              <Typography sx={{ flex: 1 }}>{tech.cardNumber}</Typography>
              <IconButton
                color="error"
                onClick={() => handleRemoveTechnician(index)}
                disabled={!editSettings}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
