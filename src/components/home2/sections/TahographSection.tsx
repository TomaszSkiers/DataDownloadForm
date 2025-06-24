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
import { tachoLabelSx, tachoSectionSx } from "../Home2.styles";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface Manufacturer {
  name: string;
}

interface TagographSectionProps extends Props {
  setValue: UseFormSetValue<FormValues>;
}

export function TahographSection({
  control,
  errors,
  setValue,
}: TagographSectionProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Pobierz marki tachografów z localStorage (serviceSettings.manufacturers)
  const handleOpenDialog = () => {
    const stored = localStorage.getItem("serviceSettings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const manufacturers: Manufacturer[] = Array.isArray(
          parsed.manufacturers
        )
          ? parsed.manufacturers
          : [];
        setBrands(manufacturers.map((m) => m.name));
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
        Tachograf
      </Typography>
      <Stack direction="column" spacing={2}>
        <Controller
          name="tachoBrand"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marka tachografu"
              error={!!errors.tachoBrand}
              helperText={
                errors.tachoBrand?.message ??
                `${field.value?.length || 0}/75 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 75 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Wybierz markę tachografu">
                      <IconButton
                        aria-label="Wybierz markę tachografu"
                        edge="end"
                        onClick={handleOpenDialog}
                        ref={selectButtonRef}
                        size="small"
                      >
                        <ListAltIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Dialog wyboru marki tachografu z efektem Fade */}
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
          <DialogTitle>Wybierz markę tachografu</DialogTitle>
          <DialogContent>
            <List>
              {brands.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Brak marek w ustawieniach" />
                </ListItem>
              ) : (
                brands.map((brand, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setValue("tachoBrand", brand, { shouldValidate: true });
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

        <Controller
          name="tachoSerial"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 20, message: "Maksymalnie 20 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nr seryjny tachografu"
              error={!!errors.tachoSerial}
              helperText={
                errors.tachoSerial?.message ??
                `${field.value?.length || 0}/20 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 20 }}
              onChange={(e) => {
                const upperValue = e.target.value.toUpperCase();
                field.onChange(upperValue);
              }}
            />
          )}
        />

        <Controller
          name="tachoYear"
          control={control}
          rules={{
            required: "To pole jest wymagane",
            maxLength: { value: 17, message: "Maksymalnie 17 znaków" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rok produkcji tachografu"
              error={!!errors.tachoYear}
              helperText={
                errors.tachoYear?.message ??
                `${field.value?.length || 0}/17 znaków`
              }
              fullWidth
              inputProps={{ maxLength: 17 }}
              onChange={(e) => {
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
