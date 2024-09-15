import React from 'react';
import { Box, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import Logo from '../logo/Logo';

const Footer: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 'auto',
                backgroundColor: theme.palette.background.default,
                flexShrink: 0,
                color: theme.palette.text.primary,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    justifyContent: 'center',
                    mb: 1,
                    gap: 1,
                }}
            >
                <Logo src="/src/assets/logos/sernageomin.png" alt="SERNAGEOMIN Logo" />
                <Logo src="/src/assets/logos/senapred.png" alt="SENAPRED Logo" />
                <Logo src="/src/assets/logos/dmc.png" alt="DMC Logo" />
                <Logo src="/src/assets/logos/ufro.png" alt="UFRO Logo" />
            </Box>
            <Typography variant="body2" color="textPrimary" align="center">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    justifyContent: 'center',
                    mt: 2,
                    gap: isSmallScreen ? 1 : 2,
                }}
            >
                <Link href="https://www.facebook.com" target="_blank" rel="noopener" sx={{ mb: isSmallScreen ? 1 : 0 }}>
                    Facebook
                </Link>
                <Link href="https://www.twitter.com" target="_blank" rel="noopener" sx={{ mb: isSmallScreen ? 1 : 0 }}>
                    Twitter
                </Link>
                <Link href="https://www.instagram.com" target="_blank" rel="noopener" sx={{ mb: isSmallScreen ? 1 : 0 }}>
                    Instagram
                </Link>
            </Box>
            <Typography variant="body2" color="textPrimary" align="center" sx={{ mt: 2 }}>
                Contact: contacto@yourcompany.com | Phone: +56 9 1234 5678
            </Typography>
        </Box>
    );
};

export default Footer;
