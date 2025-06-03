import { Box } from "@mui/material";
import type { Technician } from "./types";

type Props = {
  technicians: Technician[];
};

export const DisplayTechnicians = ({ technicians }: Props) => {
  return (
    <Box sx={{ mt: 3, border: "1px solid #eee", p: 2, borderRadius: 1 }}>
      <h3>Technicy</h3>
      {technicians.length > 0 ? (
        technicians.map((tech, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
          >
            <span>{tech.fullName}</span>
            <span>{tech.number}</span>
          </Box>
        ))
      ) : (
        <Box sx={{ textAlign: "center", color: "text.secondary" }}>
          Brak techników
        </Box>
      )}
    </Box>
  );
};
