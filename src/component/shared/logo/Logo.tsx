import React from 'react';
import { Box } from '@mui/material';

interface SidebarLogoProps {
    src: string;
    alt: string;
}

const Logo: React.FC<SidebarLogoProps> = ({ src, alt }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={src} alt={alt} style={{ maxWidth: '128px', minWidth: '64px' }} />
        </Box>
    );
};

export default Logo;