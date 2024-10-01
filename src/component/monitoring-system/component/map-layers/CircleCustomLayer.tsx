import React, { useState, useEffect } from 'react';
import { Circle, Popup, useMap } from 'react-leaflet';
import VariablesTab from '../info-station/VariablesTab';
import { LatLngExpression } from 'leaflet';
import { getStationDataById, getStationData } from '../../service/MonitoringService';
import getColorAndRadiusForStation from '../../utils/getColorAndRadiusForStation';

interface MarkerLocation {
    latLng: LatLngExpression;
    stationData: {
        nombre: string;
        latitud: string;
        longitud: string;
        elevacion: string;
    };
    code: string;
    org: string;
    style: {
        color: string;
        radius: number;
    };
}


const CircleCustomLayer: React.FC = () => {
    const map = useMap();
    const [markerLocations, setMarkerLocations] = useState<MarkerLocation[]>([]);
    const [detailedStationData, setDetailedStationData] = useState<any | null>(null);


    const getInitialStationDMCData = async () => {
        try {
            const response = await getStationData("dmc/precipitation/latest");

            const stationsArray = Array.isArray(response) ? response : Object.values(response);

            const processedData = stationsArray.map((station: any) => ({
                latLng: [
                    parseFloat(station.latitude),
                    parseFloat(station.longitude)
                ] as LatLngExpression,
                stationData: {
                    nombre: station.name,
                    latitud: station.latitude,
                    longitud: station.longitude,
                    elevacion: station.elevation,
                },
                code: station.code,
                org: "DMC",
                style: getColorAndRadiusForStation(station.precipitation24),
            }));
            setMarkerLocations(prevLocations => [...prevLocations, ...processedData]);

        } catch (error) {
            console.error('Error al obtener los datos de la estación DMC:', error);
        }
    };

    const getInitialStationIniaData = async () => {
        try {
            const response = await getStationData("inia/latest");

            const stationsArray = Array.isArray(response) ? response : Object.values(response);

            const processedData = stationsArray.map((station: any) => ({
                latLng: [
                    parseFloat(station.latitude),
                    parseFloat(station.longitude)
                ] as LatLngExpression,
                stationData: {
                    nombre: station.name,
                    latitud: station.latitude,
                    longitud: station.longitude,
                    elevacion: station.elevation,
                },
                code: station.code,
                org: "INIA",
                style: getColorAndRadiusForStation(station.precipitation),
            }));
            setMarkerLocations(prevLocations => [...prevLocations, ...processedData]);

        } catch (error) {
            console.error('Error al obtener los datos de la estación INIA:', error);
        }
    };


    const handleCircleClick = async (code: string, org: string) => {
        try {
            if (org === "DMC") {
                const data = await getStationDataById("dmc/code", code);
                setDetailedStationData({ ...data });
                console.log('Estado detallado de la estación:', { ...data });
            } else if(org === "INIA") {
                const data = await getStationDataById("inia/code", code);
                setDetailedStationData({ ...data });
                console.log('Estado detallado de la estación:', { ...data });
            }
        } catch (error) {
            console.error('Error al obtener los datos de la estación:', error);
        }
    };


    useEffect(() => {
        getInitialStationDMCData();
        getInitialStationIniaData();
    }, [map]);

    return (
        <>
            {markerLocations && markerLocations.map((marker, index) => (
                <Circle
                    key={index}
                    center={marker.latLng}
                    radius={marker.style.radius}
                    fillOpacity={0.6}
                    pathOptions={{ color: marker.style.color }}
                    eventHandlers={{
                        click: () => handleCircleClick(marker.code, marker.org),
                    }}
                >
                    {detailedStationData && (
                        <Popup
                            position={marker.latLng}
                            closeButton={true}
                            eventHandlers={{
                                remove: () => setDetailedStationData(null)
                            }}
                        >
                            <VariablesTab
                                header={{
                                    name: detailedStationData.name,
                                    code: detailedStationData.code,
                                    org: detailedStationData.org,
                                }}
                                position={{
                                    latitude: detailedStationData.latitude,
                                    longitude: detailedStationData.longitude,
                                    elevation: detailedStationData.elevation
                                }}
                                variables={{
                                    precipitation: detailedStationData.precipitation,
                                    precipitation24: detailedStationData.precipitation24,
                                    temperature: detailedStationData.temperature,
                                    pressure: detailedStationData.pressure,
                                    relativeHumidity: detailedStationData.relativeHumidity,
                                    dateTime: detailedStationData.dateTime
                                }}
                            />

                        </Popup>
                    )}
                </Circle>
            ))}
        </>
    )
}

export default CircleCustomLayer;