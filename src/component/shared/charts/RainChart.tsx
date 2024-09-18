import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { parse, format } from 'date-fns';

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
        const differences: number[] = [];
        const thirdValues: number[] = [];
        const formattedDates: string[] = [];

        precipitation.forEach((item, index) => {
            if (index > 0) {
                differences.push(item.value - precipitation[index - 1].value);
            }
            thirdValues.push(item.value);

            const date = parse(`${item.date} ${item.time}`, 'yyyy-MM-dd HH:mm:ss', new Date());
            formattedDates.push(format(date, 'yy/MM/dd HH:mm'));
        });

        const MAX_DATA_POINTS = 72;
        setChartDataBar(differences.slice(0, MAX_DATA_POINTS));
        setChartDataLine(thirdValues.slice(0, MAX_DATA_POINTS));
        setChartLabels(formattedDates.slice(0, MAX_DATA_POINTS));
    }, [precipitation]);

    const data: ChartData<'bar' | 'line', number[], string> = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Lluvia (mm)',
                data: chartDataBar,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                yAxisID: 'y1',
                type: 'bar',
            },
            {
                label: 'Lluvia acumulada (mm)',
                data: chartDataLine,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                yAxisID: 'y2',
                type: 'line',
            },
        ],
    };

    const options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
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
                type: 'linear',
                position: 'right',
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
        <Box sx={{ height: isLargeScreen ? '60vh' : '50vh', width: isSmallScreen ? '400px' : 'auto', overflow: 'auto' }}>
            <Chart type='bar' data={data} options={options} />
        </Box>
    );
};

export default RainChart;
