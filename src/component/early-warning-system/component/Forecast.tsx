import React, { useState, useEffect, useRef } from 'react';
import { Typography, Paper, Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';

const Forecast: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const forecastData = [
        { period: '24h', date: '2023-10-01' },
        { period: '48h', date: '2023-10-02' },
        { period: '72h', date: '2023-10-03' },
    ];

    // Toggle expansion when clicking the cloud icon
    const handleIconClick = () => {
        if (isSmallScreen) {
            setExpanded(!expanded);
        }
    };

    // Close the expanded state when clicking outside the component
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

    return (
        <Box ref={containerRef}>
            {/* Cloud Icon button, shown only on small screens */}
            {isSmallScreen && !expanded && (
                <Box display="flex" justifyContent="center" bgcolor="white" borderRadius={1}>
                    <IconButton onClick={handleIconClick}>
                        <CloudIcon style={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            )}

            {/* Forecast information that expands/collapses on small screens, always shown on large screens */}
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
                        {forecastData.map((data) => (
                            <Box key={data.period} textAlign="center" flex={1} gap={1}>
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
            )}
        </Box>
    );
};

export default Forecast;
