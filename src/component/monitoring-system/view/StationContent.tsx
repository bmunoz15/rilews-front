import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const locations: { position: [number, number], name: string }[] = [
    // Región de La Araucanía
    { position: [-38.7359, -72.5904], name: "Temuco" },
    { position: [-38.7392, -72.5983], name: "Padre Las Casas" },
    { position: [-38.7400, -72.6050], name: "Cunco" },
    { position: [-38.7425, -72.6100], name: "Villarrica" },
    { position: [-38.7500, -72.6200], name: "Pucón" },
    { position: [-38.7600, -72.6300], name: "Angol" },
    { position: [-38.7700, -72.6400], name: "Victoria" },
    { position: [-38.7800, -72.6500], name: "Lautaro" },
    { position: [-38.7900, -72.6600], name: "Nueva Imperial" },
    { position: [-38.8000, -72.6700], name: "Carahue" },
    // Región de Los Ríos
    { position: [-39.8142, -73.2459], name: "Valdivia" },
    { position: [-39.8283, -73.2410], name: "La Unión" },
    { position: [-39.8300, -73.2350], name: "Río Bueno" },
    { position: [-39.8325, -73.2300], name: "Paillaco" },
    { position: [-39.8350, -73.2250], name: "Panguipulli" },
    { position: [-39.8375, -73.2200], name: "Lanco" },
    { position: [-39.8400, -73.2150], name: "Futrono" },
    { position: [-39.8425, -73.2100], name: "Los Lagos" },
    { position: [-39.8450, -73.2050], name: "Máfil" },
    { position: [-39.8475, -73.2000], name: "Corral" },
];

const StationContent: React.FC = () => {

    return (
        <>
            {locations.map((location, index) => (
                <Marker key={index} position={location.position}>
                    <Popup>
                        {location.name}
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default StationContent;