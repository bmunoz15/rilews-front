import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Box } from '@mui/material';

const User: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = () => {
        alert('clicleado');
    };

    return (
        <Box
            position="absolute"
            top={5}
            right={5}
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={isSmallScreen ? '40px' : 'auto'}
            height={isSmallScreen ? '40px' : 'auto'}
            bgcolor={isSmallScreen ? theme.palette.background.default : 'transparent'}
            borderRadius="8px" 
        >
            <IconButton onClick={handleClick}>
                <AccountCircleIcon
                    style={{
                        fontSize: isSmallScreen ? '24px' : '64px',
                        color: isSmallScreen ? '#808080' : theme.palette.background.default,
                    }}
                />
            </IconButton>
        </Box>
    );
};

export default User;
