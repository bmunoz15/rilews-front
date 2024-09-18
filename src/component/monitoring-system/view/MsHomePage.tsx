import React from 'react';

import SharedMap from '../../shared/map/SharedMap';
import { LatLngExpression } from 'leaflet';
import { MapProvider } from '../../early-warning-system/context/MapProvider';

const centerPosition: LatLngExpression = [-38.6679, -72.2610];
const tileUrl = "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23";
const tileAttribution = '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)';

const Home: React.FC = () => {
    return (
        <>
            <MapProvider>
                <SharedMap
                    centerPosition={centerPosition}
                    zoom={7}
                    tileUrl={tileUrl}
                    tileAttribution={tileAttribution} children={undefined}            >
                    {/*añadir componentes (layers) aquí*/}
                </SharedMap>
            </MapProvider>

        </>
    );
};

export default Home;