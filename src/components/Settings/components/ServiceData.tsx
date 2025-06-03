import { Box, TextField } from "@mui/material"
import { Controller, type Control } from "react-hook-form";
import type { FormData } from "./types"; 

type Props = {
    control: Control<FormData>;
};

export const ServiceData = ({control}: Props) => {

    return (
        <Box > 
            <Controller  
                name="serviceName"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nazwa serwisu"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                )}
            />
        </Box>
    )
}