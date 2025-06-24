import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Paper,
  IconButton,
  InputAdornment,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CharCounter } from "../../commonComponents/CharCounter"; // Assuming this path is correct
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// ---
// Zod Schema for validation
// ---
const addTechnicianSchema = z.object({
  fullName: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(40, "Maksymalnie 40 znaków"),
});

// ---
// Type Definition for Form Data
// ---
type AddTechnicianForm = z.infer<typeof addTechnicianSchema>;

// ---
// Props for the AddTechnicianComponent
// ---
type AddTechnicianProps = {
  onAdd: (technician: AddTechnicianForm) => void;
  editSettings?: boolean;
  defaultExpanded?: boolean;
};

// ---
// AddTechnicianComponent
// ---
const AddTechnicianComponent = ({
  onAdd,
  editSettings,
  defaultExpanded = false,
}: AddTechnicianProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<AddTechnicianForm>({
    resolver: zodResolver(addTechnicianSchema),
    defaultValues: { fullName: "" },
    mode: "onChange",
  });

  // Callback for form submission
  const onSubmit = useCallback((data: AddTechnicianForm) => {
    onAdd(data);
    reset(); // Reset form fields after successful submission
    setShowSuccess(true); // Show success snackbar
  }, [onAdd, reset]);

  // Effect to reset form and collapse section when editSettings changes
  useEffect(() => {
    if (!editSettings) {
      reset();
      setExpanded(false);
    }
  }, [editSettings, reset]);

  // Theme color for inactive state
  const inactiveColor = theme.palette.text.disabled;

  // Callback to toggle the expansion state of the section
  const toggleExpand = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling (e.g., if parent also has an onClick)
    if (editSettings) { // Only allow toggling if editSettings is true
      setExpanded((prevExpanded) => !prevExpanded);
    }
  }, [editSettings]);

  // Callback to close the success snackbar
  const handleCloseSnackbar = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          borderLeft: `4px solid ${theme.palette.primary.main}`,
        }}
      >
        {/* Header section with title and expand/collapse icon */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={editSettings ? toggleExpand : undefined} // Whole header is clickable to toggle
          sx={{
            cursor: editSettings ? "pointer" : "default",
            "&:hover": editSettings
              ? {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                }
              : {},
            p: 1,
            ml: -1,
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
              onClick={toggleExpand} // Explicitly make the icon clickable to toggle
              aria-label={expanded ? "Zwiń sekcję" : "Rozwiń sekcję"}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        {/* Collapsible form section */}
        <Collapse in={expanded && !!editSettings} timeout="auto" unmountOnExit>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Full Name TextField controlled by react-hook-form */}
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Imię i nazwisko technika"
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
                      {/* CharCounter component for character count */}
                      <CharCounter control={control} name="fullName" max={40} />
                    </Box>
                  }
                  // *** THE CRUCIAL FIX FOR HTML NESTING ERROR ***
                  // By setting component to "div", we avoid <p> nested inside <div> issues.
                  FormHelperTextProps={{ component: "div" }}
                  // *** END FIX ***
                  inputProps={{ maxLength: 40 }}
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
                      handleSubmit(onSubmit)(); // Trigger form submission on Enter key
                    }
                  }}
                />
              )}
            />
          </Box>
        </Collapse>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Technik został dodany pomyślnie!
        </Alert>
      </Snackbar>
    </>
  );
};

// Memoize the component for performance optimization
export const AddTechnician = React.memo(AddTechnicianComponent);