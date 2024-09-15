import React, { useState } from 'react';
import { Box, Tab, Tabs, useMediaQuery, useTheme, Paper } from '@mui/material';
import AlertTab from './AlertTab';
import PrecipitationsTab from './PrecipitationsTab';
import ValidationsTab from './ValidationTab';
import { Popup } from 'react-leaflet';
import styled from 'styled-components';

const StyledPopup = styled(Popup)`
    .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }

    .leaflet-popup-content {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
    }

    .leaflet-popup-tip-container {
        display: none;
    }
`;

const CustomPopup: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <StyledPopup>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: isSmallScreen ? '300px' : '700px',
                    height: isSmallScreen ? '400px' : '600px',
                    margin: isSmallScreen ? '0 auto' : 'initial',
                    backgroundColor: theme.palette.background.default,
                    borderRadius: '12px',
                    padding: '16px',
                }}
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    allowScrollButtonsMobile
                >
                    <Tab label="Alerta" sx={{ color: 'primary.main', textTransform: 'none' }} />
                    <Tab label="Precipitaciones" sx={{ color: 'primary.main', textTransform: 'none' }} />
                    <Tab label="Validaciones" sx={{ color: 'primary.main', textTransform: 'none' }} />
                </Tabs>
                <Box
                    mt={2}
                    sx={{   
                        overflowY: 'auto',
                        height: '100%',
                        width: '100%',
                        padding: '8px',
                    }}
                >
                    {selectedTab === 0 && <AlertTab />}
                    {selectedTab === 1 && <PrecipitationsTab />}
                    {selectedTab === 2 && <ValidationsTab />}
                </Box>
            </Paper>
        </StyledPopup>
    );
};

export default CustomPopup;
