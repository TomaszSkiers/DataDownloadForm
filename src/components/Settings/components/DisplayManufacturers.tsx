import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  Collapse,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type ManufacturerWithId = {
  id: string;
  name: string;
};

type Props = {
  manufacturers: ManufacturerWithId[];
  onRemove?: (index: number) => void;
  editSettings?: boolean;
};

const DisplayManufacturersComponent = ({
  manufacturers,
  onRemove,
  editSettings,
}: Props) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(
    null
  );
  const [expanded, setExpanded] = useState(false);

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

  const inactiveColor = theme.palette.text.disabled;
  const inactiveIconColor = theme.palette.action.disabled;

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
          Producenci
        </Typography>
        <Tooltip
          title={
            expanded ? "Ukryj listę producentów" : "Pokaż listę producentów"
          }
        >
          <IconButton
            aria-label={
              expanded ? "Ukryj listę producentów" : "Pokaż listę producentów"
            }
            onClick={() => setExpanded((prev) => !prev)}
            size="small"
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={expanded}>
        {manufacturers.length > 0 ? (
          <Stack spacing={2}>
            {manufacturers.map((manufacturer, index) => (
              <Paper
                key={manufacturer.id}
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
                  <BusinessIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      color: !editSettings ? inactiveColor : undefined,
                    }}
                  >
                    {manufacturer.name}
                  </Typography>
                </Box>
                {editSettings && onRemove && (
                  <Tooltip title="Usuń producenta">
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
            ))}
          </Stack>
        ) : (
          <Typography
            align="center"
            color="text.secondary"
            sx={{
              color: !editSettings ? inactiveColor : undefined,
            }}
          >
            Brak producentów
          </Typography>
        )}
      </Collapse>

      {/* Okno dialogowe potwierdzające usunięcie */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć tego producenta? Tej operacji nie można
            cofnąć.
          </DialogContentText>
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

export const DisplayManufacturers = React.memo(DisplayManufacturersComponent);
