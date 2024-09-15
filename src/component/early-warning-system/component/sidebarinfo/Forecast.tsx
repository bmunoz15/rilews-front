import React, { useState, useEffect, useRef } from 'react';
import { Typography, Paper, Box, useTheme, useMediaQuery, IconButton, CircularProgress } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getForecastDates } from '../../../service/early-warning-system/EatlyWarningService';
import ForecastModel from '../../../model/early-warning-system/ForecastModel';

interface ForecastProps {
    onPeriodSelect: (period: string, date: string) => void;
}

const Forecast: React.FC<ForecastProps> = ({ onPeriodSelect }) => {
    const [data, setData] = useState<ForecastModel[] | null>(null);
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

    const todayDate = () => {
        return '20240904';
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
                const result = await getForecastDates(todayDate());
                setData(result);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    {loading ? (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <CircularProgress />
                            <Typography variant="subtitle2" style={{ marginTop: 8 }}>
                                Loading...
                            </Typography>
                        </Box>
                    ) : error ? (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <ErrorOutlineIcon color="error" />
                            <Typography variant="subtitle2" style={{ marginTop: 8, color: theme.palette.error.main }}>
                                {error}
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                                Fecha Pronóstico
                            </Typography>
                            <Box display="flex" justifyContent="space-between" width={"100%"} gap={1}>
                                {data?.map((forecast, index) => (
                                    <Box
                                        key={index}
                                        textAlign="center"
                                        flex={1}
                                        gap={1}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            onPeriodSelect(forecast.period, forecast.date);
                                        }} 
                                    >
                                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                                            {forecast.period}
                                        </Typography>
                                        <Typography variant="body2">
                                            {forecast.date}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default Forecast;
