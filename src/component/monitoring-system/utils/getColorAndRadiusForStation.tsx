import COLORS from "../config/precipitationColors";
import THRESHOLDS from "../config/precipitationThresholds";
import createPrecipitationColors from "./createPrecipitationColors";
import getColorForValue from "./getColorForValue";
import getRadiusForPrecipitation from "./getRadiusForPrecipitation";
import { PrecipitationColorRange } from "../types/precipitationColorRange ";

const baseRadius = 1000;
const defaultColor = COLORS.FALLBACK_COLOR;

const customPrecipitationRanges = createPrecipitationColors([
    { min: 0, max: 0, backgroundColor: COLORS.COLOR_1 },
    { min: 0.01, max: THRESHOLDS.THRESHOLD_1, backgroundColor: COLORS.COLOR_2 },
    { min: (THRESHOLDS.THRESHOLD_1 + 0.01), max: THRESHOLDS.THRESHOLD_2, backgroundColor: COLORS.COLOR_3 },
    { min: (THRESHOLDS.THRESHOLD_2 + 0.01), max: THRESHOLDS.THRESHOLD_3, backgroundColor: COLORS.COLOR_4 },
    { min: (THRESHOLDS.THRESHOLD_3 + 0.01), max: THRESHOLDS.THRESHOLD_4, backgroundColor: COLORS.COLOR_5 },
    { min: (THRESHOLDS.THRESHOLD_4 + 0.01), max: THRESHOLDS.THRESHOLD_5, backgroundColor: COLORS.COLOR_6 },
    { min: (THRESHOLDS.THRESHOLD_5 + 0.01), max: Infinity, backgroundColor: COLORS.COLOR_7 }
]);

const getColorAndRadiusForStation = (condition: string | null, ranges: PrecipitationColorRange[] = customPrecipitationRanges) => {
    const cleanedStr = condition ? condition.replace('mm', '').replace(',', '.').trim() : '0';
    const numVal = parseFloat(cleanedStr);

    if (isNaN(numVal)) {
        console.error('Invalid value provided, not a valid number:', condition);
        return { color: defaultColor, radius: baseRadius };
    }

    const color = getColorForValue(numVal, ranges, defaultColor);
    const radius = getRadiusForPrecipitation(numVal, baseRadius);

    return { color, radius };
};

export default getColorAndRadiusForStation;
