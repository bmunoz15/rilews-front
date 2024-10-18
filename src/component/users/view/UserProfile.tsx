import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { getUserById, User } from '../service/UserService';
import { useAuth } from '../context/AuthenticationContext';

const UserProfile: React.FC = () => {
    const { authData } = useAuth(); // Obtener el usuario del contexto
    const [usersData, setUsersData] = useState<User>();
    const [, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = Number(authData?.user_id);
                if (!isNaN(userId)) {
                    const user = await getUserById(userId);
                    setUsersData(user);
                } else {
                    console.error("Invalid user ID:", authData?.user_id);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f6f6f6"
            p={3}
        >
            <Card
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    boxShadow: 3,
                    borderRadius: 4,
                    padding: 3,
                    backgroundColor: '#fff',
                }}
            >
                <CardContent>
                    <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: '#3f51b5',
                                fontSize: 40,
                            }}
                        >
                            {usersData?.fullname.charAt(0)}
                        </Avatar>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">
                                {usersData?.fullname} {usersData?.lastname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Correo Electrónico:</strong> {usersData?.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Organización:</strong> {usersData?.organization}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;
