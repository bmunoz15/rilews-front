import THRESHOLDS from "../config/precipitationThresholds";

const mult: number = 1.4;
const getRadiusForPrecipitation = (precipitation: number, baseRadius: number): number => {
    if (precipitation === 0) {
        return baseRadius;
    } else if (precipitation <= THRESHOLDS.THRESHOLD_1) {
        return baseRadius + (baseRadius * mult);
    } else if (precipitation <= THRESHOLDS.THRESHOLD_2) {
        return baseRadius + (baseRadius * mult) * 2;
    } else if (precipitation <= THRESHOLDS.THRESHOLD_3) {
        return baseRadius + (baseRadius * mult) * 3;
    } else if (precipitation <= THRESHOLDS.THRESHOLD_4) {
        return baseRadius + (baseRadius * mult) * 4;
    } else if (precipitation <= THRESHOLDS.THRESHOLD_5) {
        return baseRadius + (baseRadius * mult) * 5;
    } else {
        return baseRadius + (baseRadius * mult) * 6;
    }
};

export default getRadiusForPrecipitation;