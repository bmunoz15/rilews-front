import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import Location from './infowarning/Location';
import PolygonLayer from './infowarning/PolygonLayer';

interface MapProps {
    alerts: any;
}

const Map: React.FC<MapProps> = ({ alerts }) => {
    const centerPosition: LatLngExpression = [-38.6679, -72.2610];

    const getColor = (etiquetadmc: string) => {
        switch (etiquetadmc) {
            case 'Sin Alerta actual DMC':
                return 'yellow';
            case 'alerta':
                return 'orange';
            case 'alarma':
                return 'red';
            default:
                return 'blue';
        }
    };

    const getStyle = (feature: any) => {
        const color = getColor(feature.properties["Etiqueta DMC"]);
        return {
            color,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
        };
    };

    const locationsFromGeoJson = alerts?.features.map((feature: any) => ({
        position: [feature.properties.lat_centroide, feature.properties.lon_centroide] as LatLngTuple,
        name: feature.properties.Comuna,
        color: getColor(feature.properties["Etiqueta DMC"])
    })) || [];

    return (
        <MapContainer
            center={centerPosition}
            zoom={7}
            style={{ height: '100vh', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23"
                attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)'
            />

            {/* Pass a unique key based on alerts */}
            {alerts && <PolygonLayer key={JSON.stringify(alerts)} data={alerts} getStyle={getStyle} />}
            <Location locations={locationsFromGeoJson} />
        </MapContainer>
    );
};

export default Map;
