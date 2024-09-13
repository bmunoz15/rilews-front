import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { LatLngExpression } from 'leaflet';

interface Location {
  position: [number, number];
  name: string;
}
const locations: Location[] = [
  { position: [-36.8201, -73.0443], name: 'Concepcion' },
  { position: [-38.7359, -72.5904], name: 'Temuco' },
  { position: [-39.6436, -72.3320], name: 'Panguipulli' },
];
const Map: React.FC = () => {
  const position: LatLngExpression = [-38.6679, -72.2610]; // Coordenadas de Temuco como punto central
  return (
    <>
      <MapContainer
        center={position}
        zoom={7}
        zoomControl={false}
        className='map'
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23"
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>

  );
};

export default Map;
