import EarlyWarningHttpClient from '../../http-client/EarlyWarningHttpClient';
import ForecastModel from '../../model/early-warning-system/ForecastModel';
import GeoJsonModel from '../../model/early-warning-system/GeoJsonModel';

export const getForecastDates = async (warningData: string): Promise<ForecastModel[]> => {
    try {

        const [actualResponse, tomorrowResponse, dayAfterTomorrowResponse] = await Promise.all([
            EarlyWarningHttpClient.get(`/actual/${warningData}`),
            EarlyWarningHttpClient.get(`/tomorrow/${warningData}`),
            EarlyWarningHttpClient.get(`/dayaftertomorrow/${warningData}`)
        ]);

        const actualData = actualResponse.data;
        const tomorrowData = tomorrowResponse.data;
        const dayAfterTomorrowData = dayAfterTomorrowResponse.data;

        return [
            { date: actualData, period: '24h' } as ForecastModel,
            { date: tomorrowData, period: '48h' } as ForecastModel,
            { date: dayAfterTomorrowData, period: '72h' } as ForecastModel,
        ];

    } catch (error) {
        console.error(`Error fetching warnings with warningData ${warningData}:`, error);
        throw error;
    }
};

export const getAlertsToday = async (warningData: string): Promise<GeoJsonModel> => {
    try {
        const response = await EarlyWarningHttpClient.get(`/today/${warningData}`);
        const data = response.data as any;
        const transformedData: GeoJsonModel = {
            ...data,
            features: data.features.map((feature: any) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    Etiqueta_DMC: feature.properties["Etiqueta DMC"], //corregir en backend
                    PP: parsePP(feature.properties.PP)
                }
            }))
        };

        return transformedData;
    } catch (error) {
        console.error(`Error fetching today's alerts with warningData ${warningData}:`, error);
        throw error;
    }
};
export const getAlerts48h = async (warningData: string): Promise<GeoJsonModel> => {
    try {
        const response = await EarlyWarningHttpClient.get(`/48h/${warningData}`);
        const data = response.data as any;
        const transformedData: GeoJsonModel = {
            ...data,
            features: data.features.map((feature: any) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    Etiqueta_DMC: feature.properties["Etiqueta DMC"], //corregir en backend
                    PP: parsePP(feature.properties.PP)
                }
            }))
        };
        return transformedData;
    } catch (error) {
        console.error(`Error fetching 48h alerts with warningData ${warningData}:`, error);
        throw error;
    }
};

export const getAlerts72h = async (warningData: string): Promise<GeoJsonModel> => {
    try {
        const response = await EarlyWarningHttpClient.get(`/72h/${warningData}`);
        const data = response.data as any;
        const transformedData: GeoJsonModel = {
            ...data,
            features: data.features.map((feature: any) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    Etiqueta_DMC: feature.properties["Etiqueta DMC"], //corregir en backend
                    PP: parsePP(feature.properties.PP)
                }
            }))
        };
        return transformedData;
    } catch (error) {
        console.error(`Error fetching 72h alerts with warningData ${warningData}:`, error);
        throw error;
    }
};

const parsePP = (ppString: string): [string, string, number][] => {
    let cleanedString = ppString
        .replace(/^\[|\]$/g, '') 
        .replace(/\(/g, '[')     
        .replace(/\)/g, ']')     
        .replace(/'/g, '"');    

    try {
        return JSON.parse(`[${cleanedString}]`) as [string, string, number][];
    } catch (error) {
        console.error("Error parsing PP string:", error);
        return [];
    }
};
