import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Popover, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const User: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'user-popover' : undefined;

    const handleProfileClick = () => {
        navigate('/profile');
        handleClose();
    };

    const handleLogoutClick = () => {
        alert('clickeado');
        handleClose();
    };

    return (
        <Box
            position="absolute"
            top={5}
            right={5}
            zIndex={1500}
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                disableScrollLock
            >
                <List>
                    <ListItem
                        onClick={handleProfileClick}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="Ver Perfil" />
                    </ListItem>
                    <ListItem
                        onClick={handleLogoutClick}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary="Cerrar Sesión" />
                    </ListItem>
                </List>
            </Popover>
        </Box>
    );
};

export default User;
