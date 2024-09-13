import React, { useRef } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { FixedSizeList as List } from 'react-window';

const Warning: React.FC = () => {
    const alertData = [
        { type: 'Alerta', region: 'Region de los Rios', comuna: 'Panguipulli', color: 'red' },
        { type: 'Aviso', region: 'Region de la Araucania', comuna: 'TEmuco', color: 'orange' },
        { type: 'Alarma', region: 'Region de los Rios', comuna: 'Paillaco', color: 'yellow' },
        { type: 'Aviso', region: 'Region de la Araucania', comuna: 's', color: 'orange' },
        // Agrega más datos según sea necesario
    ];

    const listRef = useRef<any>(null);

    const handleAlertClick = (alertData: { type: string; region: string; comuna: string; color: string }) => {
        alert(`Tipo: ${alertData.type}\nRegión: ${alertData.region}\nComuna: ${alertData.comuna}`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={300}
            height={300}
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
                    height={200 as number}
                    itemCount={alertData.length}
                    itemSize={90} // Incrementa el tamaño del item para incluir el margen
                    width="100%"
                    ref={listRef}
                >
                    {({ index, style }: { index: number; style: React.CSSProperties }) => (
                        <Card
                            key={index}
                            style={{ ...style, width: '100%', marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            elevation={0}
                            onClick={() => handleAlertClick(alertData[index])}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <CardContent style={{ width: '100%' }}>
                                <Box display="flex" alignItems="center" gap="8px">
                                    <WarningIcon style={{ color: alertData[index].color }} />
                                    <Typography variant="h6">{alertData[index].type} de remoción</Typography>
                                </Box>
                                <Typography variant="body2">Región: {alertData[index].region}</Typography>
                                <Typography variant="body2">Comuna: {alertData[index].comuna}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </List>
            </Box>
        </Box>
    );
};

export default Warning;
