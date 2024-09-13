import React, { useRef } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { FixedSizeList as List } from 'react-window';

// Define the type for alert data
interface AlertData {
    type: string;
    region: string;
    commune: string;
    color: string;
}

const AlertList: React.FC = () => {
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

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={300}
            height={400}
            sx={{ backgroundColor: "#f6f6f6" }}
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
                            <CardContent style={{ width: '100%', backgroundColor:'#f6f6f6' }}>
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
    );
};

export default AlertList;
