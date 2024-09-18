import React from 'react';
import { Box, Typography } from '@mui/material';
import RainChart from './RainChart';

interface PrecipitationsTabProps {
    dmcStatus: string;
    pp: [string, string, number][];
}

const PrecipitationsTab: React.FC<PrecipitationsTabProps> = ({ pp, dmcStatus }) => {
    const precipitation = pp.map(([date, time, value]) => ({ date, time, value }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Precipitaciones</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>Tipo de validación: {dmcStatus}</Typography>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Gráfico de Precipitaciones</Typography>
                <RainChart precipitation={precipitation} />
            </Box>
        </Box>
    );
};

export default PrecipitationsTab;
