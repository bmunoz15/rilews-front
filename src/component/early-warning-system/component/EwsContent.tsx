import React from 'react';
import { Box } from '@mui/material';
import Forecast from './sidebar/Forecast';
import AlertList from './sidebar/AlertList';
import AlertIconLayer from './map-layers/AlertIconLayer';
import PolygonLayer from './map-layers/PolygonLayer';
import { ValidationProvider } from '../context/ValidationAlertProvider';

const EwsContent: React.FC = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                right="5%"
                top="5%"
                sx={{
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    zIndex: 1400,
                }}
            >
                <Forecast />
                <AlertList />
            </Box>
            <ValidationProvider>
                <AlertIconLayer />
                <PolygonLayer />
            </ValidationProvider>

        </>
    );
};

export default EwsContent;
