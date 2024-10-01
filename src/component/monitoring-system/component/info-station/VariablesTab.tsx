import React from 'react';
import { Box, Typography } from '@mui/material';

interface Header {
    header: {
        name: string;
        code: string;
        org: string;
    }
}

interface Position {
    position: {
        latitude: string;
        longitude: string;
        elevation: string;
    }
}

interface Variables {
    variables: {
        precipitation: string;
        precipitation24: string;
        temperature: string;
        pressure: string;
        relativeHumidity: string;
        dateTime: string;
    }
}

interface Props {
    header: Header['header'];
    position: Position['position'];
    variables: Variables['variables'];
}

const VariablesTab: React.FC<Props> = ({ header, position, variables }) => {

    const labelVariables = {
        precipitation: 'Precipitación',
        precipitation24: 'Precipitación (24h)',
        temperature: 'Temperatura',
        pressure: 'Presión',
        relativeHumidity: 'Humedad Relativa',
        dateTime: 'Fecha y Hora'
    };

    const labelPosition = {
        latitude: 'Lat',
        longitude: 'Lon',
        elevation: 'Elv'
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'auto', gap: '2px' }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',

                    justifyContent: 'space-between',
                    width: '95%',
                    padding: '5px',
                    margin: '5px 0',
                    gap: '10px'
                }}
            >
                <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{header.name}</Typography>
                <Typography variant="h1" sx={{ fontSize: '0.85rem' }}>{header.org}</Typography>

            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '95%',
                    padding: '5px',
                    borderBottom: '1px solid #ccc',
                    margin: '5px 0',
                    gap: '10px'
                }}
            >
                <Typography variant="h1" sx={{ fontSize: '0.85rem' }}>{header.code}</Typography>
            </Box>

            {/* Position */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '95%',
                    padding: '5px',
                    borderBottom: '1px solid #ccc',
                    margin: '5px 0',
                    gap: '10px'
                }}
            >
                <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{labelPosition.latitude}:</Typography>
                <Typography variant="h1" sx={{ fontSize: '0.85rem' }}>{position.latitude}</Typography>
                <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{labelPosition.longitude}:</Typography>
                <Typography variant="h1" sx={{ fontSize: '0.85rem' }}>{position.longitude}</Typography>
                <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{labelPosition.elevation}:</Typography>
                <Typography variant="h1" sx={{ fontSize: '0.85rem' }}>{position.elevation}</Typography>
            </Box>

            {/* Variables */}
            {Object.entries(variables).map(([key, value]) => (
                <Box
                    key={key}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '95%',
                        padding: '5px',
                        borderBottom: '1px solid #ccc',
                        margin: '5px 0',
                        gap: '10px'
                    }}
                >
                    <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', }}>
                        {labelVariables[key as keyof typeof labelVariables]}:
                    </Typography>
                    <Typography variant="h1" sx={{ fontSize: '0.85rem', }}>{value}</Typography>
                </Box>
            ))}
        </Box>
    );
}

export default VariablesTab;
