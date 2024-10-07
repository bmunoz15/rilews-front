import React from 'react';
import LegendItem from '../../shared/Legend/LegendItem';
import Grid from '@mui/material/Grid2';

interface Legend {
    show: boolean;
    colors: string[];
    texts: string[];
    label: string;
}

interface LegendContainerProps {
    legends: Legend[];
}

const LegendContainer: React.FC<LegendContainerProps> = ({ legends }) => {
    const visibleLegends = legends.filter(legend => legend.show);

    return (
        <Grid container
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            gap={2}
            sx={{
                backgroundColor: 'trasparent',
                paddingTop: 2,
            }}
        >
            {visibleLegends.map((legend, index) => (
                <Grid
                    key={index}
                    sx={{
                        width: 'auto',
                      
                    }}
                >
                    <LegendItem
                        colors={legend.colors}
                        texts={legend.texts}
                        label={legend.label}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default LegendContainer;
