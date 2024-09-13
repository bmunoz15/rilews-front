import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import SidebarLogo from '../lib/Logo';

const Footer: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 'auto', mb: 2, p: 2, backgroundColor: '#f8f8f8', borderTop: '1px solid #e7e7e7' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 2 }}>
                <SidebarLogo src="/src/assets/logos/sernageomin.png" alt="logo1" />
                <SidebarLogo src="/src/assets/logos/senapred.png" alt="logo2" />
                <SidebarLogo src="/src/assets/logos/dmc.png" alt="logo3" />
                <SidebarLogo src="/src/assets/logos/ufro.png" alt="logo4" />
            </Box>
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
                Contacto: contacto@tuempresa.com | Teléfono: +56 9 1234 5678
            </Typography>
        </Box>
    );
};

export default Footer;