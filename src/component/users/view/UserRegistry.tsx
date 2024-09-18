import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme, useMediaQuery, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import * as Utils from '../Utils';

interface UserFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    organization: string;
    role: string;
}

const UserRegister: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [formData, setFormData] = useState<UserFormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: '',
        role: ''
    });
    const [errors, setErrors] = useState<{ email?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        setFormData(prevState => ({
            ...prevState,
            role: event.target.value as string
        }));
    };
    const handleOrganizationChange = (event: SelectChangeEvent<string>) => {
        setFormData(prevState => ({
            ...prevState,
            organization: event.target.value as string
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = Utils.validateEmail(formData.email) ? '' : 'Correo electrónico no válido';
        if (emailError) {
            setErrors({ email: emailError });
        } else {
            setErrors({});
            alert(JSON.stringify(formData, null, 2));
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f6f6f6"
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
                onSubmit={handleSubmit}
            >
                <Typography variant="h4" gutterBottom color="primary">
                    Registrar Usuario
                </Typography>

                <TextField
                    label="Nombre completo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Nombre completo"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Correo electrónico"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <TextField
                    label="Confirmar contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Confirmar contraseña"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="organization-label">Organización</InputLabel>
                    <Select
                        labelId="organization-label"
                        value={formData.organization}
                        onChange={handleOrganizationChange}
                        variant="outlined"
                        name="organization"
                    >
                        <MenuItem value="SERNAGEOMIN">SERNAGEOMIN</MenuItem>
                        <MenuItem value="SENAPRED">SENAPRED</MenuItem>
                        <MenuItem value="DMC">DMC</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Rol</InputLabel>
                    <Select
                        labelId="role-label"
                        value={formData.role}
                        onChange={handleRoleChange}
                        variant="outlined"
                        name="role"
                    >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="VALIDADOR">VALIDADOR</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    type="submit"
                >
                    Registrar Usuario
                </Button>

            </Box>
        </Box>
    );
};

export default UserRegister;