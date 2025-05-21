import React, { useRef, useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

import { exportPdf } from "../functions/exportPdf";

/* ---------- typy i dane ---------- */

interface FormData {
  firstName: string;
  lastName: string;
}

const initialForm: FormData = { firstName: "", lastName: "" };

/* ---------- komponent ---------- */

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------- handlers ---------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaved(true);
  };

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: "application/json" });
    triggerDownload(blob, "dane_formularz.json");
  };



  const importJson = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data: unknown = JSON.parse(reader.result as string);
        if (
          typeof data === "object" &&
          data !== null &&
          "firstName" in data &&
          "lastName" in data
        ) {
          setForm(data as FormData);
          setIsSaved(true);
        } else {
          alert("Nieprawidłowa struktura danych.");
        }
      } catch {
        alert("Błąd podczas odczytu pliku.");
      }
    };
    reader.readAsText(file);
  };

  /* ---------- UI ---------- */

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Formularz danych osobowych</Typography>

      <TextField
        label="Imię"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Nazwisko"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        fullWidth
      />

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          disabled={!form.firstName || !form.lastName}
        >
          Zapisz
        </Button>
        <Button variant="outlined" onClick={importJson}>
          Importuj dane
        </Button>
      </Stack>

      <input
        hidden
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {isSaved && (
        <Stack direction="row" spacing={2} mt={1} justifyContent="center">
          <Button variant="outlined" color="secondary" onClick={exportJson}>
            Eksportuj JSON
          </Button>
          <Button variant="outlined" color="success" onClick={() => exportPdf(form)}>
            Generuj PDF
          </Button>
        </Stack>
      )}
    </Box>
  );
}
