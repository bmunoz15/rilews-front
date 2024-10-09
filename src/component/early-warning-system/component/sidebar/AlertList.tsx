import React, { useRef, useMemo, useCallback } from 'react';
import { Box, Typography, Card, CardContent, useTheme, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { FixedSizeList as List } from 'react-window';
import { useAlerts } from '../../context/GeoJsonProvider';
import { LatLngBounds, LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';

interface AlertData {
    type: string;
    region: string;
    commune: string;
    color: string;
    bounds: LatLngBounds;
    forecastDate: string;
    forecastTargetDate: string;
}

const AlertList: React.FC = () => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<any>(null);

    const { alerts, getColorByStatus } = useAlerts();
    const map = useMap();
    const alertData: AlertData[] = useMemo(
        () =>
            alerts
                ? alerts.features.map((feature: any) => {
                    const coordinates = new LatLngBounds([[feature.properties.lat_centroide, feature.properties.lon_centroide]] as LatLngTuple[]);
                    return {
                        type: feature.properties.dmcStatus,
                        region: feature.properties.Region_1,
                        commune: feature.properties.Comuna,
                        color: getColorByStatus(feature.properties.dmcStatus),
                        bounds: coordinates,
                        forecastDate: feature.properties.forecastDate,
                        forecastTargetDate: feature.properties.forecastTargetDate,
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Alerta de Remoción</Typography>
                </Box>
                <Typography variant="body2">
                    <strong>Región:</strong> {alertData[index].region}
                </Typography>
                <Typography variant="body2">
                    <strong>Comuna:</strong> {alertData[index].commune}
                </Typography>
                <Typography variant="body2">
                    <strong>Fecha Pronóstico:</strong> {alertData[index].forecastTargetDate}
                </Typography>
                <Divider sx={{ backgroundColor: "#f8f8f8f8" }} />
            </CardContent>
        </Card>
    );

    return (
        <Box ref={containerRef} sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'auto',
                    minWidth: 300,
                    height: 390,
                    backgroundColor: theme.palette.background.default,
                    borderRadius: '8px',
                    padding: 1,
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={0}
                    gap= {1}
                >
                    <WarningIcon style={{ fontSize: 24, color: '#808080' }} />
                    <Typography variant="subtitle1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
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
        </Box>
    );
};

export default AlertList;
