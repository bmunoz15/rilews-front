import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const User: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = () => {
        alert('clicleado');
    };

    return (
        <div style={{ position: 'absolute', top: 5, right: 5, zIndex: 1000 }}>
            <IconButton onClick={handleClick}>
                <AccountCircleIcon 
                    style={{ 
                        fontSize: isSmallScreen ? '48px' : '64px', 
                        minWidth: isSmallScreen ? '48px' : '64px', 
                        color: 'white' 
                    }} 
                />
            </IconButton>
        </div>
    );
};

export default User;