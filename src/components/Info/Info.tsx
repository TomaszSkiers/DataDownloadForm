import React from 'react';
import { Card, CardContent, Typography, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Info: React.FC = () => {
    return (
        <Card sx={{ maxWidth: 500, margin: '2rem auto', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    <InfoIcon color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Witaj w aplikacji!
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                    Ta aplikacja pozwala na szybkie pobieranie i analizę danych.
                </Alert>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Najważniejsze funkcje:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Łatwe pobieranie danych" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Intuicyjny interfejs użytkownika" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Bezpieczne przechowywanie informacji" />
                    </ListItem>
                </List>
                <Typography variant="caption" color="text.secondary">
                    Skontaktuj się z nami w razie pytań lub problemów.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Info;