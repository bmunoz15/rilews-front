import React, { useState } from 'react';
import { Box, Tab, Tabs, useMediaQuery, useTheme, Paper, styled } from '@mui/material';
import AlertTab from './AlertTab';
import ValidationsTab from './ValidationTab';
import { Popup } from 'react-leaflet';
import PrecipitationsTab from './PrecipitationsTab';


const StyledPopupPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
}));

interface AlertPopupMenuProps {
    dmcStatus: string;
    q1: number;
    mediana: number;
    q3: number;
    pp: [string, string, number][];
}

const AlertPopupMenu: React.FC<AlertPopupMenuProps> = ({ dmcStatus, q1, mediana, q3, pp }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Popup>
            <StyledPopupPaper
                elevation={3}
                sx={{
                    width: isSmallScreen ? '300px' : '700px',
                    height: isSmallScreen ? '400px' : '600px',
                    margin: isSmallScreen ? '0 auto' : 'initial',
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
                    {selectedTab === 0 && <AlertTab q1={q1} q3={q3} median={mediana} />}
                    {selectedTab === 1 && <PrecipitationsTab pp={pp} dmcStatus={dmcStatus} />}
                    {selectedTab === 2 && <ValidationsTab />}
                </Box>
            </StyledPopupPaper>
        </Popup>
    );
};

export default AlertPopupMenu;
