import { Controller, type UseFormSetValue } from "react-hook-form";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

import type { Props } from "./interfaceProps.types";
import type { FormValues } from "../Home2.types";
import { serviceLabelSx, serviceSectionSx } from "../Home2.styles";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

interface Technician {
  fullName: string;
  number: string;
}

interface ServiceSectionProps extends Props {
  setValue: UseFormSetValue<FormValues>;
}

export function ServiceSection({
  control,
  errors,
  setValue,
}: ServiceSectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleOpenDialog = (e?: React.MouseEvent) => {
    if (e) (e.currentTarget as HTMLButtonElement).blur();
    const stored = localStorage.getItem("serviceSettings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTechnicians(parsed.technicians ?? []);
      } catch {
        setTechnicians([]);
      }
    } else {
      setTechnicians([]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectTechnician = (tech: Technician) => {
    const [firstName = "", lastName = ""] = tech.fullName.split(" ");
    setValue("technicianFirstName", firstName);
    setValue("technicianLastName", lastName);
    setValue("workshopCardNumber", tech.number);
    handleCloseDialog();
  };

  useEffect(() => {
    if (openDialog && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [openDialog]);

  return (
    <Box sx={serviceSectionSx}>
      <Typography component="span" sx={serviceLabelSx}>
        Dane serwisu i technika
      </Typography>
      <Stack direction="column" spacing={2}>
        <Controller
          name="serviceName"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nazwa serwisu"
              error={!!errors.serviceName}
              helperText={errors.serviceName?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Pobierz dane z ustawień">
                      <IconButton
                        aria-label="Pobierz dane z ustawień"
                        edge="end"
                        onClick={() => {
                          const stored =
                            localStorage.getItem("serviceSettings");
                          if (stored) {
                            try {
                              const parsed = JSON.parse(stored);
                              setValue("serviceName", parsed.serviceName || "");
                              setValue(
                                "serviceAddress",
                                parsed.serviceAddress || ""
                              );
                            } catch {
                              // Możesz dodać obsługę błędu, np. snackbar
                            }
                          }
                        }}
                        size="small"
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="serviceAddress"
          control={control}
          rules={{ required: "To pole jest wymagane" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Adres serwisu"
              error={!!errors.serviceAddress}
              helperText={errors.serviceAddress?.message}
              fullWidth
            />
          )}
        />

        <Stack direction="row" spacing={2}>
          <Controller
            name="technicianFirstName"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Imię technika"
                error={!!errors.technicianFirstName}
                helperText={errors.technicianFirstName?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="technicianLastName"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwisko technika"
                error={!!errors.technicianLastName}
                helperText={errors.technicianLastName?.message}
                fullWidth
              />
            )}
          />
        </Stack>

        <Controller
          name="workshopCardNumber"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            validate: (value: string) =>
              value.length === 16 || "Pole musi zawierać dokładnie 16 znaków",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nr karty warsztatowej"
              error={!!errors.workshopCardNumber}
              helperText={
                isFocused
                  ? `${field.value?.length || 0}/16`
                  : errors.workshopCardNumber?.message || " "
              }
              fullWidth
              inputProps={{ maxLength: 16 }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur?.();
              }}
              onChange={(e) => {
                const upperValue = e.target.value.toUpperCase();
                field.onChange(upperValue);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Wybierz technika">
                      <IconButton
                        aria-label="Wybierz technika"
                        edge="end"
                        onClick={handleOpenDialog}
                        ref={selectButtonRef}
                        size="small"
                      >
                        <PersonSearchIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Okno dialogowe wyboru technika */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          ref={dialogRef}
          keepMounted={false}
          TransitionProps={{
            onExited: () => {
              if (selectButtonRef.current) {
                selectButtonRef.current.focus();
              }
            },
          }}
        >
          <DialogTitle>Wybierz technika</DialogTitle>
          <DialogContent>
            <List>
              {technicians.length === 0 && (
                <ListItem>
                  <ListItemText primary="Brak techników w ustawieniach" />
                </ListItem>
              )}
              {technicians.map((tech, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleSelectTechnician(tech);
                      setOpenDialog(false);
                    }}
                  >
                    <ListItemText
                      primary={tech.fullName}
                      secondary={`Nr karty: ${tech.number}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Anuluj</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
}
