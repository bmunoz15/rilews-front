import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import BoxPlot from '../../../shared/charts/BoxPlot';

interface AlertTabProps {
    q1: number;
    median: number;
    q3: number;
    color: string;
    forecastTargetDate: string;
}

const AlertTab: React.FC<AlertTabProps> = ({ q1, median, q3, color, forecastTargetDate }) => {

    const soilData = [
        { name: 'Zona A', type: 'Arenoso', cohesion: 'Alta' },
        { name: 'Zona B', type: 'Arcilloso', cohesion: 'Media' },
        { name: 'Zona B', type: 'Arcilloso', cohesion: 'Media' },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
                <WarningIcon style={{ color, filter: 'drop-shadow(1px 1px 1px black)', fontSize: 40 }} />
                <Typography variant="h5" align="center">
                    Predicción de alerta de remoción en masa <br />
                    {forecastTargetDate}
                </Typography>
            </Box>
            <Box textAlign="center" mb={2}>
                <Box
                    height={300}
                    bgcolor="#f6f6f6"
                    p={2}
                    borderRadius="8px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <BoxPlot q1={q1} mediana={median} q3={q3} />
                </Box>
            </Box>
            <Box textAlign="center">
                <Typography variant="h6" mb={2}>Características del suelo</Typography>
                <List>
                    {soilData.map((zone, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Nombre de zona: ${zone.name}`}
                                secondary={`Tipo de suelo: ${zone.type}, Cohesión: ${zone.cohesion}`}
                                primaryTypographyProps={{ align: 'center', style: { color: 'black' } }}
                                secondaryTypographyProps={{ align: 'center', style: { color: 'black' } }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default AlertTab;
