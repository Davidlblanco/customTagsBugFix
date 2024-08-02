import { GenericTagsFront } from "../../../Types/PaymentCustom";
import { Results } from "../../../Types/Results";
import { getValidatedTagsImgs } from "./getValidatedTagsImgs";

export const getImages = (
    ids: string[],
    visibility: 'credisiman' | 'others' | 'all',
    tagsPreview?: GenericTagsFront | null,
    results?: Results[]
): GenericTagsFront | null => {
    if (!tagsPreview) return null;

    const imageCredisimanV3 = {
        paymentId: '402',
        id: 'CredisimanV3',
        value: 'https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/cs___bd85ef9f24aaa2353b93bf11b4c25bf7.svg',
        path: "cs___bd85ef9f24aaa2353b93bf11b4c25bf7.svg"
    };

    const imageCredisimanV2 = {
        paymentId: '403',
        id: 'CredisimanV2',
        value: 'https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/Group___754e0dac9bdd730b2eb861a1e06e863a.svg',
        path: "Group___754e0dac9bdd730b2eb861a1e06e863a.svg"
    };

    const imageCredisimanCuotas = {
        paymentId: '405',
        id: 'CredisimanCuotas',
        value: 'https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/cs___bd85ef9f24aaa2353b93bf11b4c25bf7.svg',
        path: "cs___bd85ef9f24aaa2353b93bf11b4c25bf7.svg"
    };

    let updateImages: {
        paymentId: string;
        id: string;
        value: string;
        path: string;
    }[] = [];

    const isValidCredisimanV3 = isValidCredisiman(results, imageCredisimanV3.paymentId);
    const isValidCredisimanV2 = isValidCredisiman(results, imageCredisimanV2.paymentId);
    const isValidCredisimanCuotas = isValidCredisiman(results, imageCredisimanCuotas.paymentId);

    if (visibility === "all") {
        const allValidatedTags = getValidatedTagsImgs(results, tagsPreview);
        updateImages = [...allValidatedTags];

        if (isValidCredisimanV3 && ids.includes(imageCredisimanV3.paymentId)) {
            updateImages.unshift(imageCredisimanV3);
        }

        if (isValidCredisimanV2 && ids.includes(imageCredisimanV2.paymentId)) {
            updateImages.unshift(imageCredisimanV2);
        }

        if (!isValidCredisimanV3 && isValidCredisimanCuotas && ids.includes(imageCredisimanCuotas.paymentId)) {
            updateImages.unshift(imageCredisimanCuotas);
        }
    } else if (visibility === "credisiman") {
        updateImages = [];

        if (isValidCredisimanV3 && ids.includes(imageCredisimanV3.paymentId)) {
            updateImages.unshift(imageCredisimanV3);
        }

        if (isValidCredisimanV2 && ids.includes(imageCredisimanV2.paymentId)) {
            updateImages.unshift(imageCredisimanV2);
        }

        if (!isValidCredisimanV3 && isValidCredisimanCuotas && ids.includes(imageCredisimanCuotas.paymentId)) {
            updateImages.unshift(imageCredisimanCuotas);
        }

    } else if (visibility === "others") {
        const othersValidatedTags = getValidatedTagsImgs(results, tagsPreview);
        updateImages = [...othersValidatedTags];
    }

    return {
        ...tagsPreview,
        tagsImgs: updateImages
    };
};

const isValidCredisiman = (results: Results[] | undefined, paymentId: string) => {
    const isValid = results?.find((item) => item.paymentId === paymentId)?.isValid;
    return isValid;
}