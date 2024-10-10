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
                <Logo src="/logos/sernageomin.png" alt="SERNAGEOMIN Logo" url="https://www.sernageomin.cl/" />
                <Logo src="/logos/senapred.png" alt="SENAPRED Logo" url="https://www.senapred.cl" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Logo src="/logos/dmc.png" alt="DMC Logo" url="https://www.meteochile.gob.cl/PortalDMC-web/index.xhtml" />
                <Logo src="/logos/ufro.png" alt="UFRO Logo" url="https://www.ufro.cl" />
            </Box>
        </Box>
    );
};

export default LogoContainer;
