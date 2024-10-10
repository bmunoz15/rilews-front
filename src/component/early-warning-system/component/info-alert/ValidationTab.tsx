import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import theme from '../../../shared/theme/Theme';
import { useAuth } from '../../../users/context/AuthenticationContext';

interface ValidationsTabProps {
    dmcStatus: string;
    forecastDate: string;
    forecastTargetDate: string;
}

const ValidationsTab: React.FC<ValidationsTabProps> = ({ dmcStatus, forecastDate, forecastTargetDate }) => {
    const { authData } = useAuth();

    const [sernageominValidated, setSernageominValidated] = useState(false);
    const [sernageominValidationDate, setSernageominValidationDate] = useState<string | null>(null);
    const [senapredValidated, setSenapredValidated] = useState(false);
    const [senapredValidationDate, setSenapredValidationDate] = useState<string | null>(null);

    const handleValidationToggle = (service: string) => {
        const now = new Date().toLocaleString();

        if (service === 'Sernageomin') {
            if (!sernageominValidated) {
                setSernageominValidationDate(now);
            } else {
                setSernageominValidationDate(now);
            }
            setSernageominValidated(!sernageominValidated);
        } else if (service === 'Senapred') {
            if (!senapredValidated) {
                setSenapredValidationDate(now);
            } else {
                setSenapredValidationDate(now);
            }
            setSenapredValidated(!senapredValidated);
        }
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
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',

                }}
            >
                <Grid container >
                    <Grid item xs={7}>
                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                            Estado DMC: <strong>{dmcStatus}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={7} sx={{ textAlign: 'left' }}>
                        <Typography variant="body1">
                            Estado Sernageomin: <strong>{sernageominValidated ? 'Validado' : 'No validado'}</strong>
                        </Typography>
                        <Typography variant="body1">
                            Fecha Validación: {sernageominValidationDate ?? 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {authData?.role === 'SERNAGEOMIN' || authData?.role === 'ADMIN' ? (
                            <Button
                                variant="outlined"
                                onClick={() => handleValidationToggle('Sernageomin')}
                                sx={{
                                    textTransform: 'none',
                                    padding: '8px 16px',
                                    fontWeight: 'bold',
                                    color: sernageominValidated ? 'error.main' : 'success.main',
                                    borderColor: sernageominValidated ? 'error.light' : 'success.light',
                                    '&:hover': {
                                        borderColor: sernageominValidated ? 'error.dark' : 'success.dark',
                                    }
                                }}
                            >
                                {sernageominValidated ? 'Quitar Validación' : 'Validar'}
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid item xs={7} sx={{ textAlign: 'left' }}>
                        <Typography variant="body1">
                            Estado Senapred: <strong>{senapredValidated ? 'Validado' : 'No validado'}</strong>
                        </Typography>
                        <Typography variant="body1">
                            Fecha Validación: {senapredValidationDate ?? 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {authData?.role === 'SENAPRED' || authData?.role === 'ADMIN' ? (
                            <Button
                                variant="outlined"
                                onClick={() => handleValidationToggle('Senapred')}
                                sx={{
                                    textTransform: 'none',
                                    padding: '8px 16px',
                                    fontWeight: 'bold',
                                    color: senapredValidated ? 'error.main' : 'success.main',
                                    borderColor: senapredValidated ? 'error.light' : 'success.light',
                                    '&:hover': {
                                        borderColor: senapredValidated ? 'error.dark' : 'success.dark',
                                    }
                                }}
                            >
                                {senapredValidated ? 'Quitar Validación' : 'Validar'}
                            </Button>
                        ) : null}
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{

                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: theme.palette.grey[100],
                }}
            >

                <Grid item xs={6}>
                    <Typography variant="body1">
                        Fecha de creación: <strong>{forecastDate}</strong>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1">
                        Fecha de pronóstico: <strong>{forecastTargetDate}</strong>
                    </Typography>
                </Grid>


            </Box>
        </Box >
    );
};

export default ValidationsTab;
