import { EarlyWarningHttpClient, EarlyWarningPrecatchingHttpClient } from '../../http-client/EarlyWarningHttpClient';
import { ForecastModel } from '../../model/ForecastModel';
import { GeoJsonType, FeaturesType } from '../../types/GeoJsonType';

const PERIODS = {
    TODAY: '24h',
    TOMORROW: '48h',
    DAY_AFTER: '72h',
};

const fetchForecast = async (period: string, forecastDate: string): Promise<string> => {
    const response = await EarlyWarningHttpClient.get<string>(`/${period}/${forecastDate}`);
    return response.data;
};

export const getForecastDates = async (forecastDate: string): Promise<ForecastModel[]> => {
    try {
        const [todayData, tomorrowData, dayAfterTomorrowData] = await Promise.all([
            fetchForecast("actual", forecastDate),
            fetchForecast("tomorrow", forecastDate),
            fetchForecast("dayaftertomorrow", forecastDate),
        ]);
        return [
            { forecastDate: todayData, period: PERIODS.TODAY, url: 'today' },
            { forecastDate: tomorrowData, period: PERIODS.TOMORROW, url: '48h' },
            { forecastDate: dayAfterTomorrowData, period: PERIODS.DAY_AFTER, url: '72h' },
        ];

    } catch (error) {
        console.error(`Error fetching warnings with warningData ${forecastDate}:`, error);
        throw new Error(`Failed to fetch forecast dates: ${error}`);
    }
};


export const getAlerts = async (forecastDate: string, url: string): Promise<GeoJsonType> => {
    try {
        const response = await EarlyWarningHttpClient.get<GeoJsonType>(`/${url}/${forecastDate}`);
        const data = response.data;

        const transformedData: GeoJsonType = {
            type: data.type,
            features: data.features.map((feature: FeaturesType) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    PP: typeof feature.properties.PP === 'string' ? JSON.parse(feature.properties.PP) : feature.properties.PP
                }
            }))
        };
        return transformedData;

    } catch (error) {
        console.error(`Error fetching ${url}'s alerts with warningDate ${forecastDate}:`, error);
        throw new Error(`Failed to fetch alerts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};