import { GenericTagsFront } from "../../../Types/PaymentCustom";
import { Results } from "../../../Types/Results";
import { getValidatedTagsImgs } from "./getValidatedTagsImgs";

export const getImages = (
    tagsPreview?: GenericTagsFront | null,
    results?: Results[]
): GenericTagsFront | null => {
    if (!tagsPreview) return null;

    const validatedTags = getValidatedTagsImgs(results, tagsPreview);

    return {
        ...tagsPreview,
        tagsImgs: validatedTags,
    };
};