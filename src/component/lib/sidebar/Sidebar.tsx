import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import WarningIcon from '@mui/icons-material/Warning';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import MonitorIcon from '@mui/icons-material/Monitor';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
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
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                {open && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold">Rilews</Typography>
                        <Typography variant="body1" component="div" sx={{ textAlign: 'center', my: 2, whiteSpace: 'normal' }}>
                            Sistema de Alerta Temprana para Remociones en Masa Gatilladas por Lluvia
                        </Typography>
                    </Box>
                )}
                <DrawerHeader>
                    <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                        {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : (theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: 'Mapa', icon: <MapIcon />, path: '/' },
                        { text: 'Alertas', icon: <WarningIcon />, path: '/' },
                        { text: 'Monitoreo Estaciones', icon: <MonitorIcon />, path: '/monitoring-system' },
                        { text: 'Usuarios', icon: <GroupIcon />, path: '/' },
                        { text: 'Administrar Datos', icon: <SettingsIcon />, path: null },
                        { text: 'Fluid', icon: <FolderIcon />, path: '/' },
                        { text: 'db', icon: <FolderIcon />, path: '/' },
                        { text: 'db1', icon: <FolderIcon />, path: '/' },
                    ].map((item, index) => (
                        <React.Fragment key={item.text}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                    onClick={index === 4 ? handleSubOpen : () => handleNavigation(item.path!)}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                    {index === 4 && open && (
                                        subOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                    )}
                                </ListItemButton>
                            </ListItem>
                            {index === 4 && (
                                <Collapse in={subOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {[
                                            { text: 'Subitem 1', path: '/' },
                                            { text: 'Subitem 2', path: '/' },
                                            { text: 'Subitem 3', path: '/' },
                                        ].map((subItem) => (
                                            <ListItem key={subItem.text} sx={{ pl: 4 }}>
                                                <ListItemButton onClick={() => handleNavigation(subItem.path)}>
                                                    <ListItemIcon>
                                                        <FolderIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={subItem.text} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
