import React from 'react';
import { Box, Typography } from '@mui/material';
import RainChart from './RainChart'; // Importamos el componente RainChart

const PrecipitationsTab: React.FC = () => {
    // Datos de precipitación proporcionados
    const pp = [
        ['2024-09-06', '00:00:00', 43.158409118652344],
        ['2024-09-06', '01:00:00', 48.3936767578125],
        ['2024-09-06', '02:00:00', 54.19013595581055],
        ['2024-09-06', '03:00:00', 59.26664733886719],
        ['2024-09-06', '04:00:00', 63.51403045654297],
        ['2024-09-06', '05:00:00', 66.3486099243164],
        ['2024-09-06', '06:00:00', 68.8221435546875],
        ['2024-09-06', '07:00:00', 72.11858367919922],
        ['2024-09-06', '08:00:00', 74.96073150634766],
        ['2024-09-06', '09:00:00', 77.36013793945312],
        ['2024-09-06', '10:00:00', 80.37200927734375],
        ['2024-09-06', '11:00:00', 82.99797821044922],
        ['2024-09-06', '12:00:00', 85.28755187988281],
        ['2024-09-06', '13:00:00', 88.05951690673828],
        ['2024-09-06', '14:00:00', 90.33610534667969],
        ['2024-09-06', '15:00:00', 91.8056869506836],
        ['2024-09-06', '16:00:00', 93.5226058959961],
        ['2024-09-06', '17:00:00', 95.09309387207031],
        ['2024-09-06', '18:00:00', 97.47478485107422],
        ['2024-09-06', '19:00:00', 98.82186889648438],
        ['2024-09-06', '20:00:00', 99.58333587646484],
        ['2024-09-06', '21:00:00', 99.87247467041016],
        ['2024-09-06', '22:00:00', 100.69405364990234],
        ['2024-09-06', '23:00:00', 101.79570770263672],
    ];

    // Convertimos los datos a la cadena necesaria para el componente RainChart
    const lluvias = pp.map(([date, time, value]) => `(${date}, ${time}, ${value})`).join(', ');
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6">Precipitaciones</Typography>
            <Typography variant="body2">Tipo de validación: dMc - Valor: 5</Typography>
            <Box mt={2} sx={{ width: '100%' }}>
                <Typography variant="h6">Gráfico de Precipitaciones</Typography>
                {/* Aquí utilizamos el componente RainChart */}
                <RainChart lluvias={lluvias} />
            </Box>
        </Box>
    );
};

export default PrecipitationsTab;
