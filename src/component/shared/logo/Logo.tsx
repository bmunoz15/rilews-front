import React from 'react';
import { Box } from '@mui/material';

interface LogoProps {
    src: string;
    alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    maxWidth: '128px',
                    minWidth: '64px',
                    width: 'auto',
                    height: 'auto',
                }}
            />
        </Box>
    );
};

export default Logo;