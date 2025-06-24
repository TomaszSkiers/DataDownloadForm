import React, { useState } from "react";
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

type Vehicle = {
  id: string;
  name: string;
};

type DisplayVehiclesProps = {
  vehicles: Vehicle[];
  onRemove?: (index: number) => void;
  editSettings?: boolean;
};

const ITEM_HEIGHT = 48;

export const DisplayVehicles: React.FC<DisplayVehiclesProps> = ({
  vehicles,
  onRemove,
  editSettings,
}) => {
  const theme = useTheme();
  const [showList, setShowList] = useState(false);
  const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  const inactiveColor = theme.palette.text.disabled;
  const inactiveIconColor = theme.palette.action.disabled;

  const handleRemoveClick = (index: number) => {
    setPendingRemoveIndex(index);
    setOpenDialog(true);
  };

  const handleConfirmRemove = () => {
    if (pendingRemoveIndex !== null && onRemove) {
      onRemove(pendingRemoveIndex);
    }
    setOpenDialog(false);
    setPendingRemoveIndex(null);
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setPendingRemoveIndex(null);
  };

  return (
    <Box
      sx={{
        mt: 3,
        border: "1px solid",
        borderColor: theme.palette.divider,
        p: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: !editSettings ? inactiveColor : undefined,
          }}
        >
          Pojazdy
        </Typography>
        <Tooltip
          title={showList ? "Ukryj listę pojazdów" : "Pokaż listę pojazdów"}
        >
          <IconButton
            aria-label={
              showList ? "Ukryj listę pojazdów" : "Pokaż listę pojazdów"
            }
            onClick={() => setShowList((prev) => !prev)}
            size="small"
          >
            {showList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={showList}>
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
                key={vehicle.id}
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
                      ? theme.palette.action.disabledBackground
                      : "primary.main",
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
                        e.currentTarget.blur();
                        handleRemoveClick(index);
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
                color: !editSettings ? inactiveColor : undefined,
              }}
            >
              Brak pojazdów
            </Typography>
          )}
        </Stack>
      </Collapse>

      {/* Okno dialogowe potwierdzające usunięcie */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          Czy na pewno chcesz usunąć ten pojazd? Tej operacji nie można cofnąć.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
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
    </Box>
  );
};

export default DisplayVehicles;
