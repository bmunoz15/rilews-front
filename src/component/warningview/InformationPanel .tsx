import React from 'react';
import { Box } from '@mui/material';
import Nomenclature from './Nomenclature'; // Asegúrate de que la ruta sea correcta
import Warning from './Warning';
import Forecast from './Forecast';
import SearchBar from '../lib/SearchBar';

const InformationPanel: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            position="absolute"
            right="1%"
            top="50%"
            sx={{ 
                transform: 'translateY(-50%)', 
                zIndex: 1000, 
                backgroundColor: 'transparent',
            }}
        >
            <SearchBar />
            <Forecast />

            <Warning />

            <Nomenclature />

            
            {/* Aquí puedes agregar más componentes en el futuro */}
        </Box>
    );
};

export default InformationPanel;
