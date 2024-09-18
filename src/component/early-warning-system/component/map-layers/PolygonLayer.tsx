import React from 'react';
import { GeoJSON, GeoJSONProps } from 'react-leaflet';
import { useAlerts } from '../../../context/GeoJsonProvider';
import { Features } from '../../../types/GeoJsonTypes';
import L from 'leaflet';

const PolygonLayer: React.FC = () => {
  const { alerts, getColorByStatus } = useAlerts();

  const getStyle = (feature: Features) => {
    const dmcStatus = feature.properties.dmcStatus;
    const color = getColorByStatus(dmcStatus);
    return {
      color,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5,
    };
  };

  const handleFeatureClick = (feature: Features) => {
    console.log('Feature clicked:', feature);
  };

  const onEachFeature: GeoJSONProps['onEachFeature'] = (feature, layer) => {
    (layer as L.Path).setStyle(getStyle(feature as Features));
    layer.on('click', () => handleFeatureClick(feature as Features));
  };

  const generateKey = (feature: Features) => {
    return `${feature.properties.lon_centroide}-${feature.properties.lat_centroide}`;
  };

  return (
    <>
      {alerts?.features.map((feature) => (
        <GeoJSON
          key={generateKey(feature)}
          data={feature}
          style={() => getStyle(feature)}
          onEachFeature={onEachFeature}
        />
      ))}
    </>
  );
};

export default PolygonLayer;
