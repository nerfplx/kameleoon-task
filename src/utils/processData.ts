import {variantMap} from "../constants";
import type {iData} from "../types";

const processData = (data: iData) => {
    const result: { [key: string]: Array<{ date: string; visits: number; conversions: number }> } = {};

    Object.keys(variantMap).forEach(id => {
        result[variantMap[id]] = [];
    });

    data.data.forEach(dayData => {
        Object.keys(dayData.visits).forEach(variantId => {
            const variantName = variantMap[variantId];
            const visits = dayData.visits[variantId];
            const conversions = dayData.conversions[variantId];

            if (visits !== undefined && conversions !== undefined && visits > 0) {
                result[variantName].push({
                    date: dayData.date,
                    visits,
                    conversions
                });
            }
        });
    });

    return result;
};

export default processData;
