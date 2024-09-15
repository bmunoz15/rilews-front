import React, { useState, useEffect } from 'react';
import Map from '../component/Map';
import Forecast from '../component/sidebarinfo/Forecast';
import { getAlertsToday, getAlerts48h, getAlerts72h } from '../../service/early-warning-system/EatlyWarningService';
import { Box, useMediaQuery } from '@mui/material';
import SearchBar from '../../shared/search-bar/SearchBar';
import AlertList from '../component/sidebarinfo/AlertList';
import Nomenclature from '../component/sidebarinfo/Nomenclature';

const Home: React.FC = () => {
    const [alerts, setAlerts] = useState<any>(null);

    const handlePeriodSelect = async (period: string) => {
        let today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        today = '20240904'; 
        let alertData;

        switch (period) {
            case '24h':
                alertData = await getAlertsToday(today);
                break;
            case '48h':
                alertData = await getAlerts48h(today);
                break;
            case '72h':
                alertData = await getAlerts72h(today);
                break;
            default:
                alertData = [];
        }

        setAlerts(alertData);
    };

    const isLargeScreen = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        handlePeriodSelect('24h');
    }, []);

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                position="absolute"
                right="1%"
                top="10%"
                sx={{
                    alignItems: isLargeScreen ? 'flex' : 'flex-end',
                    backgroundColor: 'transparent',
                    zIndex: 1200,
                }}
            >
                <SearchBar />
                <Forecast onPeriodSelect={handlePeriodSelect} />
                <AlertList alerts={alerts} />
                <Nomenclature />
            </Box>

            <Map alerts={alerts} />
        </>
    );
};

export default Home;