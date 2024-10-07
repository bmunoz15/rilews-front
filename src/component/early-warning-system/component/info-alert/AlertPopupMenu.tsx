import React, { useState } from 'react';
import { Box, Tab, Tabs, styled } from '@mui/material';
import AlertTab from './AlertTab';
import ValidationsTab from './ValidationTab';
import { Popup } from 'react-leaflet';
import PrecipitationsTab from './PrecipitationsTab';
import { useAlerts } from '../../context/GeoJsonProvider';

const StyledPop = styled(Popup)`
  background-color: #f6f6f6;
  border-radius: 8px;

  .leaflet-popup-content-wrapper {
    border-radius: 8px;
    background-color: #f6f6f6;
  }

  .leaflet-popup-content {
    width: 700px !important;
    height: 600px !important;
  }
`;

interface AlertPopupMenuProps {
    dmcStatus: string;
    q1: number;
    mediana: number;
    q3: number;
    pp: [string, string, number][];
    forecastDate: string;
    forecastTargetDate: string;
}

const AlertPopupMenu: React.FC<AlertPopupMenuProps> = ({ dmcStatus, q1, mediana, q3, pp, forecastDate, forecastTargetDate }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { getColorByStatus } = useAlerts();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <StyledPop>
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
            <Box mt={2}
                sx={{
                    height: '500px',
                    overflowY: 'auto',
                }}>
                {selectedTab === 0 && <AlertTab q1={q1} q3={q3} median={mediana} color={getColorByStatus(dmcStatus)} forecastTargetDate={forecastTargetDate} />}
                {selectedTab === 1 && <PrecipitationsTab pp={pp} dmcStatus={dmcStatus} />}
                {selectedTab === 2 && <ValidationsTab dmcStatus={dmcStatus} forecastDate={forecastDate} forecastTargetDate={forecastTargetDate} />}
            </Box>
        </StyledPop>
    );
};

export default AlertPopupMenu;
