import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Box, Typography, Card, CardContent, useTheme, IconButton, useMediaQuery } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { FixedSizeList as List } from 'react-window';
import { useAlerts } from '../../context/GeoJsonProvider';
import { useMapContext } from '../../context/MapProvider';
import { LatLngBounds, LatLngExpression } from 'leaflet';

interface AlertData {
    type: string;
    region: string;
    commune: string;
    color: string;
    bounds: LatLngBounds;
}

const AlertList: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<any>(null);

    const { alerts, getColorByStatus } = useAlerts();
    const { map } = useMapContext(); // Accede a la instancia del mapa

    const alertData: AlertData[] = useMemo(
        () =>
            alerts
                ? alerts.features.map((feature: any) => {
                    // Invertir las coordenadas si es necesario
                    const coordinates = feature.geometry.coordinates[0].map(
                        (coord: [number, number]) => [coord[1], coord[0]] as LatLngExpression // Invertir lon/lat a lat/lon
                    );
                    return {
                        type: feature.properties.dmcStatus,
                        region: feature.properties.Region_1,
                        commune: feature.properties.Comuna,
                        color: getColorByStatus(feature.properties.dmcStatus),
                        bounds: new LatLngBounds(coordinates), // Crear los bounds invertidos
                    };
                })
                : [],
        [alerts]
    );

    const handleAlertClick = useCallback(
        (alertItem: AlertData) => {
            if (map) {
                map.fitBounds(alertItem.bounds, {
                    padding: [50, 50], 
                    maxZoom: 13,        
                    animate: true,    
                });
                map.invalidateSize(); // Forza a Leaflet a recalcular el tamaño y redibujar
            }
        },
        [map]
    );

    const handleIconClick = useCallback(() => {
        if (isSmallScreen) {
            setExpanded((prev) => !prev);
        }
    }, [isSmallScreen]);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        },
        [containerRef]
    );

    useEffect(() => {
        if (isSmallScreen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSmallScreen, handleClickOutside]);

    const renderAlertItem = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <Card
            key={index}
            style={{ ...style, marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            elevation={0}
            onClick={() => handleAlertClick(alertData[index])}
        >
            <CardContent style={{ width: '100%', backgroundColor: theme.palette.background.default }}>
                <Box display="flex" alignItems="center" gap="8px">
                    <WarningIcon style={{ color: alertData[index].color, filter: 'drop-shadow(1px 1px 1px black)' }} />
                    <Typography variant="subtitle1">Alerta de Remoción</Typography>
                </Box>
                <Typography variant="body2">Región: {alertData[index].region}</Typography>
                <Typography variant="body2">Comuna: {alertData[index].commune}</Typography>
            </CardContent>
        </Card>
    );

    return (
        <Box ref={containerRef}>
            {isSmallScreen && !expanded && (
                <Box display="flex" justifyContent="center" bgcolor="white" borderRadius={1}>
                    <IconButton aria-label="Toggle alert list" onClick={handleIconClick}>
                        <WarningIcon style={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            )}
            {(expanded || !isSmallScreen) && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width={300}
                    height={400}
                    sx={{ backgroundColor: theme.palette.background.default }}
                    borderRadius="8px"
                    padding="16px"
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        flexGrow={0}
                        gap="8px"
                    >
                        <WarningIcon style={{ fontSize: 24, color: '#808080' }} />
                        <Typography variant="subtitle1" color="textPrimary">
                            Alertas
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        width="100%"
                        flexGrow={1}
                        overflow="auto"
                    >
                        <List
                            height={400}
                            itemCount={alertData.length}
                            itemSize={90}
                            width="100%"
                            ref={listRef}
                        >
                            {renderAlertItem}
                        </List>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AlertList;
