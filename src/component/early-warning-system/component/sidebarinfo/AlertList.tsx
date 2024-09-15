import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, useTheme, IconButton, useMediaQuery } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { FixedSizeList as List } from 'react-window';

interface AlertData {
    type: string;
    region: string;
    commune: string;
    color: string;
}

interface AlertListProps {
    alerts: any; // Adjust the type based on your alerts structure
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const listRef = useRef<any>(null);

    const handleAlertClick = (alertItem: AlertData) => {
        alert(`Type: ${alertItem.type}\nRegion: ${alertItem.region}\nCommune: ${alertItem.commune}`);
    };

    const handleIconClick = () => {
        if (isSmallScreen) {
            setExpanded(!expanded);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        if (isSmallScreen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSmallScreen]);



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
    const alertData: AlertData[] = alerts ? alerts.features.map((feature: any) => ({
        type: feature.properties["Etiqueta DMC"],
        region: feature.properties.Region_1,
        commune: feature.properties.Comuna,
        color: getColor(feature.properties["Etiqueta DMC"])
    })) : [];

    return (
        <Box ref={containerRef}>
            {isSmallScreen && !expanded && (
                <Box display="flex" justifyContent="center" bgcolor="white" borderRadius={1}>
                    <IconButton onClick={handleIconClick}>
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
                            {({ index, style }: { index: number; style: React.CSSProperties }) => (
                                <Card
                                    key={index}
                                    style={{ ...style, width: '100%', marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    elevation={0}
                                    onClick={() => handleAlertClick(alertData[index])}
                                >
                                    <CardContent style={{ width: '100%', backgroundColor: theme.palette.background.default }}>
                                        <Box display="flex" alignItems="center" gap="8px">
                                            <WarningIcon style={{ color: alertData[index].color }} />
                                            <Typography variant="subtitle1">Alerta de Remoción</Typography> {/* Change the text based on your alert type */}
                                        </Box>
                                        <Typography variant="body2">Region: {alertData[index].region}</Typography>
                                        <Typography variant="body2">Comuna: {alertData[index].commune}</Typography>
                                    </CardContent>
                                </Card>
                            )}
                        </List>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AlertList;
