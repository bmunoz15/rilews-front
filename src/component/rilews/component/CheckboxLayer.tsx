import React from 'react';
import { Box, FormControlLabel, Checkbox } from '@mui/material';

interface CheckboxLayerProps {
    checkboxes: { checked: boolean; label: string; onChange: () => void }[];
}

const CheckboxLayer: React.FC<CheckboxLayerProps> = ({ checkboxes }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: 300,
                bottom: 20,
                zIndex: 1200,
                backgroundColor: 'white',
            }}
        >
            {checkboxes.map((checkbox, index) => (
                <FormControlLabel
                    key={index}
                    control={<Checkbox checked={checkbox.checked} onChange={checkbox.onChange} />}
                    label={checkbox.label}
                />
            ))}
        </Box>
    );
};

export default CheckboxLayer;