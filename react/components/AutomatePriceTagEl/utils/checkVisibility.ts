import { ConfigGroupPromotions } from "../../../typings/config";

export const checkVisibility = (tag: ConfigGroupPromotions, visibility: 'pdp' | 'productSummary'): boolean => {
    const summaryVisibility = visibility === 'productSummary' && tag?.activeTagVisibility?.productSummaryVisibility ? true : false;
    return visibility === 'pdp' && tag?.activeTagVisibility?.productVisibility ? true : summaryVisibility;
};