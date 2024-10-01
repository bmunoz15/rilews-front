import MonitoringHttpClient from "../http-client/MonitoringHttpClient";
import StationDmcData from "../model/StationDmcDataModel";

const fetchStationDataById = async (endpoint: string, param: string): Promise<any> => {
    return MonitoringHttpClient.get(`/${endpoint}/${param}`);
};

const fetchStationData = async (endpoint: string): Promise<any> => {
    return MonitoringHttpClient.get(`/${endpoint}`);
}

export const getStationDataById = async (endpoint: string, param: string): Promise<StationDmcData> => {
    try {
        const response = await fetchStationDataById(endpoint, param);

        return {
            ...response.data
        } as StationDmcData;

    } catch (error) {
        console.error(`Error fetching data with station DMC ${param}:`, error);
        throw error;
    }
}


export const getStationData = async (endpoint: string): Promise<any> => {
    try {
        const response = await fetchStationData(endpoint);

        return {
            ...response.data
        } as Array<StationDmcData>
    } catch (error) {
        console.error(`Error fetching data: `, error);
        throw error;
    }
} 