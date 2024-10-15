import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import theme from '../../../shared/theme/Theme';
import { useAuth } from '../../../users/context/AuthenticationContext';
import { useValidation } from '../../context/ValidationAlertProvider';
interface ValidationsTabProps {
    alertId: string; 
    dmcStatus: string;
    forecastDate: string;
    forecastTargetDate: string;
}

const ValidationsTab: React.FC<ValidationsTabProps> = ({ alertId, dmcStatus, forecastDate, forecastTargetDate }) => {
    const { validationStatus, setValidationStatus } = useValidation();
    const { hasPermission } = useAuth();

    const alertValidation = validationStatus[alertId] || {
        sernageominValidated: false,
        sernageominValidationDate: null,
        senapredValidated: false,
        senapredValidationDate: null,
    };

    const handleValidationToggle = (service: string) => {
        const now = new Date().toLocaleString();

        if (service === 'Sernageomin') {
            setValidationStatus(alertId, {
                ...alertValidation,
                sernageominValidated: !alertValidation.sernageominValidated,
                sernageominValidationDate: now,
            });
        } else if (service === 'Senapred') {
            setValidationStatus(alertId, {
                ...alertValidation,
                senapredValidated: !alertValidation.senapredValidated,
                senapredValidationDate: now,
            });
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
                <Grid container>
                    <Grid item xs={7}>
                        <Typography variant="body1" sx={{ textAlign: 'left' }}>
                            Estado DMC: <strong>{dmcStatus}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={7} sx={{ textAlign: 'left' }}>
                        <Typography variant="body1">
                            Estado Sernageomin: <strong>{alertValidation.sernageominValidated ? 'Validado' : 'No validado'}</strong>
                        </Typography>
                        <Typography variant="body1">
                            Fecha Validación: {alertValidation.sernageominValidationDate ?? 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {hasPermission("sernageomin") || hasPermission("admin") ? (
                            <Button
                                variant="outlined"
                                onClick={() => handleValidationToggle('Sernageomin')}
                                sx={{
                                    textTransform: 'none',
                                    padding: '8px 16px',
                                    fontWeight: 'bold',
                                    color: alertValidation.sernageominValidated ? 'error.main' : 'success.main',
                                    borderColor: alertValidation.sernageominValidated ? 'error.light' : 'success.light',
                                    '&:hover': {
                                        borderColor: alertValidation.sernageominValidated ? 'error.dark' : 'success.dark',
                                    },
                                }}
                            >
                                {alertValidation.sernageominValidated ? 'Quitar Validación' : 'Validar'}
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid item xs={7} sx={{ textAlign: 'left' }}>
                        <Typography variant="body1">
                            Estado Senapred: <strong>{alertValidation.senapredValidated ? 'Validado' : 'No validado'}</strong>
                        </Typography>
                        <Typography variant="body1">
                            Fecha Validación: {alertValidation.senapredValidationDate ?? 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {hasPermission('senapred') || hasPermission("admin") ? (
                            <Button
                                variant="outlined"
                                onClick={() => handleValidationToggle('Senapred')}
                                sx={{
                                    textTransform: 'none',
                                    padding: '8px 16px',
                                    fontWeight: 'bold',
                                    color: alertValidation.senapredValidated ? 'error.main' : 'success.main',
                                    borderColor: alertValidation.senapredValidated ? 'error.light' : 'success.light',
                                    '&:hover': {
                                        borderColor: alertValidation.senapredValidated ? 'error.dark' : 'success.dark',
                                    },
                                }}
                            >
                                {alertValidation.senapredValidated ? 'Quitar Validación' : 'Validar'}
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
        </Box>
    );
};

export default ValidationsTab;
