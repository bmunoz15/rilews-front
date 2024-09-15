import React, { useState, useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import AlertPopupMenu from '../popupmenu/AlertPopupMenu';
import { renderToStaticMarkup } from 'react-dom/server';
import { Warning } from '@mui/icons-material';
import L from 'leaflet';

interface LocationLayerProps {
    information: {
        position: LatLngTuple; 
        name: string; 
        color: string; 
        Etiqueta_DMC: string;
        region: string;
        q1: number;
        mediana: number;
        q3: number;
        pp: [string, string, number][];
    }[];

}

const Location: React.FC<LocationLayerProps> = ({ information }) => {
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
            {information.map((location, index) => (
                <Marker
                    key={index}
                    position={location.position}
                    icon={createWarningIcon(location.color)}
                >
                    <AlertPopupMenu variables={{ q1: location.q1, mediana: location.mediana, q3: location.q3, pp: location.pp , Etiqueta_DMC:location.Etiqueta_DMC }} />
                </Marker>
            ))}
        </>
    );
};

export default Location;
