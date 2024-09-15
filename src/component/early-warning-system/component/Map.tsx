import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import Location from './Location';
import PolygonLayer from './PolygonLayer';

const MapWithToggle: React.FC = () => {
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const centerPosition: LatLngExpression = [-38.6679, -72.2610];

    useEffect(() => {
        fetch('/src/assets/ReporteProb_20240904T0000000_20240905T000000_20240904T104547_cut.geojson')
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
            })
            .catch(error => console.error('Error loading GeoJSON:', error));
    }, []);

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

    const locationsFromGeoJson = geoJsonData?.features.map((feature: any) => ({
        position: [feature.properties.lat_centroide, feature.properties.lon_centroide] as LatLngTuple,
        name: feature.properties.Comuna,
        color: getColor(feature.properties["Etiqueta DMC"]) 
    })) || [];

    return (
        <MapContainer
            center={centerPosition} // Usar el centroide del GeoJSON
            zoom={7}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23"
                attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {geoJsonData && <PolygonLayer data={geoJsonData} getStyle={getStyle} />}
            <Location locations={locationsFromGeoJson} />
        </MapContainer>
    );
};

export default MapWithToggle;
