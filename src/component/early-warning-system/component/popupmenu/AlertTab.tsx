import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const AlertTab: React.FC = () => {
    // Simulación de datos
    const soilData = [
        { name: 'Zona A', type: 'Arenoso', cohesion: 'Alta' },
        { name: 'Zona B', type: 'Arcilloso', cohesion: 'Media' },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={1}>
                <WarningIcon color="error" />
                <Typography variant="body1">
                    Predicción de alerta de remoción en masa - 15/09/2024
                </Typography>
            </Box>
            <Box mt={2}>
                <Typography variant="h6">Boxplot (Simulado)</Typography>
                {/* Aquí iría el gráfico real */}
                <Box
                    height={150}
                    bgcolor="lightgrey"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    Gráfico de Boxplot
                </Box>
            </Box>
            <Box mt={2}>
                <Typography variant="h6">Características del suelo</Typography>
                <List>
                    {soilData.map((zone, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Nombre de zona: ${zone.name}`}
                                secondary={`Tipo de suelo: ${zone.type}, Cohesión: ${zone.cohesion}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default AlertTab;
