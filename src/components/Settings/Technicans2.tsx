import { Box, Typography, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { settingsLabelSx, settingsTechniciansSx } from "./Settings.styles";

type Technician = {
  fullName: string;
  cardNumber: string;
};
type FormData = {
  technicians: Technician[];
  addFullName: string;
  addCardNumber: string;
};

//todo źle pokazuje licznik znaków w polach imię i nazwisko oraz nr karty
//todo po wyświetleniu błędu w polu nr karty, nie resetuje się licznik znaków
//todo po wciśnięciu przycisku zapisz zostają na czerwono błedy w polach imię i nazwisko oraz nr karty

const STORAGE_KEY = "serviceSettings"; // Klucz do localStorage

export function Technicians2({ editSttings }: { editSttings: boolean }) {
  // inicjalizacja formularza z domyślnymi wartościami
  const methods = useForm<FormData>({
    defaultValues: { technicians: [] },
  });

  const {
    control,
    reset,
    formState: { errors },
    getValues,
    handleSubmit
  } = methods;

  //hook do obsługi tablicy techników
  const { fields, remove } = useFieldArray({
    control,
    name: "technicians",
  });

  // Ładowanie techników z localStorage przy pierwszym renderze
  useEffect(() => {
    const data = localStorage.getItem("serviceSettings");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData.technicians);
      if (Array.isArray(parsedData.technicians)) {
        reset({ technicians: parsedData.technicians });
      }
    }
  }, [reset]);

  // Usuń technika i zapisz do localStorage
  const handleRemoveTechnician = (index: number) => {
    remove(index);
    setTimeout(() => {
      const current = getValues();
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed.technicians = current.technicians;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    });
  };

  // Dodaj technika i zapisz do localStorage
  const handleAddTechnician = () => {
    const fullName = getValues("addFullName").trim();
    const cardNumber = getValues("addCardNumber").trim();

    if (!fullName || !cardNumber) return;

    // 1. Utwórz nowego technika
    const newTechnician: Technician = { fullName, cardNumber };

    // 2. Pobierz AKTUALNĄ tablicę techników
    const currentTechnicians = getValues("technicians") || [];

    // 3. Zaktualizuj tablicę
    const updatedTechnicians = [...currentTechnicians, newTechnician];

    // 4. ZAPISZ OD RAZU do localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = storedData ? JSON.parse(storedData) : {};
    parsedData.technicians = updatedTechnicians;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));

    // 5. Dopiero teraz zaktualizuj formularz
    reset({
      technicians: updatedTechnicians,
      addFullName: "",
      addCardNumber: "",
    });
  };

  return (
    <Box sx={settingsTechniciansSx}>
      {/* Nagłówek sekcji */}
      <Typography variant="subtitle1" sx={settingsLabelSx}>
        Technicy
      </Typography>

      {/* Lista techników */}
      <Box>
        {fields.length === 0 ? (
          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ fontStyle: "italic", textAlign: "center", py: 2 }}
          >
            Brak techników
          </Typography>
        ) : (
          fields.map((field, index) => (
            <Box
              key={field.id}
              color={editSttings ? "text.primary" : "text.disabled"}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ flex: 1 }}>
                {field.fullName}
              </Typography>
              <Typography sx={{ flex: 1 }}>
                {field.cardNumber}
              </Typography>
              <IconButton
                color="error"
                onClick={() => handleRemoveTechnician(index)}
                disabled={!editSttings}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
      {/* Dodawanie nowego technika */}
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}>
      <TextField
        label="Imię i nazwisko"
        fullWidth
        disabled={!editSttings}
        inputProps={{ maxLength: 40 }}
        {...methods.register("addFullName", {
          required: "To pole jest wymagane",
          maxLength: {
            value: 40,
            message: `Maksymalnie 40 znaków`,
          },
        })}
        helperText={
          <>
            {methods.getValues("addFullName")?.length || 0}/40
            {errors.addFullName?.message && (
              <span style={{ color: "red", marginLeft: 8 }}>
                {errors.addFullName.message}
              </span>
            )}
          </>
        }
      />
      <TextField
        label="Nr karty warsztatowej"
        fullWidth
        disabled={!editSttings}
        inputProps={{ maxLength: 16, pattern: "[A-Za-z0-9]*" }}
        {...methods.register("addCardNumber", {
          required: "To pole jest wymagane",
          minLength: {
            value: 16,
            message: "Musi mieć dokładnie 16 znaków",
          },
          maxLength: {
            value: 16,
            message: "Musi mieć dokładnie 16 znaków",
          },
          pattern: {
            value: /^[A-Za-z0-9]+$/,
            message: "Tylko cyfry i litery",
          },
        })}
        helperText={
          <>
            {methods.getValues("addCardNumber")?.length || 0}/16
            {errors.addCardNumber?.message && (
              <span style={{ color: "red", marginLeft: 8 }}>
                {errors.addCardNumber.message}
              </span>
            )}
          </>
        }
      />
      <IconButton
        color="primary"
        disabled={!editSttings}
        sx={{
          width: 40,
          height: 40,
          border: "1px solid",
        }}
        onClick={handleSubmit(handleAddTechnician)}
      >
        <AddIcon />
      </IconButton>
    </Box>
    </Box>
  );
}
