import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { Box, Typography } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationLayerProps {
    locations: { position: LatLngTuple; name: string; color: string; }[];
}

const Location: React.FC<LocationLayerProps> = ({ locations }) => {
    const map = useMap();
    const [iconSize, setIconSize] = useState<number>(64);

    useEffect(() => {
        const updateIconSize = () => {
            const zoom = map.getZoom();
            const newSize = 64 * (zoom / 10);
            setIconSize(newSize);
        };

        updateIconSize();
        map.on('zoomend', updateIconSize);

        return () => {
            map.off('zoomend', updateIconSize);
        };
    }, [map]);

    const createWarningIcon = (color: string) => {
        const warningIconSvgString = renderToStaticMarkup(
            <Warning style={{ fontSize: iconSize, color, filter: 'drop-shadow(2px 2px 2px black)' }} />
        );

        return L.divIcon({
            className: 'custom-icon',
            html: `<div style="width: ${iconSize}px; height: ${iconSize}px; display: flex; justify-content: center; align-items: center;">${warningIconSvgString}</div>`,
            iconSize: [iconSize, iconSize],
            iconAnchor: [iconSize / 2, iconSize],
        });
    };

    return (
        <>
            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={location.position}
                    icon={createWarningIcon(location.color)}
                >
                    <Popup>
                        <Box>
                            <Typography variant="h6">{location.name}</Typography>
                            <Typography variant="body2">
                                Position: [{location.position[0]}, {location.position[1]}]
                            </Typography>
                        </Box>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

export default Location;
