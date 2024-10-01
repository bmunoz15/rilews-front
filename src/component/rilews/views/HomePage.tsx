import React, { useState } from 'react';
import CheckboxLayer from '../component/CheckboxLayer';
import MapContainerComponent from '../component/MapContainer';
import { LatLngExpression } from 'leaflet';

const HomePage: React.FC = () => {
    const [showEwsContent, setShowEwsContent] = useState(false);
    const [showStationContent, setShowStationContent] = useState(false);

    const centerPosition: LatLngExpression = [-38.6679, -72.2610];
    const tileUrl =
        'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23';
    const tileAttribution =
        '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)';

    return (
        <>
            <CheckboxLayer
                checkboxes={[
                    {
                        checked: showEwsContent,
                        label: 'Mostrar EwsContent',
                        onChange: () => setShowEwsContent(!showEwsContent),
                    },
                    {
                        checked: showStationContent,
                        label: 'Mostrar StationContent',
                        onChange: () => setShowStationContent(!showStationContent),
                    },
                ]}
            />
            <MapContainerComponent
                centerPosition={centerPosition}
                tileUrl={tileUrl}
                tileAttribution={tileAttribution}
                showEwsContent={showEwsContent}
                showStationContent={showStationContent}
            />
        </>
    );
};

export default HomePage;