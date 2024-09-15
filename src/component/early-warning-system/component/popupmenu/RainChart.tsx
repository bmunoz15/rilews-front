import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Legend, Title, Tooltip } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { parse, format } from 'date-fns';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface RainChartProps {
    precipitation: { date: string; time: string; value: number; }[];
}

const RainChart: React.FC<RainChartProps> = ({ precipitation }) => {
    const [chartDataBar, setChartDataBar] = useState<number[]>([]);
    const [chartDataLine, setChartDataLine] = useState<number[]>([]);
    const [chartLabels, setChartLabels] = useState<string[]>([]);

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const triplas = precipitation;

        const diferencias: number[] = [];
        for (let i = 1; i < triplas.length; i++) {
            const diferencia = triplas[i].value - triplas[i - 1].value;
            diferencias.push(diferencia);
        }
        const tercerosValores = triplas.map(tripla => tripla.value);

        const fechasConHora = triplas.map(tripla => {
            const fecha = parse(`${tripla.date} ${tripla.time}`, 'yyyy-MM-dd HH:mm:ss', new Date());
            return format(fecha, 'yy/MM/dd HH:mm');
        });
        const MAX_DATOS = 72;
        const primeros72Datos = fechasConHora.slice(0, MAX_DATOS);

        setChartDataBar(diferencias);
        setChartDataLine(tercerosValores);
        setChartLabels(primeros72Datos);
    }, [precipitation]);

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Lluvia (mm)',
                data: chartDataBar,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                yAxisID: 'y1',
                type: 'bar' as const,
            },
            {
                label: 'Lluvia acumulada (mm)',
                data: chartDataLine,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y2',
                type: 'line' as const,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y1: {
                type: 'linear' as const,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Lluvia (mm)',
                    color: 'black',
                },
                ticks: {
                    color: 'black',
                },
            },
            y2: {
                type: 'linear' as const,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Lluvia acumulada (mm)',
                    color: 'black',
                },
                ticks: {
                    color: 'black',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Hora del día',
                    color: 'black',
                },
                ticks: {
                    color: 'black',
                    autoSkip: false,
                    maxRotation: 80,
                    minRotation: 45,
                },
            },
        }
    };

    return (
        <Box sx={{ height: isLargeScreen ? '60vh' : '50vh', width: isSmallScreen ? '400px': 'auto', overflow: 'auto' }}>
            <Chart type='bar' data={data} options={options as any} />
        </Box>
    );
};

export default RainChart;
