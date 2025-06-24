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
import { CharCounter } from "../../commonComponents/CharCounter";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useEffect, useState } from "react";

const addManufacturerSchema = z.object({
  name: z
    .string()
    .min(1, "To pole jest wymagane")
    .max(75, "Maksymalnie 75 znaków"),
});

type AddManufacturerForm = z.infer<typeof addManufacturerSchema>;

type AddManufacturerProps = {
  onAdd: (manufacturer: AddManufacturerForm) => void;
  editSettings?: boolean;
  defaultExpanded?: boolean;
};

const AddManufacturerComponent = ({
  onAdd,
  editSettings,
  defaultExpanded = false,
}: AddManufacturerProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<AddManufacturerForm>({
    resolver: zodResolver(addManufacturerSchema),
    defaultValues: { name: "" },
    mode: "onChange",
  });

  const onSubmit = (data: AddManufacturerForm) => {
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
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          onClick={toggleExpand}
          sx={{
            cursor: editSettings ? "pointer" : "default",
            "&:hover": editSettings
              ? {
                  backgroundColor: theme.palette.action.hover,
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
              flexGrow: 1,
              color: !editSettings ? inactiveColor : undefined,
            }}
          >
            Dodaj producenta
          </Typography>
          {editSettings && (
            <IconButton
              size="small"
              onClick={toggleExpand}
              aria-label={expanded ? "Zwiń sekcję" : "Rozwiń sekcję"}
              sx={{ mr: -1 }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        <Collapse in={expanded && !!editSettings} timeout="auto" unmountOnExit>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              px: 2,
              pb: 2,
              pt: 2,
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nazwa producenta"
                  variant="outlined"
                  fullWidth
                  disabled={!editSettings}
                  error={!!errors.name}
                  FormHelperTextProps={{
                    component: "div", // Naprawia problem z <div> wewnątrz <p>
                  }}
                  helperText={
                    <Box
                      component="span"
                      display="flex"
                      justifyContent="space-between"
                      minHeight={24}
                      width="100%"
                    >
                      <Typography
                        component="span"
                        variant="caption"
                        color={errors.name ? "error" : "textSecondary"}
                      >
                        {errors.name?.message || " "}
                      </Typography>
                      <CharCounter control={control} name="name" max={75} />
                    </Box>
                  }
                  inputProps={{ maxLength: 75 }}
                  InputProps={{
                    endAdornment: editSettings && (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          color="primary"
                          type="submit"
                          disabled={!isDirty || !isValid}
                          aria-label="Dodaj producenta"
                          sx={{ mr: -1 }}
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Producent został dodany pomyślnie!
        </Alert>
      </Snackbar>
    </>
  );
};

export const AddManufacturer = React.memo(AddManufacturerComponent);
