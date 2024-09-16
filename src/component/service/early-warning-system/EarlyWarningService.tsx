import EarlyWarningHttpClient from '../../http-client/EarlyWarningHttpClient';
import ForecastModel from '../../model/early-warning-system/ForecastModel';
import GeoJsonModel from '../../model/early-warning-system/GeoJsonModel';

const PERIODS = {
    TODAY: '24h',
    TOMORROW: '48h',
    DAY_AFTER: '72h',
};

const fetchForecast = async (period: string, warningDate: string): Promise<any> => {
    return EarlyWarningHttpClient.get(`/${period}/${warningDate}`);
};

export const getForecastDates = async (warningDate: string): Promise<ForecastModel[]> => {
    try {
        const [todayResponse, tomorrowResponse, dayAfterTomorrowResponse] = await Promise.all([
            fetchForecast("actual", warningDate),
            fetchForecast("tomorrow", warningDate),
            fetchForecast("dayaftertomorrow", warningDate),
        ]);

        const todayData = todayResponse.data;
        const tomorrowData = tomorrowResponse.data;
        const dayAfterTomorrowData = dayAfterTomorrowResponse.data;

        return [
            { date: todayData, period: PERIODS.TODAY, url: 'today' } as ForecastModel,
            { date: tomorrowData, period: PERIODS.TOMORROW, url: '48h' } as ForecastModel,
            { date: dayAfterTomorrowData, period: PERIODS.DAY_AFTER, url: '72h' } as ForecastModel,
        ];

    } catch (error) {
        //Manage error
        console.error(`Error fetching warnings with warningData ${warningDate}:`, error);
        throw error;
    }
};


export const getAlerts = async (warningDate: string, url: string): Promise<GeoJsonModel> => {
    try {
        const response = await EarlyWarningHttpClient.get(`/${url}/${warningDate}`);
        const data = response.data as any;

        const transformedData: GeoJsonModel = {
            ...data,
            features: data.features.map((feature: any) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    PP: parsePP(feature.properties.PP)
                }
            }))
        };

        return transformedData;

    } catch (error) {
        //Manage error
        console.error(`Error fetching ${url}'s alerts with warningData ${warningDate}:`, error);
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
        //manage error
        console.error("Error parsing PP string:", error);
        return [];
    }
};