import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";

// ---
// Types
// ---
type Vehicle = {
  id: string;
  name: string;
};

type DisplayVehiclesProps = {
  vehicles: Vehicle[];
  onRemove?: (index: number) => void;
  editSettings?: boolean;
  defaultExpanded?: boolean;
};

// ---
// Constants
// ---
const ITEM_HEIGHT = 48; // Consider if this is still needed or can be derived from theme spacing

// ---
// DisplayVehicles Component
// ---
export const DisplayVehicles: React.FC<DisplayVehiclesProps> = ({
  vehicles,
  onRemove,
  editSettings,
  defaultExpanded = false,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  // Derive colors from theme for consistency
  const inactiveColor = theme.palette.text.disabled;
  const inactiveIconColor = theme.palette.action.disabled;
  const primaryMainColor = theme.palette.primary.main;
  const actionHoverColor = theme.palette.action.hover;
  const actionDisabledBackground = theme.palette.action.disabledBackground;

  // ---
  // Handlers
  // ---

  const handleOpenRemoveDialog = useCallback((index: number) => {
    setPendingRemoveIndex(index);
    setOpenDialog(true);
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (pendingRemoveIndex !== null && onRemove) {
      onRemove(pendingRemoveIndex);
    }
    setOpenDialog(false);
    setPendingRemoveIndex(null);
  }, [pendingRemoveIndex, onRemove]);

  const handleCancelRemove = useCallback(() => {
    setOpenDialog(false);
    setPendingRemoveIndex(null);
  }, []);

  const toggleExpand = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  // ---
  // Render Helpers
  // ---

  const MemoizedVehicleList = React.memo(() => (
    <Stack
      spacing={2}
      sx={{
        maxHeight: ITEM_HEIGHT * 5,
        overflowY: "auto",
        pr: 1,
      }}
    >
      {vehicles.length > 0 ? (
        vehicles.map((vehicle, index) => (
          <Paper
            key={vehicle.id || index}
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              borderRadius: 2,
              bgcolor: theme.palette.background.default,
              gap: 2,
              opacity: !editSettings ? 0.7 : 1,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                color: !editSettings ? inactiveIconColor : undefined,
                bgcolor: !editSettings
                  ? actionDisabledBackground
                  : primaryMainColor,
              }}
            >
              <DirectionsCarIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  color: !editSettings ? inactiveColor : undefined,
                }}
              >
                {vehicle.name}
              </Typography>
            </Box>
            {editSettings && onRemove && (
              <Tooltip title="Usuń pojazd">
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenRemoveDialog(index);
                  }}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Paper>
        ))
      ) : (
        <Typography
          align="center"
          color="text.secondary"
          sx={{
            py: 2,
            color: !editSettings ? inactiveColor : undefined,
          }}
        >
          Brak pojazdów
        </Typography>
      )}
    </Stack>
  ));

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderLeft: `4px solid ${primaryMainColor}`,
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        // onClick={toggleExpand} // Removed here to prevent double-triggering when clicking the icon
        sx={{
          cursor: editSettings ? "pointer" : "default",
          "&:hover": editSettings
            ? {
                backgroundColor: actionHoverColor,
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
          Pojazdy
        </Typography>
        <IconButton
          size="small"
          onClick={toggleExpand} // This is the crucial fix: add onClick to IconButton
          aria-label={expanded ? "Zwiń sekcję" : "Rozwiń sekcję"}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2 }}>
          <MemoizedVehicleList />
        </Box>
      </Collapse>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelRemove}>
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          Czy na pewno chcesz usunąć ten pojazd? Tej operacji nie można cofnąć.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove} color="primary">
            Anuluj
          </Button>
          <Button
            onClick={handleConfirmRemove}
            color="error"
            variant="contained"
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DisplayVehicles;