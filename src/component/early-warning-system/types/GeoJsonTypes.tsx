export interface Features {
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
        dmcStatus: string;
        color: string;
        area_km_2: number;
    };
    geometry: {
        type: "Polygon";
        coordinates: number[][][]; 
    };
}

export interface GeoJsonModel {
    features: Features[];
}

export interface AlertsContextType {
    alerts: GeoJsonModel | null;
    setAlerts: (alerts: GeoJsonModel | null) => void;
    getColorByStatus: (dmcStatus: string) => string;
}
