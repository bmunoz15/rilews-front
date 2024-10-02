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
    style: {
        color: string;
        radius: number;
    };
}


const CircleCustomLayer: React.FC = () => {
    const map = useMap();
    const [markerLocations, setMarkerLocations] = useState<MarkerLocation[]>([]);
    const [detailedStationData, setDetailedStationData] = useState<any | null>(null);


    const getInitialStationData = async () => {
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
                style: getColorAndRadiusForStation(station.precipitation24),
            }));
            setMarkerLocations(processedData);

        } catch (error) {
            console.error('Error al obtener los datos de la estación:', error);
        }
    };


    const handleCircleClick = async (code: string) => {
        try {
            const data = await getStationDataById("dmc/code", code);

            setDetailedStationData({ ...data });

            console.log('Estado detallado de la estación:', { ...data });
        } catch (error) {
            console.error('Error al obtener los datos de la estación:', error);
        }
    };


    useEffect(() => {
        getInitialStationData();
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
                        click: () => handleCircleClick(marker.code),
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
                                    org: "DMC"
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