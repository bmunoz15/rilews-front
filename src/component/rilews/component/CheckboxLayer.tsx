import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, useTheme, Button } from '@mui/material';

interface CheckboxLayerProps {
    checkboxes: { checked: boolean; label: string; onChange: () => void }[];
}

const CheckboxLayer: React.FC<CheckboxLayerProps> = ({ checkboxes }) => {
    const [isVisible, setIsVisible] = useState(false);
    const theme = useTheme();

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                right: 700,
                bottom: 20,
                zIndex: 1500,
                textAlign: 'center',
            }}
        >
            {isVisible && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '100%',
                        mb: theme.spacing(1),
                        padding: theme.spacing(2),
                        backgroundColor: 'white',
                        boxShadow: theme.shadows[3],
                        borderRadius: '8px',
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
            )}

            <Button
                variant="contained"
                onClick={toggleVisibility}
                sx={{
                    backgroundColor: '#f6f6f6',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                    zIndex: 1100,
                }}
            >
                Capas
            </Button>
        </Box>
    );
};

export default CheckboxLayer;
