import { getCredisimanPaymentsIds } from "./getCredisimanPaymentsIds";
import { getImages } from "./getImages";

import { Results } from "../../../Types/Results";
import { GenericTagsFront } from "../../../Types/PaymentCustom";

export const handleTags = (results: Results[], tagsPreview?: GenericTagsFront | null): handleTags => {
    const ids = getCredisimanPaymentsIds();

    const credisimanResults = results?.filter((result) => ids.includes(result.paymentId) && result.isValid);
    const otherResults = results?.filter((result) => !ids.includes(result.paymentId) && result.isValid);

    const updateAllTagsPreview = getImages("all", tagsPreview, results);
    const updateCredisimanTagsPreview = getImages("credisiman", tagsPreview, results);
    const updateOthersTagsPreview = getImages("others", tagsPreview, results);

    return {
        credisimanResults,
        otherResults,
        updateAllTagsPreview,
        updateCredisimanTagsPreview,
        updateOthersTagsPreview,
    };
};

type handleTags = {
    credisimanResults: Results[];
    otherResults: Results[];
    updateAllTagsPreview?: GenericTagsFront | null;
    updateCredisimanTagsPreview?: GenericTagsFront | null;
    updateOthersTagsPreview?: GenericTagsFront | null;
};
