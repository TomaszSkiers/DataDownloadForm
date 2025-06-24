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
  Divider
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";

type Technician = {
  id: string;
  fullName: string;
  number: string;
};

type DisplayTechniciansProps = {
  technicians: Technician[];
  onRemove?: (index: number) => void;
  editSettings?: boolean;
  defaultExpanded?: boolean;
};

const ITEM_HEIGHT = 48;

export const DisplayTechnicians: React.FC<DisplayTechniciansProps> = ({
  technicians,
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

  const toggleExpand = () => {
    
      setExpanded(!expanded);
    
  };

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
          Technicy
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
        <Stack
          spacing={2}
          sx={{
            maxHeight: ITEM_HEIGHT * 5,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {technicians.length > 0 ? (
            technicians.map((technician, index) => (
              <Paper
                key={technician.id}
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
                  <PersonIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      color: !editSettings ? inactiveColor : undefined,
                    }}
                  >
                    {technician.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: !editSettings ? inactiveColor : theme.palette.text.secondary,
                    }}
                  >
                    {technician.number}
                  </Typography>
                </Box>
                {editSettings && onRemove && (
                  <Tooltip title="Usuń technika">
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
            ))
          ) : (
            <Typography
              align="center"
              sx={{
                py: 2,
                color: !editSettings ? inactiveColor : theme.palette.text.secondary,
              }}
            >
              Brak techników
            </Typography>
          )}
        </Stack>
      </Collapse>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Potwierdź usunięcie</DialogTitle>
        <DialogContent>
          Czy na pewno chcesz usunąć tego technika? Tej operacji nie można cofnąć.
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

export default DisplayTechnicians;