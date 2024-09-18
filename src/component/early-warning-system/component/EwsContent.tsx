import React, { useEffect, useState } from 'react';
import { getAlerts } from '../service/EarlyWarningService';
import { Box, useMediaQuery } from '@mui/material';
import SearchBar from '../../shared/search-bar/SearchBar';
import Sidebar from './sidebar/SideBarInfo';
import SharedMap from '../../shared/map/SharedMap'; // Importa el componente compartido
import AlertIconLayer from './map-layers/AlertIconLayer';
import PolygonLayer from './map-layers/PolygonLayer';
import { useAlerts } from '../context/GeoJsonProvider';
import ForecastModel from '../model/ForecastModel';
import { LatLngExpression } from 'leaflet';

const EwsContent: React.FC = () => {
    const { setAlerts } = useAlerts();
    const [selectedPeriod, setSelectedPeriod] = useState<ForecastModel>({ date: '20240904', url: 'today', period: '24h' });
    const isLargeScreen = useMediaQuery('(min-width:600px)');

    const handlePeriodSelect = async (props: ForecastModel) => {
        let today = '20240904';
        const alertData = await getAlerts(today, props.url);
        setAlerts(alertData);
    };

    useEffect(() => {
        handlePeriodSelect(selectedPeriod);
    }, [selectedPeriod]);

    const centerPosition: LatLngExpression = [-38.6679, -72.2610];
    const tileUrl = "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23";
    const tileAttribution = '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)';

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
                <Sidebar onPeriodSelect={setSelectedPeriod} />
            </Box>
            <SharedMap
                centerPosition={centerPosition}
                zoom={7}
                tileUrl={tileUrl}
                tileAttribution={tileAttribution}
            >
                <PolygonLayer />
                <AlertIconLayer />
            </SharedMap>
        </>
    );
};

export default EwsContent;
