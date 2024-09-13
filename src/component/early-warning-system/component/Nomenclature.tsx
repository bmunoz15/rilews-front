import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StatusBox = styled(Box)(({ color }: { color: string }) => ({
    backgroundColor: color,
    opacity: 0.55,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '20px',
    marginLeft: '8px',
    marginBottom: '8px', // Add margin between items
}));

const StatusText = styled(Typography)({
    color: '#000',
    marginRight: '6px',
    marginBottom: '6px', // Add margin between items
    display: 'flex',
    alignContent: 'center',
});

const Nomenclature: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
            width="300px"
            mx="auto"
            textAlign="center"
            sx={{ backgroundColor: "#f6f6f6" }}
        >
            <Typography variant="h6" gutterBottom>
                Polígono
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                <Box display="flex" flexDirection="column" alignItems="flex-end" width="50%" pr={1}>
                    <StatusText>Predicción</StatusText>
                    <StatusText>Aviso</StatusText>
                    <StatusText>Alerta</StatusText>
                    <StatusText>Alarma</StatusText>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start" width="50%" pl={1}>
                    <StatusBox color="blue" />
                    <StatusBox color="yellow" />
                    <StatusBox color="orange" />
                    <StatusBox color="red" />
                </Box>
            </Box>
        </Box>
    );
};

export default Nomenclature;
