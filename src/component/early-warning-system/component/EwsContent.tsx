import React, { useCallback, useEffect, useState } from 'react';
import { getAlerts } from './service/EarlyWarningService';
import { Box, useMediaQuery } from '@mui/material';
import SearchBar from '../../shared/search-bar/SearchBar';
import Sidebar from './sidebar/SideBarInfo';
import AlertIconLayer from './map-layers/AlertIconLayer';
import PolygonLayer from './map-layers/PolygonLayer';
import { useAlerts } from '../context/GeoJsonProvider';
import { ForecastModel } from '../model/ForecastModel';
import { useMapContext } from '../context/MapProvider';
const EwsContent: React.FC = () => {
    const { setAlerts } = useAlerts();
    const { map } = useMapContext();  // Traer el contexto del mapa
    const [selectedPeriod, setSelectedPeriod] = useState<ForecastModel>({ forecastDate: '20240904', url: 'today', period: '24h' });
    const isLargeScreen = useMediaQuery('(min-width:600px)');

    const handlePeriodSelect = async (props: ForecastModel) => {
        let today = '20240904';
        const alertData = await getAlerts(today, props.url);
        setAlerts(alertData);
    };
    const disableMapInteractions = useCallback(() => {
        if (map) {
            map.dragging.disable();
            map.scrollWheelZoom.disable();
        }
    }, [map]);

    const enableMapInteractions = useCallback(() => {
        if (map) {
            map.dragging.enable();
            map.scrollWheelZoom.enable();
        }
    }, [map]);
    useEffect(() => {
        handlePeriodSelect(selectedPeriod);
    }, [selectedPeriod]);
    return (
        <>

            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                position="absolute"
                right="1%"
                top="10%"
                onMouseEnter={disableMapInteractions} // Deshabilitar interacciones al entrar
                onMouseLeave={enableMapInteractions}   // Habilitar interacciones al salir
                sx={{
                    alignItems: isLargeScreen ? 'flex' : 'flex-end',
                    backgroundColor: 'transparent',
                    zIndex: 9999,
                }}
            >
                <SearchBar />
                <Sidebar onPeriodSelect={setSelectedPeriod} />
            </Box>

            <PolygonLayer />
            <AlertIconLayer />


        </>
    );
};

export default EwsContent;
