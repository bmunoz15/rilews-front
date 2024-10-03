import React from 'react';
import { Box, FormControlLabel, Checkbox, useTheme, useMediaQuery } from '@mui/material';

interface CheckboxLayerProps {
    checkboxes: { checked: boolean; label: string; onChange: () => void }[];
}

const CheckboxLayer: React.FC<CheckboxLayerProps> = ({ checkboxes }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                position: 'absolute',
                left: isSmallScreen ? 'auto' : 320,
                right: isSmallScreen ? 5 : 'auto',
                bottom: 20,
                zIndex: 1200,
                backgroundColor: 'white',
                padding: isSmallScreen ? theme.spacing(1) : theme.spacing(2),
                boxShadow: theme.shadows[3],
                transform: isSmallScreen ? 'scale(0.9)' : 'none',
                display: 'inline-block',
                width: 'auto',
                maxWidth: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            {checkboxes.map((checkbox, index) => (
                <FormControlLabel
                    key={index}
                    control={<Checkbox checked={checkbox.checked} onChange={checkbox.onChange} />}
                    label={checkbox.label}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                    }}
                />
            ))}
        </Box>
    );
};

export default CheckboxLayer;