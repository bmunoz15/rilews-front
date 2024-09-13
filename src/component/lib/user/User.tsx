import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const User: React.FC = () => {
    const handleClick = () => {
        alert('clicleado');
    };

    return (
        <div style={{ position: 'absolute', top: 5, right: 5, zIndex: 1000 }}>
            <IconButton onClick={handleClick}>
                <AccountCircleIcon style={{ fontSize: '64px', minWidth: '64px', color: 'white' }} />
            </IconButton>
        </div>
    );
};

export default User;