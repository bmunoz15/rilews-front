import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material';
import * as Utils from '../Utils';

const UserLogin: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleLoginClick = () => {
        if (!Utils.validateEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        alert(`Correo: ${email}\nContraseña: ${password}`);
    };

    const handleForgotPasswordClick = () => {
        alert('Redirigiendo a la página de recuperación de contraseña...');
    };



    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor={theme.palette.background.default}
            p={2}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="white"
                borderRadius={2}
                boxShadow={3}
                p={4}
                width={isSmallScreen ? '90%' : '400px'}
                maxWidth="100%"
                component="form"
            >
                <Typography variant="h4" gutterBottom>
                    Iniciar sesión
                </Typography>
                <TextField
                    label="Correo electrónico"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    helperText={emailError ? 'Por favor, ingrese un correo electrónico válido.' : ''}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleLoginClick}
                >
                    Iniciar sesión
                </Button>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 2, textAlign: 'center', cursor: 'pointer' }}
                    onClick={handleForgotPasswordClick}
                >
                    ¿Has olvidado la contraseña?
                </Typography>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    Por favor, ingrese un correo electrónico válido.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserLogin;
