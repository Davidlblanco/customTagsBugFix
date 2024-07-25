import { GenericTagsFront } from "../../../Types/PaymentCustom";

export const getImages = (
    ids: string[],
    visibility: 'credisiman' | 'others' | 'all',
    tagsPreview?: GenericTagsFront | null
): GenericTagsFront | null => {
    if (!tagsPreview) return null;

    const { tagsImgs = [] } = tagsPreview;

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

    let updateImages: {
        paymentId: string;
        id: string;
        value: string;
        path: string;
    }[] = [];

    if (visibility === "all") {
        updateImages = [...tagsImgs];

        if (ids.includes(imageCredisimanV3.paymentId)) {
            updateImages.unshift(imageCredisimanV3);
        }

        if (ids.includes(imageCredisimanV2.paymentId)) {
            updateImages.unshift(imageCredisimanV2);
        }
    } else if (visibility === "credisiman") {
        updateImages = [];

        if (ids.includes(imageCredisimanV3.paymentId)) {
            updateImages.unshift(imageCredisimanV3);
        }

        if (ids.includes(imageCredisimanV2.paymentId)) {
            updateImages.unshift(imageCredisimanV2);
        }
    } else if (visibility === "others") {
        updateImages = [...tagsImgs];
    }

    return {
        ...tagsPreview,
        tagsImgs: updateImages
    };
};