import {
  Box,
  TextField,
  IconButton,
  Collapse,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { Controller, type Control, useFormState } from "react-hook-form";
import type { FormData } from "./types";
import { CharCounter } from "../../commonComponents/CharCounter";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type Props = {
  control: Control<FormData>;
  editSettings: boolean;
  defaultExpanded?: boolean;
};

export const ServiceData = ({
  control,
  editSettings,
  defaultExpanded = false,
}: Props) => {
  const { errors } = useFormState({ control });
  const [expanded, setExpanded] = useState(defaultExpanded);
  const theme = useTheme();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const inactiveColor = theme.palette.text.disabled;
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={toggleExpand}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
            borderRadius: 1,
          },
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
          Dane serwisu
        </Typography>
        <IconButton
          size="small"
          onClick={toggleExpand}
          aria-label={expanded ? "Zwiń sekcję" : "Rozwiń sekcję"}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="serviceName"
            control={control}
            rules={{
              required: "Nazwa serwisu jest wymagana",
              maxLength: { value: 75, message: "Maksymalnie 75 znaków" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwa serwisu"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.serviceName}
                helperText={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    minHeight={24}
                    width="100%"
                  >
                    <Typography
                      variant="caption"
                      color={errors.serviceName ? "error" : "textSecondary"}
                    >
                      {errors.serviceName?.message || " "}
                    </Typography>
                    <CharCounter
                      control={control}
                      name="serviceName"
                      max={75}
                    />
                  </Box>
                }
                inputProps={{ maxLength: 75 }}
                disabled={!editSettings}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name="serviceAddress"
            control={control}
            rules={{
              maxLength: { value: 150, message: "Maksymalnie 150 znaków" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Adres serwisu"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={!!errors.serviceAddress}
                helperText={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    minHeight={24}
                    width="100%"
                  >
                    <Typography
                      variant="caption"
                      color={errors.serviceAddress ? "error" : "textSecondary"}
                    >
                      {errors.serviceAddress?.message || " "}
                    </Typography>
                    <CharCounter
                      control={control}
                      name="serviceAddress"
                      max={150}
                    />
                  </Box>
                }
                inputProps={{ maxLength: 150 }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                disabled={!editSettings}
              />
            )}
          />
        </Box>
      </Collapse>
    </Paper>
  );
};
