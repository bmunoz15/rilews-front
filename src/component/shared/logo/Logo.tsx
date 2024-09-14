import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface LogoProps {
    src: string;
    alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    maxWidth: isSmallScreen ? '64px' : '128px',
                    width: 'auto',
                    height: 'auto',
                }}
            />
        </Box>
    );
};

export default Logo;