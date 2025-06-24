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
  Divider
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
  defaultExpanded?: boolean;
};

const DisplayManufacturersComponent = ({
  manufacturers,
  onRemove,
  editSettings,
  defaultExpanded = false,
}: Props) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingRemoveIndex, setPendingRemoveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(defaultExpanded);

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

  const toggleExpand = () => {
    
      setExpanded(!expanded);
    
  };

  const inactiveColor = theme.palette.text.disabled;
  const inactiveIconColor = theme.palette.action.disabled;

  return (
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
          Producenci
        </Typography>
        
          <IconButton 
            size="small" 
            onClick={toggleExpand}
            aria-label={expanded ? "Zwiń sekcję" : "Rozwiń sekcję"}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        
      </Box>

      <Divider sx={{ my: 1 }} />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                      : theme.palette.primary.main,
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
                        e.stopPropagation();
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
            sx={{
              py: 2,
              color: !editSettings ? inactiveColor : theme.palette.text.secondary,
            }}
          >
            Brak producentów
          </Typography>
        )}
      </Collapse>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć tego producenta? Tej operacji nie można cofnąć.
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
    </Paper>
  );
};

export const DisplayManufacturers = React.memo(DisplayManufacturersComponent);