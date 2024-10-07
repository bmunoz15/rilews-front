import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import theme from '../../../shared/theme/Theme'
interface ValidationsTabProps {

    dmcStatus: string;
    forecastDate: string;
    forecastTargetDate: string;

}
const ValidationsTab: React.FC<ValidationsTabProps> = ({ dmcStatus, forecastDate, forecastTargetDate }) => {

    const handleValidation = () => {
        alert('Alerta validada exitosamente.');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Estado de la Alerta: <strong>Alerta de remoción en masa</strong>
            </Typography>
            <Box
                sx={{
                    padding: '16px',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <Box mb={2}>
                    <Typography variant="body1">
                        Estado DMC: <strong>{dmcStatus}</strong>
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Typography variant="body1">
                        Estado Sernageomin: <strong>SIN validar</strong>
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Typography variant="body1">
                        Fecha de creación: <strong>{forecastDate}</strong>
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body1">
                        Fecha de pronóstico: <strong>{forecastTargetDate}</strong>
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Typography variant="body1">Fecha de validación: <strong>None</strong></Typography>

                </Box>

                <Box textAlign="center" mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleValidation}
                        sx={{
                            textTransform: 'none',
                            padding: '8px 16px',
                            fontWeight: 'bold',
                        }}
                    >
                        Validar Alerta
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default ValidationsTab;
