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

const AlertList: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const alertData: AlertData[] = [
        { type: 'Alarma', region: 'Los Rios Region', commune: 'Panguipulli', color: 'red' },
        { type: 'Alerta', region: 'Araucania Region', commune: 'Temuco', color: 'orange' },
        { type: 'Aviso', region: 'Los Rios Region', commune: 'Paillaco', color: 'yellow' },
        { type: 'Alerta', region: 'Araucania Region', commune: 'S', color: 'orange' },
        { type: 'Alerta', region: 'Araucania Region', commune: 'Angol', color: 'orange' },
        // Add more data as needed
    ];

    const listRef = useRef<any>(null);

    const handleAlertClick = (alertItem: AlertData) => {
        alert(`Type: ${alertItem.type}\nRegion: ${alertItem.region}\nCommune: ${alertItem.commune}`);
    };

    // Toggle expansion when clicking the alert icon
    const handleIconClick = () => {
        if (isSmallScreen) {
            setExpanded(!expanded);
        }
    };

    // Close the expanded state when clicking outside the component
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

    return (
        <Box ref={containerRef}>
            {/* Alert Icon button, shown only on small screens */}
            {isSmallScreen && !expanded && (
                <Box display="flex" justifyContent="center" bgcolor="white" borderRadius={1}>
                    <IconButton onClick={handleIconClick}>
                        <WarningIcon style={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            )}

            {/* Alert list content that expands/collapses on small screens, always shown on large screens */}
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
                        <WarningIcon style={{ fontSize: 24 }} />
                        <Typography variant="subtitle1" color="textPrimary">
                            Alerts
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
                            itemSize={90} // Increase item size to include margin
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
                                            <Typography variant="subtitle1">{alertData[index].type} de Remoción</Typography>
                                        </Box>
                                        <Typography variant="body2">Region: {alertData[index].region}</Typography>
                                        <Typography variant="body2">Commune: {alertData[index].commune}</Typography>
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
