import React from 'react';
import { Box, Typography } from '@mui/material';
import RainChart from './RainChart';
interface RainChartProps {
    validationDmc: string;
    pp: [string, string, number][];
}

const PrecipitationsTab: React.FC<RainChartProps> = ({ pp, validationDmc }) => {

    const precipitation = Array.isArray(pp) 
        ? pp.map(([date, time, value]) => ({ date, time, value }))
        : [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6">Precipitaciones</Typography>
            <Typography variant="body2">Tipo de validación: {validationDmc}</Typography>
            <Box mt={2} sx={{ width: '100%' }}>
                <Typography variant="h6">Gráfico de Precipitaciones</Typography>
                <RainChart precipitation={precipitation} />
            </Box>
        </Box>
    );
};

export default PrecipitationsTab;
