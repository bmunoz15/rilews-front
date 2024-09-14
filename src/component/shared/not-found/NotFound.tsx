import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <Container
            sx={{
                textAlign: 'center',
                marginTop: { xs: '20px', sm: '30px', md: '50px' },
                padding: { xs: '10px', sm: '15px', md: '20px' }
            }}
        >
            <Typography variant="h1" component="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                >
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;