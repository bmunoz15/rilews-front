import React from 'react';
import { GeoJSON, GeoJSONProps } from 'react-leaflet';
import { useAlerts } from '../../context/GeoJsonProvider';
import { FeaturesType } from '../../types/GeoJsonType';
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

  const handleFeatureClick = (feature: FeaturesType) => {
    alert(`Feature clicked: ${feature.properties.dmcStatus}`);
  };

  const onEachFeature: GeoJSONProps['onEachFeature'] = (feature, layer) => {
    (layer as L.Path).setStyle(getStyle(feature as FeaturesType));
    layer.on('click', () => handleFeatureClick(feature as FeaturesType));
  };

  return (
    <>
      {alerts?.features.map((feature) => (
        <GeoJSON
          key={feature.properties.featureId}
          data={feature}
          style={() => getStyle(feature)}
          onEachFeature={onEachFeature}
        />
      ))}
    </>
  );
};

export default PolygonLayer;
