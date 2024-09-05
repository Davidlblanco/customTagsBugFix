import { getCredisimanPaymentsIds } from "./getCredisimanPaymentsIds";
import { getImages } from "./getImages";
import { Results } from "../../../Types/Results";
import { GenericTagsFront } from "../../../Types/PaymentCustom";

export const handleTags = (
    results: Results[],
    tagsPreview?: GenericTagsFront | null
): HandleTags => {
    const ids = getCredisimanPaymentsIds();
    const updatedResults = addBankTypesToConfig(results);

    const credisimanResults = updatedResults?.filter(result => ids.includes(result.paymentId) && result.isValid);
    const otherResults = updatedResults?.filter(result => !ids.includes(result.paymentId) && result.isValid);

    const filteredImages = (filterFunc: (id: string) => boolean) =>
        tagsPreview?.tagsImgs?.filter(img => filterFunc(img.paymentId ?? '')) ?? [];

    const imagesCredisiman = filteredImages(id => ids.includes(id));
    const imagesOthers = filteredImages(id => !ids.includes(id));

    const createTagsPreview = (images: typeof imagesCredisiman) => ({
        ...tagsPreview,
        tagsImgs: images,
    }) as GenericTagsFront;

    const credisimanTagsPreview = createTagsPreview(imagesCredisiman);
    const othersTagsPreview = createTagsPreview(imagesOthers);

    const allTagsPreview = {
        ...tagsPreview,
        tagsImgs: [...imagesCredisiman, ...imagesOthers],
    } as GenericTagsFront;

    const updateAllTagsPreview = getImages(allTagsPreview, updatedResults);
    const updateCredisimanTagsPreview = getImages(credisimanTagsPreview, credisimanResults);
    const updateOthersTagsPreview = getImages(othersTagsPreview, otherResults);

    return {
        credisimanResults,
        otherResults,
        updateAllTagsPreview,
        updateCredisimanTagsPreview,
        updateOthersTagsPreview,
    };
};

const addBankTypesToConfig = (configData: Results[] | null | undefined): Results[] => {
    const credisimanIds = getCredisimanPaymentsIds();

    return configData?.map(payment => {
        if (credisimanIds.includes(payment.paymentId ?? '')) {
            return {
                ...payment,
                BankTypes: [{ id: payment.paymentId }]
            };
        }
        return payment;
    }) || [];
};

type HandleTags = {
    credisimanResults: Results[];
    otherResults: Results[];
    updateAllTagsPreview?: GenericTagsFront | null;
    updateCredisimanTagsPreview?: GenericTagsFront | null;
    updateOthersTagsPreview?: GenericTagsFront | null;
};