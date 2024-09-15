import React, { useState, useEffect, useRef } from 'react';
import { Typography, Paper, Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import { getForecastDates } from '../../service/early-warning-system/EatlyWarningService';
import ForecastModel from '../../model/early-warning-system/ForecastModel';

const Forecast: React.FC = () => {
    const [data, setData] = useState<ForecastModel[] | null>(null); // Ahora es un arreglo de ForecastModel
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getForecastDates('20240904'); // Llamada al servicio
                setData(result); // Ahora es un arreglo de ForecastModel
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Box ref={containerRef}>
            {isSmallScreen && !expanded && (
                <Box display="flex" justifyContent="center" bgcolor="white" borderRadius={1}>
                    <IconButton onClick={handleIconClick}>
                        <CloudIcon style={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            )}
            {(expanded || !isSmallScreen) && (
                <Paper
                    style={{
                        padding: 8,
                        textAlign: 'center',
                        borderRadius: 8,
                        backgroundColor: theme.palette.background.default,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                        Fecha Pronóstico
                    </Typography>
                    <Box display="flex" justifyContent="space-between" width={"100%"} gap={1}>
                        {data?.map((forecast, index) => (
                            <Box key={index} textAlign="center" flex={1} gap={1}>
                                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                                    {forecast.period} {/* Periodo (24h, 48h, etc.) */}
                                </Typography>
                                <Typography variant="body2">
                                    {forecast.date} {/* Fecha */}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default Forecast;
