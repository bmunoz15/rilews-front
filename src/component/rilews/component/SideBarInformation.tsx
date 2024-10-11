import React, { useCallback, useState } from 'react';
import { Drawer, Stack, IconButton, Grid2 } from '@mui/material';
import { useMap } from 'react-leaflet';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ZoomControl from './ZoomControl';

interface SideBarInformationProps {
    children: React.ReactNode;
}

const SideBarInformation: React.FC<SideBarInformationProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(localStorage.getItem('isDrawerOpen') ? JSON.parse(localStorage.getItem('isDrawerOpen')!) : true);
    const map = useMap();

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        localStorage.setItem('isDrawerOpen', JSON.stringify(!isOpen));
    };

    const disableMapInteractions = useCallback(() => {
        if (map) {
            map.dragging.disable();
            map.scrollWheelZoom.disable();
        }
    }, [map]);

    const enableMapInteractions = useCallback(() => {
        if (map) {
            map.dragging.enable();
            map.scrollWheelZoom.enable();
        }
    }, [map]);

    return (
        <>
            <Grid2 container
                sx={{
                    position: 'absolute',
                    right: 26,
                    top: 5,
                    zIndex: 1300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 4,
                    width: 'auto',
                    maxWidth: 550,
                }}
            >
                <IconButton
                    aria-label="arrow"
                    onClick={toggleDrawer}
                    sx={{
                        display: 'flex',
                        position: 'relative',
                        left: isOpen ? '-500px' : '0',
                        marginTop: 10,
                        marginLeft: -40,
                        backgroundColor: 'white',
                        transition: 'left 0.225s, transform 0.225s',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        ":hover": {
                            backgroundColor: '#e6e6e6',
                            transform: `scale(1.1) ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                        }
                    }}
                >
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>
                <ZoomControl isOpen={isOpen} />

                <Drawer
                    anchor="right"
                    open={isOpen}
                    variant="persistent"
                    onMouseEnter={disableMapInteractions}
                    onMouseLeave={enableMapInteractions}
                    sx={{
                        '& .MuiDrawer-paper': {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            width: 500,
                            height: '100vh',
                            overflowY: 'auto',
                            mt: 2,
                            mb: 2,
                            border: 'none',
                        }
                    }}
                >
                    <Stack>
                        {children}
                    </Stack>
                </Drawer>
            </Grid2>
        </>
    );
};

export default SideBarInformation;
