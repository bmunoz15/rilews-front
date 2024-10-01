import React, { useEffect, useRef } from 'react';
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
import MonitorIcon from '@mui/icons-material/Monitor';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoContainer from './LogoContainer';

const drawerWidth = 320;

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
    const [userSubOpen, setUserSubOpen] = React.useState(false);
    const [dataAdminSubOpen, setDataAdminSubOpen] = React.useState(false);
    const navigate = useNavigate();
    const drawerRef = useRef<HTMLDivElement>(null);

    const handleComponentClick = () => {
        setOpen(true);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubOpen = () => {
        setSubOpen(!subOpen);
    };

    const handleUserSubOpen = () => {
        setUserSubOpen(!userSubOpen);
    };

    const handleDataAdminSubOpen = () => {
        setDataAdminSubOpen(!dataAdminSubOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        if (!open) {
            setSubOpen(false);
            setUserSubOpen(false);
            setDataAdminSubOpen(false);
        }
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setOpen(false);
                setSubOpen(false);
                setUserSubOpen(false);
                setDataAdminSubOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drawerRef]);

    const menuItems = [
        { text: 'Monitoreo de Alertas Tempranas', icon: <MonitorIcon />, path: '/', isSubmenu: false },
        {
            text: 'Gestión de Usuarios', icon: <GroupIcon />, isSubmenu: true, subItems: [
                { text: 'Crear Usuario', path: '/sign-up' },
                { text: 'Usuarios', path: '/users' }
            ]
        },
        {
            text: 'Administrar Datos', icon: <SettingsIcon />, isSubmenu: true, subItems: [
                { text: 'Generar Reporte', path: '/' },
                { text: 'Ver Datos', path: '/' }
            ]
        },
        { text: 'Fluid', icon: <FolderIcon />, path: '/', isSubmenu: false },
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} ref={drawerRef}>
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
                        {menuItems.map((item) => (
                            <React.Fragment key={item.text}>
                                <NavItem
                                    open={open}
                                    item={item}
                                    handleNavigation={handleNavigation}
                                    handleSubOpen={
                                        item.text === 'Gestión de Usuarios'
                                            ? handleUserSubOpen
                                            : item.text === 'Administrar Datos'
                                                ? handleDataAdminSubOpen
                                                : handleSubOpen
                                    }
                                    subOpen={
                                        item.text === 'Gestión de Usuarios'
                                            ? userSubOpen
                                            : item.text === 'Administrar Datos'
                                                ? dataAdminSubOpen
                                                : subOpen
                                    }
                                    isSmallScreen={isSmallScreen}
                                />
                                {item.text === 'Gestión de Usuarios' && userSubOpen && (
                                    <SubMenu subOpen={userSubOpen} handleNavigation={handleNavigation} subItems={item.subItems} onChange={handleComponentClick} />
                                )}
                                {item.text === 'Administrar Datos' && dataAdminSubOpen && (
                                    <SubMenu subOpen={dataAdminSubOpen} handleNavigation={handleNavigation} subItems={item.subItems} onChange={handleComponentClick} />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                )}
                <Box sx={{ flexGrow: 1 }} />
                {open && (
                    <LogoContainer />
                )}
            </Drawer>




        </Box>

    );
}
