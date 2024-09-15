import { GeoJsonObject } from 'geojson';

export interface GeoJsonModel extends GeoJsonObject {
    type: "FeatureCollection";
    features: Feature[];
}

export interface Feature {
    type: "Feature";
    properties: FeatureProperties;
    geometry: Geometry;
}

export interface FeatureProperties {
    Region_1: string;
    Comuna: string;
    Q1: number;
    Mediana: number;
    Q3: number;
    Region_2: string;
    lon_centroide: number;
    lat_centroide: number;
    PP: string;
}

export interface Geometry {
    type: "Polygon";
    coordinates: number[][][];
}