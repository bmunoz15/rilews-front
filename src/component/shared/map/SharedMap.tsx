import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useMapContext } from '../../early-warning-system/context/MapProvider';

interface SharedMapProps {
    centerPosition: LatLngExpression;
    zoom: number;
    tileUrl: string;
    tileAttribution: string;
    children: React.ReactNode;
}

const MapContainerComponent: React.FC<SharedMapProps> = ({ }) => {
    const { setMap } = useMapContext();
    const map = useMap();

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);

    return null;
};

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
            <MapContainerComponent centerPosition={centerPosition} zoom={zoom} tileUrl={tileUrl} tileAttribution={tileAttribution} children={undefined} />
            {children}
        </MapContainer>
    );
};

export default SharedMap;