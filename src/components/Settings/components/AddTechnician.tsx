import React, { useEffect, useState } from "react";
import { 
  Box, 
  TextField, 
  Typography, 
  useTheme,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Collapse,
  Snackbar,
  Alert
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharCounter } from "../../commonComponents/CharCounter";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const addTechnicianSchema = z.object({
  fullName: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(40, "Maksymalnie 40 znaków"),
  number: z
    .string()
    .length(16, "Numer musi mieć dokładnie 16 znaków")
    .regex(/^[A-Za-z0-9]{16}$/, "Tylko litery lub cyfry, bez spacji"),
});

type AddTechnicianForm = z.infer<typeof addTechnicianSchema>;

type AddTechnicianProps = {
  onAdd: (technician: AddTechnicianForm) => void;
  editSettings?: boolean;
  defaultExpanded?: boolean;
};

const AddTechnicianComponent = ({ 
  onAdd, 
  editSettings,
  defaultExpanded = false 
}: AddTechnicianProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<AddTechnicianForm>({
    resolver: zodResolver(addTechnicianSchema),
    defaultValues: { fullName: "", number: "" },
    mode: "onChange"
  });

  const onSubmit = (data: AddTechnicianForm) => {
    onAdd(data);
    reset();
    setShowSuccess(true);
  };

  useEffect(() => {
    if (!editSettings) {
      reset();
      setExpanded(false);
    }
  }, [editSettings, reset]);

  const inactiveColor = theme.palette.text.disabled;

  const toggleExpand = () => {
    if (editSettings) {
      setExpanded(!expanded);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 3,
          borderLeft: `4px solid ${theme.palette.primary.main}`
        }}
      >
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={toggleExpand}
          sx={{ 
            cursor: editSettings ? "pointer" : "default",
            '&:hover': editSettings ? {
              backgroundColor: theme.palette.action.hover,
              borderRadius: 1
            } : {},
            p: 1,
            ml: -1
          }}
        >
          <Typography 
            variant="h6" 
            component="h2"
            sx={{
              color: !editSettings ? inactiveColor : undefined,
            }}
          >
            Dodaj technika
          </Typography>
          {editSettings && (
            <IconButton 
              size="small" 
              onClick={toggleExpand}
              aria-label={expanded ? "Zwiń sekcję" : "Rozwiń sekcję"}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        <Divider sx={{ my: 1 }} />

        <Collapse in={expanded && !!editSettings} timeout="auto" unmountOnExit>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Imię i nazwisko"
                  variant="outlined"
                  fullWidth
                  disabled={!editSettings}
                  error={!!errors.fullName}
                  helperText={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      minHeight={24}
                      width="100%"
                    >
                      <Typography 
                        variant="caption" 
                        color={errors.fullName ? "error" : "textSecondary"}
                      >
                        {errors.fullName?.message || " "}
                      </Typography>
                      <CharCounter control={control} name="fullName" max={40} />
                    </Box>
                  }
                  inputProps={{ maxLength: 40 }}
                />
              )}
            />

            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nr karty warsztatowej"
                  variant="outlined"
                  fullWidth
                  disabled={!editSettings}
                  error={!!errors.number}
                  helperText={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      minHeight={24}
                      width="100%"
                    >
                      <Typography 
                        variant="caption" 
                        color={errors.number ? "error" : "textSecondary"}
                      >
                        {errors.number?.message || " "}
                      </Typography>
                      <CharCounter control={control} name="number" max={16} />
                    </Box>
                  }
                  inputProps={{ maxLength: 16 }}
                  InputProps={{
                    endAdornment: editSettings && (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          color="primary"
                          type="submit"
                          disabled={!isDirty || !isValid}
                          aria-label="Dodaj technika"
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isDirty && isValid) {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
              )}
            />
          </Box>
        </Collapse>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Technik został dodany pomyślnie!
        </Alert>
      </Snackbar>
    </>
  );
};

export const AddTechnician = React.memo(AddTechnicianComponent);