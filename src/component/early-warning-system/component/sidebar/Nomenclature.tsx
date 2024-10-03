import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme, IconButton, useMediaQuery, styled } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const StatusBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isSmallScreen',
})<{ color: string; isSmallScreen: boolean }>(({ color, isSmallScreen }) => ({
    backgroundColor: color,
    opacity: 0.55,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isSmallScreen ? '20px' : '35px',
    height: isSmallScreen ? '15px' : '20px',
    margin: '8px',
}));

const StatusText = styled(Typography)({
    color: '#000',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
});

const Nomenclature: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleIconClick = () => {
        if (isSmallScreen) {
            setExpanded(!expanded);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        if (isSmallScreen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isSmallScreen]);

    return (
        <Box ref={containerRef}>
            {isSmallScreen && !expanded && (
                <Box display="flex" justifyContent="center" bgcolor="white" borderRadius={1} mb={2}>
                    <IconButton onClick={handleIconClick}>
                        <InfoIcon style={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            )}
            {(expanded || !isSmallScreen) && (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="8px"
                    width={isSmallScreen ? 'auto' : '50%'} // Ajusta el ancho a 'auto' para small screen
                    maxWidth="100%" // Limita el ancho máximo al 100%
                    mx="auto"
                    p={1}
                    sx={{ backgroundColor: theme.palette.background.default, ml: 'auto' }} // Centra a la derecha
                >
                    <Typography variant="subtitle1" gutterBottom>
                        Leyenda Alertas
                    </Typography>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Box display="flex" flexDirection="column" alignItems="flex-end" >
                            {['Predicción', 'Aviso', 'Alerta', 'Alarma'].map((text) => (
                                <StatusText key={text}>{text}</StatusText>
                            ))}
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                            {['blue', 'yellow', 'orange', 'red'].map((color) => (
                                <StatusBox key={color} color={color} isSmallScreen={isSmallScreen} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Nomenclature;
