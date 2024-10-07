import React from 'react';
import { Grid2, Typography, Box, styled } from '@mui/material';

const StatusText = styled(Typography)({
    color: '#000',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

interface LegendItemProps {
    colors: string[];
    texts: string[];
    label: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ colors, texts, label }) => {
    return (
        <Grid2
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f6f6f6"
            padding={1}
            borderRadius={2}
        >
            <Typography variant="h6" gutterBottom color="textPrimary" sx={{ textAlign: 'center', width: '150px' }}>
                {label}
            </Typography>
            <Grid2 container direction="column" alignItems="flex-start" >
                {texts.map((text, index) => (
                    <Grid2 key={text} container justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                        <StatusText>{text}</StatusText>
                        <Box
                            sx={{
                                backgroundColor: colors[index],
                                opacity: 0.55,
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '20px',
                                ml: '4px',
                            }}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Grid2>
    );
};

export default LegendItem;
