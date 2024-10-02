import React from 'react';
import SharedMap from '../../shared/map/SharedMap';
import EwsContent from '../../early-warning-system/component/EwsContent';
import { GeoJsonProvider } from '../../early-warning-system/context/GeoJsonProvider';
import { MapProvider } from '../../early-warning-system/context/MapProvider';
import { LatLngExpression } from 'leaflet';
import CircleCustomLayer from '../../monitoring-system/component/map-layers/CircleCustomLayer';

interface MapContainerComponentProps {
    centerPosition: LatLngExpression;
    tileUrl: string;
    tileAttribution: string;
    showEwsContent: boolean;
    showStationContent: boolean;
}

const MapContainer: React.FC<MapContainerComponentProps> = ({
    centerPosition,
    tileUrl,
    tileAttribution,
    showEwsContent,
    showStationContent,
}) => {
    return (

        <MapProvider>
            <SharedMap
                centerPosition={centerPosition}
                zoom={7}
                tileUrl={tileUrl}
                tileAttribution={tileAttribution}
            >
                {showEwsContent && <GeoJsonProvider><EwsContent /></GeoJsonProvider>}
                {showStationContent && <CircleCustomLayer />}
            </SharedMap>
        </MapProvider>
    );
};

export default MapContainer;