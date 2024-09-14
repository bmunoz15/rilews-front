import React from 'react';
import { Typography, Paper, Box, useTheme } from '@mui/material';

const Forecast: React.FC = () => {
    const theme = useTheme();
    
    const forecastData = [
        { period: '24h', date: '2023-10-01' },
        { period: '48h', date: '2023-10-02' },
        { period: '72h', date: '2023-10-03' },
    ];

    return (
        <Paper
            style={{
                padding: 8,
                textAlign: 'center',
                borderRadius: 8,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                Fecha Pronóstico
            </Typography>
            <Box display="flex" justifyContent="space-between" width={"100%"}>
                {forecastData.map((data) => (
                    <Box key={data.period} textAlign="center" flex={1}>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            {data.period}
                        </Typography>
                        <Typography variant="body2">
                            {data.date}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default Forecast;