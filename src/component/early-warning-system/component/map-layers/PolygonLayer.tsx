import React from 'react';
import { GeoJSON, GeoJSONProps } from 'react-leaflet';
import { useAlerts } from '../../context/GeoJsonProvider';
import { FeaturesType } from '../../types/GeoJsonType';
import AlertPopupMenu from '../info-alert/AlertPopupMenu'; // El popup que ya tienes
import L from 'leaflet';

const PolygonLayer: React.FC = () => {
  const { alerts, getColorByStatus } = useAlerts();

  const getStyle = (feature: FeaturesType) => {
    const dmcStatus = feature.properties.dmcStatus;
    const color = getColorByStatus(dmcStatus);
    return {
      color,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5,
    };
  };

  const onEachFeature: GeoJSONProps['onEachFeature'] = (feature, layer) => {
    (layer as L.Path).setStyle(getStyle(feature as FeaturesType));
  };

  return (
    <>
      {alerts?.features.map((feature) => (
        <GeoJSON
          key={feature.properties.featureId}
          data={feature}
          style={() => getStyle(feature)}
          onEachFeature={onEachFeature}
        >
          <AlertPopupMenu
            featureId={feature.properties.featureId}
            q1={feature.properties.Q1}
            mediana={feature.properties.Mediana}
            q3={feature.properties.Q3}
            pp={feature.properties.PP}
            dmcStatus={feature.properties.dmcStatus}
            forecastDate={feature.properties.forecastDate}
            forecastTargetDate={feature.properties.forecastTargetDate}
          />
        </GeoJSON>
      ))}
    </>
  );
};

export default PolygonLayer;
