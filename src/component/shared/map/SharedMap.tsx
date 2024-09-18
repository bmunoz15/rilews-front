import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface SharedMapProps {
    centerPosition: LatLngExpression;
    zoom: number;
    tileUrl: string;
    tileAttribution: string;
    children: React.ReactNode;
}

const SharedMap: React.FC<SharedMapProps> = ({
    centerPosition,
    zoom,
    tileUrl,
    tileAttribution,
    children,
}) => {
    return (
        <MapContainer
            center={centerPosition}
            zoom={zoom}
            style={{ height: '100vh', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                url={tileUrl}
                attribution={tileAttribution}
            />
            {children}
        </MapContainer>
    );
};

export default SharedMap;