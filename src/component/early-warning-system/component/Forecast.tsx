import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

const Forecast: React.FC = () => {
    const forecastData = [
        { period: '24h', date: '2023-10-01' },
        { period: '48h', date: '2023-10-02' },
        { period: '72h', date: '2023-10-03' },
    ];

    return (
        <Paper style={{ padding: 16, width: '100%', border: '8px', textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                Fecha Pronóstico
            </Typography>
            <Grid container spacing={2} style={{ width: '100%' }}>
                {forecastData.map((data) => (
                    <Grid item xs={4} key={data.period}>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            {data.period}
                        </Typography>
                        <Typography variant="body2" >
                            {data.date}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default Forecast;