import { PrecipitationColorRange } from "../types/precipitationColorRange ";

const getColorForValue = (numVal: number, ranges: PrecipitationColorRange[], defaultColor: string): string => {
    const colorObject = ranges.find(range => numVal >= range.min && numVal <= range.max);
    return colorObject ? colorObject.backgroundColor : defaultColor;
};

export default getColorForValue;