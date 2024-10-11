import React, { useState, useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';
import AlertPopupMenu from '../info-alert/AlertPopupMenu';
import { renderToStaticMarkup } from 'react-dom/server';
import { Warning } from '@mui/icons-material';
import L from 'leaflet';
import { useAlerts } from '../../context/GeoJsonProvider';

const AlertIconLayer: React.FC = () => {
    const map = useMap();
    const [iconSize, setIconSize] = useState<number>(64);
    const { alerts, getColorByStatus } = useAlerts();

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
            {alerts && alerts.features.map((feature, index) => (
                <Marker
                    key={index}
                    position={[feature.properties.lat_centroide, feature.properties.lon_centroide]}
                    icon={createWarningIcon(getColorByStatus(feature.properties.dmcStatus))}
                >
                    <AlertPopupMenu
                        featureId={feature.properties.featureId}
                        q1={feature.properties.Q1}
                        mediana={feature.properties.Mediana}
                        q3={feature.properties.Q3}
                        pp={feature.properties.PP}
                        dmcStatus={feature.properties.dmcStatus}
                        forecastDate={feature.properties.forecastDate}
                        forecastTargetDate={feature.properties.forecastTargetDate}
                    />
                </Marker>
            ))}
        </>
    );
};

export default AlertIconLayer;
