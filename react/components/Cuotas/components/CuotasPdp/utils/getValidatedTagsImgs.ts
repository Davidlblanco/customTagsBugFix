import { GenericTagsFront } from "../../../Types/PaymentCustom";
import { Results } from "../../../Types/Results";

export function getValidatedTagsImgs(results?: Results[], tagsPreview?: GenericTagsFront | null) {
    if (!tagsPreview || !tagsPreview.tagsImgs || !results) return [];

    return tagsPreview?.tagsImgs?.filter(item => {
        return results?.some(config => {
            return item.paymentId === config.paymentId &&
                config.BankTypes?.some(bank => bank.name === item.id);
        });
    });
}