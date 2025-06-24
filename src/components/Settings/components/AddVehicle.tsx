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

const addVehicleSchema = z.object({
  name: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(40, "Maksymalnie 40 znaków"),
});

type AddVehicleForm = z.infer<typeof addVehicleSchema>;

type AddVehicleProps = {
  onAdd: (vehicle: AddVehicleForm) => void;
  editSettings?: boolean;
  defaultExpanded?: boolean;
};

const AddVehicleComponent = ({ 
  onAdd, 
  editSettings,
  defaultExpanded = false 
}: AddVehicleProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<AddVehicleForm>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: { name: "" },
    mode: "onChange"
  });

  const onSubmit = (data: AddVehicleForm) => {
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

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          onClick={editSettings ? toggleExpand : undefined}
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
            Dodaj pojazd
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
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nazwa pojazdu"
                  variant="outlined"
                  fullWidth
                  disabled={!editSettings}
                  error={!!errors.name}
                  helperText={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      minHeight={24}
                      width="100%"
                    >
                      <Typography 
                        variant="caption" 
                        color={errors.name ? "error" : "textSecondary"}
                      >
                        {errors.name?.message || " "}
                      </Typography>
                      <CharCounter control={control} name="name" max={40} />
                    </Box>
                  }
                  inputProps={{ maxLength: 40 }}
                  InputProps={{
                    endAdornment: editSettings && (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          color="primary"
                          type="submit"
                          disabled={!isDirty || !isValid}
                          aria-label="Dodaj pojazd"
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
          Pojazd został dodany pomyślnie!
        </Alert>
      </Snackbar>
    </>
  );
};

export const AddVehicle = React.memo(AddVehicleComponent);