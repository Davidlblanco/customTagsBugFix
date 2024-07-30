import { useRuntime } from "vtex.render-runtime";

import { getCredisimanPaymentsIds } from "./getCredisimanPaymentsIds";
import { getImages } from "./getImages";

import { Results } from "../../../Types/Results";
import { GenericTagsFront } from "../../../Types/PaymentCustom";

type CredisimanInstallments = {
    credisimanResults: Results[];
    otherResults: Results[];
    updateAllTagsPreview?: GenericTagsFront | null;
    updateCredisimanTagsPreview?: GenericTagsFront | null;
    updateOthersTagsPreview?: GenericTagsFront | null;
}

export const credisimanInstallments = (
    results: Results[],
    tagsPreview?: GenericTagsFront | null
): CredisimanInstallments => {
    const { account } = useRuntime();
    const ids = getCredisimanPaymentsIds(account);

    const credisimanResults = results?.filter((result) => ids.includes(result.paymentId) && result.isValid);
    const otherResults = results?.filter((result) => !ids.includes(result.paymentId) && result.isValid);

    const updateAllTagsPreview = getImages(ids, "all", tagsPreview, results);
    const updateCredisimanTagsPreview = getImages(ids, "credisiman", tagsPreview);
    const updateOthersTagsPreview = getImages(ids, "others", tagsPreview, results);

    return {
        credisimanResults,
        otherResults,
        updateAllTagsPreview,
        updateCredisimanTagsPreview,
        updateOthersTagsPreview
    };
}

