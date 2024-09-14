import React from 'react';
import { Box, Typography, Link, useTheme } from '@mui/material';
import Logo from '../logo/Logo';

const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 'auto',
                mb: 2,
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderTop: '1px solid #e7e7e7',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    gap: 2,
                }}
            >
                <Logo src="/src/assets/logos/sernageomin.png" alt="SERNAGEOMIN Logo" />
                <Logo src="/src/assets/logos/senapred.png" alt="SENAPRED Logo" />
                <Logo src="/src/assets/logos/dmc.png" alt="DMC Logo" />
                <Logo src="/src/assets/logos/ufro.png" alt="UFRO Logo" />
            </Box>
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                }}
            >
                <Link href="https://www.facebook.com" target="_blank" rel="noopener" sx={{ mx: 1 }}>
                    Facebook
                </Link>
                <Link href="https://www.twitter.com" target="_blank" rel="noopener" sx={{ mx: 1 }}>
                    Twitter
                </Link>
                <Link href="https://www.instagram.com" target="_blank" rel="noopener" sx={{ mx: 1 }}>
                    Instagram
                </Link>
            </Box>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Contact: contacto@yourcompany.com | Phone: +56 9 1234 5678
            </Typography>
        </Box>
    );
};

export default Footer;