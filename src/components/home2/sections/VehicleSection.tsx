import { Controller, type UseFormSetValue } from "react-hook-form";
import {
  Box,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Fade,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import type { Props } from "./interfaceProps.types";
import type { FormValues } from "../Home2.types";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { tachoLabelSx, tachoSectionSx } from "../Home2.styles";

interface Vehicle {
  name: string;
}

interface VehicleSectionProps extends Props {
  setValue: UseFormSetValue<FormValues>;
}

export function VehicleSection({
  control,
  errors,
  setValue,
}: VehicleSectionProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Pobierz marki pojazdów z localStorage (serviceSettings.vehicles)
  const handleOpenDialog = () => {
    const stored = localStorage.getItem("serviceSettings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const vehiclesArr: Vehicle[] = Array.isArray(parsed.vehicles)
          ? parsed.vehicles
          : [];
        setBrands(vehiclesArr.map((v) => v.name));
      } catch {
        setBrands([]);
      }
    } else {
      setBrands([]);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
    <Box sx={tachoSectionSx}>
      <Typography component="span" sx={tachoLabelSx}>
        Pojazd
      </Typography>
      <Stack direction="column" spacing={2}>
        {/* Marka pojazdu z wyborem z listy */}
        <Controller
          name="vehicleBrand"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marka pojazdu"
              error={!!errors.vehicleBrand}
              helperText={
                errors.vehicleBrand?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Wybierz markę pojazdu">
                      <IconButton
                        aria-label="Wybierz markę pojazdu"
                        edge="end"
                        onClick={handleOpenDialog}
                        ref={selectButtonRef}
                        size="small"
                      >
                        <DirectionsCarIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Dialog wyboru marki pojazdu */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          ref={dialogRef}
          TransitionComponent={Fade}
          keepMounted
          TransitionProps={{
            onExited: () => {
              if (selectButtonRef.current) {
                selectButtonRef.current.focus();
              }
            },
          }}
        >
          <DialogTitle>Wybierz markę pojazdu</DialogTitle>
          <DialogContent>
            <List>
              {brands.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Brak marek pojazdów w ustawieniach" />
                </ListItem>
              ) : (
                brands.map((brand, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setValue("vehicleBrand", brand, {
                          shouldValidate: true,
                        });
                        setOpenDialog(false);
                      }}
                    >
                      <ListItemText primary={brand} />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Anuluj</Button>
          </DialogActions>
        </Dialog>

        {/* Pozostałe ważne pola pojazdu */}
        <Controller
          name="vehicleModel"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Model pojazdu"
              error={!!errors.vehicleModel}
              helperText={
                errors.vehicleModel?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          name="vehicleVin"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 20, message: "Maksymalnie 20 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="VIN pojazdu"
              error={!!errors.vehicleVin}
              helperText={
                errors.vehicleVin?.message ??
                `${field.value?.length || 0}/20 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 20 }}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                // VIN wielkimi literami
                const upperValue = e.target.value.toUpperCase();
                field.onChange(upperValue);
              }}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
