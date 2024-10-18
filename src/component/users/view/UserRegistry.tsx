import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme, useMediaQuery, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import * as Utils from '../Utils';
import { createUser } from '../service/UserService';

interface UserFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    organization: string;
    role: string;
}
const organizaciones = ["SERNAGEOMIN", "SENAPRED", "DMC", "UFRO"];
const organization: { [key: string]: string } = {
    SERNAGEOMIN: "SERNAGEOMIN",
    SENAPRED: "SENAPRED",
    DMC: "DIRECCION_METEOROLOGICA_DE_CHILE",
    UFRO: "UNIVERSIDAD_DE_LA_FRONTERA"
};
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = Utils.validateEmail(formData.email) ? '' : 'Correo electrónico no válido';
        if (emailError) {
            setErrors({ email: emailError });
        } else {
            setErrors({});
            try {
                const user = {
                    organization: organization[formData.organization],
                    fullname: formData.fullName.split(' ')[0],
                    lastname: formData.fullName.split(' ').slice(1).join(' '),
                    email: formData.email,
                    password: formData.password
                };
                const response = await createUser(user);
               // alert(`User created successfully: ${JSON.stringify(response, null, 2)}`);
               console.log(response);
            } catch (error) {
                alert(`Error creating user: ${(error as Error).message}`);
            }
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={2}
            sx={{
                backgroundImage: 'url(/rilews.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
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
                    margin="dense"
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
                <FormControl variant="outlined" fullWidth margin="dense">
                    <InputLabel>Organización</InputLabel>
                    <Select
                        label="Organización"
                        name="organization"
                        value={formData.organization}
                        onChange={handleOrganizationChange}
                    >
                        {organizaciones.map((organization) => (
                            <MenuItem key={organization} value={organization}>
                                {organization}
                            </MenuItem>
                        ))}
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