import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';

const UserProfile: React.FC = () => {
    //Datos simulados
    const userData = {
        fullName: 'Eva Green',
        email: 'eva.green@example.com',
        organization: 'Org E',
        role: 'User',
    };

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
                            {userData.fullName.charAt(0)}
                        </Avatar>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="center">
                                {userData.fullName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Email:</strong> {userData.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Organization:</strong> {userData.organization}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Role:</strong> {userData.role}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;
