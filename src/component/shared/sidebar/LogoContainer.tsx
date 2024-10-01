import React from 'react';
import { Box } from '@mui/material';
import Logo from '../logo/Logo';

const LogoContainer: React.FC = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                mb: 1,
                gap: 1,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <a href="https://www.sernageomin.cl/" target="_blank" rel="noopener noreferrer">
                    <Logo src="/src/assets/logos/sernageomin.png" alt="SERNAGEOMIN Logo" />
                </a>
                <a href="https://www.senapred.cl" target="_blank" rel="noopener noreferrer">
                    <Logo src="/src/assets/logos/senapred.png" alt="SENAPRED Logo" />
                </a>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <a href="https://www.meteochile.gob.cl/PortalDMC-web/index.xhtml" target="_blank" rel="noopener noreferrer">
                    <Logo src="/src/assets/logos/dmc.png" alt="DMC Logo" />
                </a>
                <a href="https://www.ufro.cl" target="_blank" rel="noopener noreferrer">
                    <Logo src="/src/assets/logos/ufro.png" alt="UFRO Logo" />
                </a>
            </Box>
        </Box>
    );
};

export default LogoContainer;
