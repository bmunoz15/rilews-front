import { PrecipitationColorRange } from "../types/precipitationColorRange ";

const createPrecipitationColors = (ranges: { min: number; max: number; backgroundColor: string; }[]): PrecipitationColorRange[] => {
    return ranges.map(range => ({
        backgroundColor: range.backgroundColor,
        min: range.min,
        max: range.max,
    }));
};

export default createPrecipitationColors;
