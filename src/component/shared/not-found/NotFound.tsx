import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <Container
            sx={{
                textAlign: 'center',
                marginTop: '50px',
                padding: '20px'
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
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
            >
                Go to Home
            </Button>
        </Container>
    );
};

export default NotFound;