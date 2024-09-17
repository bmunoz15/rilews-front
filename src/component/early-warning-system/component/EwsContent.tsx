import React, { useEffect, useState } from 'react';
import Forecast from '../component/sidebarinfo/Forecast';
import { getAlerts } from '../../service/early-warning-system/EarlyWarningService';
import { Box, useMediaQuery } from '@mui/material';
import SearchBar from '../../shared/search-bar/SearchBar';
import AlertList from '../component/sidebarinfo/AlertList';
import Nomenclature from '../component/sidebarinfo/Nomenclature';
import GeoJsonModel from '../../model/early-warning-system/GeoJsonModel';
import { useAlerts } from './popupmenu/AlertsContext';
import Map from './Map';
import ForecastModel from '../../model/early-warning-system/ForecastModel';

const EwsContent: React.FC = () => {
    const { setAlerts } = useAlerts();
    const [selectedPeriod, setSelectedPeriod] = useState<ForecastModel>({ date: '20240904', url: 'today', period: '24h' }); // Estado para el periodo seleccionado
    const isLargeScreen = useMediaQuery('(min-width:600px)');

    const handlePeriodSelect = async (props: ForecastModel) => {
        let today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        today = '20240904'; // Modifica la fecha según tu lógica
        let alertData: GeoJsonModel | null = null;
        alertData = await getAlerts(today, props.url);
        setAlerts(alertData);
    };

    useEffect(() => {
        handlePeriodSelect(selectedPeriod);
    }, [selectedPeriod]); // Dependencia del periodo seleccionado

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
                <Forecast onPeriodSelect={setSelectedPeriod} />
                <AlertList />
                <Nomenclature />
            </Box>
            <Map selectedPeriod={selectedPeriod} />
        </>
    );
};

export default EwsContent;