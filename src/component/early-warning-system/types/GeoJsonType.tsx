export interface PropertiesType {
    Region_1: string;
    Comuna: string;
    Q1: number;
    Mediana: number;
    Q3: number;
    lon_centroide: number;
    lat_centroide: number;
    PP: Array<[string, string, number]>;
    dmcStatus: string;
    color: string;
    forecastDate: string;
    forecastTargetDate: string;
    featureId: string;
}

export interface FeaturesType {
    type: "Feature";
    properties: PropertiesType;
    geometry: {
        type: "Polygon";
        coordinates: number[][][];
    };
}

export interface GeoJsonType {
    type: "FeatureCollection";
    features: FeaturesType[];
}
export interface AlertsContextType {
    alerts: GeoJsonType | null;
    setAlerts: (alerts: GeoJsonType | null) => void;
    getColorByStatus: (dmcStatus: string) => string;
}
