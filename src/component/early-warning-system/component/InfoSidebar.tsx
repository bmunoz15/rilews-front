import React from 'react';
import { Box, useMediaQuery, Theme } from '@mui/material';
import Nomenclature from './Nomenclature';
import AlertList from './AlertList';
import Forecast from './Forecast';
import SearchBar from '../../shared/search-bar/SearchBar';

const InfoSidebar: React.FC = () => {
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            position="absolute"
            right="1%"
            top="10%"
            sx={{ 
                zIndex: 1000, 
                backgroundColor: 'transparent',
                alignItems: isLargeScreen ? 'flex' : 'flex-end',
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
