import { GeoJsonObject } from 'geojson';

interface GeoJsonModel extends GeoJsonObject {
    type: "FeatureCollection";
    features: {
        type: "Feature";
        properties: {
            Region_1: string;
            Comuna: string;
            Q1: number;
            Mediana: number;
            Q3: number;
            Region_2: string;
            lon_centroide: number;
            lat_centroide: number;
            PP: Array<[string, string, number]>;
            Etiqueta_DMC: string;
        };
        geometry: {
            type: "Polygon";
            coordinates: number[][][];
        };
    }[];
}

export default GeoJsonModel;