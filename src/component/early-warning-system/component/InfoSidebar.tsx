import React from 'react';
import { Box } from '@mui/material';
import Nomenclature from './Nomenclature';
import AlertList from './AlertList';
import Forecast from './Forecast';
import SearchBar from '../../shared/search-bar/SearchBar';

const InfoSidebar: React.FC = () => {
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
            <AlertList />
            <Nomenclature />
        </Box>
    );
};

export default InfoSidebar;
