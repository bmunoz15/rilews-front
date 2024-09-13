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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MapIcon from '@mui/icons-material/Map';
import WarningIcon from '@mui/icons-material/Warning';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubOpen = () => {
        setSubOpen(!subOpen);
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
                    {['Mapa', 'Alertas', 'Usuarios', 'Administrar Datos', 'Fluid', 'db', 'db1'].map((text, index) => (
                        <React.Fragment key={text}>
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
                                    onClick={index === 3 ? handleSubOpen : undefined}
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
                                        {index === 0 ? <MapIcon /> :
                                            index === 1 ? <WarningIcon /> :
                                                index === 2 ? <GroupIcon /> :
                                                    index === 3 ? <SettingsIcon /> :
                                                        index >= 4 ? <FolderIcon /> : <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
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
                                    {index === 3 && open && (
                                        subOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                                    )}
                                </ListItemButton>
                            </ListItem>
                            {index === 3 && (
                                <Collapse in={subOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {['Subitem 1', 'Subitem 2', 'Subitem 3'].map((subText) => (
                                            <ListItem key={subText} sx={{ pl: 4 }}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <FolderIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={subText} />
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
