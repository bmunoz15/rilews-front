import React, { useEffect } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DrawerToggleHeader } from './DrawerToggleHeader';
import { NavItem } from './NavItem';
import { SubMenu } from './SubMenu';
import { useNavigate } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import WarningIcon from '@mui/icons-material/Warning';
import MonitorIcon from '@mui/icons-material/Monitor';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    borderBottomRightRadius: '8px',
    borderTopRightRadius: '8px',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    borderBottomRightRadius: '8px',
    borderTopRightRadius: '8px',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

export default function MiniDrawer() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);
    const [subOpen, setSubOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubOpen = () => {
        setSubOpen(!subOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        if (!open) setSubOpen(false);
    }, [open]);

    const menuItems = [
        { text: 'Mapa', icon: <MapIcon />, path: '/', isSubmenu: false },
        { text: 'Alertas', icon: <WarningIcon />, path: '/', isSubmenu: false },
        { text: 'Monitoreo Estaciones', icon: <MonitorIcon />, path: '/monitoring-system', isSubmenu: false },
        { text: 'Usuarios', icon: <GroupIcon />, path: '/', isSubmenu: false },
        { text: 'Administrar Datos', icon: <SettingsIcon />, isSubmenu: true },
        { text: 'Fluid', icon: <FolderIcon />, path: '/', isSubmenu: false },
        { text: 'db', icon: <FolderIcon />, path: '/', isSubmenu: false },
        { text: 'db1', icon: <FolderIcon />, path: '/', isSubmenu: false },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    backgroundColor: theme.palette.background.default,
                    '& .MuiDrawer-paper': { 
                        backgroundColor: theme.palette.background.default,
                        height: isSmallScreen && !open ? 'auto' : '100%',
                    }
                }}
            >
                <DrawerToggleHeader
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
                {open && (
                    <>
                        <Box sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight="bold">Rilews</Typography>
                            <Typography variant="body1" sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                Sistema de Alerta Temprana para Remociones en Masa Gatilladas por Lluvia
                            </Typography>
                        </Box>
                        <Divider />
                    </>
                )}
                {!(isSmallScreen && !open) && (
                    <List>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={item.text}>
                                <NavItem
                                    open={open}
                                    item={item}
                                    handleNavigation={handleNavigation}
                                    handleSubOpen={handleSubOpen}
                                    subOpen={subOpen}
                                    isSmallScreen={isSmallScreen}
                                />
                                {index === 4 && <SubMenu subOpen={subOpen} handleNavigation={handleNavigation} />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Drawer>
        </Box>
    );
}