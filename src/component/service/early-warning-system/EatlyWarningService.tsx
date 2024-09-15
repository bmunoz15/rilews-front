import EarlyWarningHttpClient from '../../http-client/EarlyWarningHttpClient';
import ForecastModel from '../../model/early-warning-system/ForecastModel';

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