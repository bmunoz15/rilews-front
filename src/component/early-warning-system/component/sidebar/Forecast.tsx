import React, { useState, useEffect, useRef } from 'react';
import { Typography, Paper, Box, CircularProgress } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getForecastDates, getAlerts } from '../../service/EarlyWarningService';
import { ForecastModel } from '../../model/ForecastModel';
import { useAlerts } from '../../context/GeoJsonProvider';
import { format, parse } from 'date-fns';

const Forecast: React.FC = () => {
    const { setAlerts } = useAlerts();
    const [, setSelectedPeriod] = useState<ForecastModel>({
        forecastDate: new Date().toISOString().split('T')[0].replace(/-/g, ''),
        url: 'today',
        period: '24h'
    });
    const [forecastModel, setForecastModel] = useState<ForecastModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
                const result = await getForecastDates(today);
                setForecastModel(result);
                setAlerts(await getAlerts(today, 'today'));
            } catch (err) {
                setError('Failed to fetch forecast data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handlePeriodSelect = async (props: ForecastModel) => {
        const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const alertData = await getAlerts(today, props.url);
        setAlerts(alertData);
        setSelectedPeriod(props);
    };

    const formatForecastDate = (forecastDate: string) => {
        const forecastDateStr = forecastDate.toString();
        if (forecastDateStr.length !== 8) {
            return 'Invalid date';
        }
        const parsedDate = parse(forecastDateStr, 'yyyyMMdd', new Date());
        if (isNaN(parsedDate.getTime())) {
            return 'Invalid date';
        }
        return format(parsedDate, 'yyyy-MM-dd');
    };

    return (
        <Box ref={containerRef}>
            <Paper
                style={{
                    padding: 8,
                    textAlign: 'center',
                    borderRadius: 8,
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
                        <Typography variant="subtitle2" style={{ marginTop: 8, color: 'red' }}>
                            {error}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 'bold' }}>
                            Fecha Pronóstico
                        </Typography>
                        <Box display="flex" justifyContent="space-between" gap={1}>
                            {forecastModel.map((forecast, index) => (
                                <Box
                                    key={index}
                                    textAlign="center"
                                    flex={1}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                        },
                                        '&:active': { backgroundColor: 'gray' },
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handlePeriodSelect(forecast)}
                                >
                                    <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                                        {forecast.period}
                                    </Typography>
                                    <Typography variant="body2">
                                        {formatForecastDate(forecast.forecastDate)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default Forecast;
