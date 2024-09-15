import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';

interface PolygonLayerProps {
  data: GeoJsonObject;
  getStyle: (feature: any) => {
    color: string;
    weight: number;
    opacity: number;
    fillOpacity: number;
  };
}

const PolygonLayer: React.FC<PolygonLayerProps> = ({ data, getStyle }) => {
  const onEachFeature = (feature: any, layer: any) => {
    layer.setStyle(getStyle(feature));
    layer.on('click', () => {
      alert('presionado');
    });
  };

  return (
    <GeoJSON 
      data={data}
      style={(feature) => getStyle(feature)}
      onEachFeature={onEachFeature}
    />
  );
};

export default PolygonLayer;
