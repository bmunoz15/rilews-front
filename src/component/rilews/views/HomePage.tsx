import React, { useState } from 'react';
import CheckboxLayer from '../component/CheckboxLayer';
import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import SideBarInformation from '../component/SideBarInformation';
import EwsContent from '../../early-warning-system/component/EwsContent';
import { GeoJsonProvider } from '../../early-warning-system/context/GeoJsonProvider';
import CircleCustomLayer from '../../monitoring-system/component/map-layers/CircleCustomLayer';
import LegendContainer from '../component/LegendContainer';
import { ALERT_LEGEND } from '../../early-warning-system/config/constant';
import { MONITORING_LEGEND } from '../../monitoring-system/config/monitoringLegends'

const HomePage: React.FC = () => {
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        showEwsContent: localStorage.getItem('showEwsContent') ? JSON.parse(localStorage.getItem('showEwsContent')!) : true,
        showStationContent: localStorage.getItem('showStationContent') ? JSON.parse(localStorage.getItem('showStationContent')!) : true,
    });

    const centerPosition: LatLngExpression = [-38.6679, -72.2610];
    const tileUrl =
        'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png?api_key=bbaa0e7d-9c63-4ece-9a14-a60e6a430e23';
    const tileAttribution =
        '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data)';

    const handleCheckboxChange = (key: string) => {
        setCheckboxStates((prev) => ({ ...prev, [key]: !prev[key] }));
        localStorage.setItem(key, JSON.stringify(!checkboxStates[key]));
    };

    {/* Change this variables*/ }
    const legendsToShow = [
        {
            show: checkboxStates.showEwsContent,
            colors: ALERT_LEGEND.colors,
            texts: ALERT_LEGEND.texts,
            label: ALERT_LEGEND.label
        },
        {
            show: checkboxStates.showStationContent,
            colors: MONITORING_LEGEND.colors,
            texts: MONITORING_LEGEND.texts,
            label: MONITORING_LEGEND.label
        }
    ];


    return (
        <>
            <CheckboxLayer
                checkboxes={[
                    {
                        checked: checkboxStates.showEwsContent,
                        label: 'Warnings Activos',
                        onChange: () => handleCheckboxChange('showEwsContent'),
                    },
                    {
                        checked: checkboxStates.showStationContent,
                        label: 'Estaciones Meterológicas',
                        onChange: () => handleCheckboxChange('showStationContent'),
                    },
                ]}
            />

            <MapContainer
                center={centerPosition}
                zoom={7}
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer url={tileUrl} attribution={tileAttribution} />


                <SideBarInformation>
                    {checkboxStates.showEwsContent && (
                        <GeoJsonProvider>
                            <EwsContent />
                        </GeoJsonProvider>
                    )}

                    <LegendContainer
                        legends={legendsToShow}
                    />
                </SideBarInformation>

                {checkboxStates.showStationContent && <CircleCustomLayer />}
            </MapContainer>
        </>
    );
};

export default HomePage;
