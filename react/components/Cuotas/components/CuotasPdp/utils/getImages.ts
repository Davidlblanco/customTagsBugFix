import { GenericTagsFront } from "../../../Types/PaymentCustom";
import { Results } from "../../../Types/Results";
import { getValidatedTagsImgs } from "./getValidatedTagsImgs";

export const getImages = (
    visibility: "credisiman" | "others" | "all",
    tagsPreview?: GenericTagsFront | null,
    results?: Results[]
): GenericTagsFront | null => {
    if (!tagsPreview) return null;

    const imageCredisimanV3 = {
        paymentId: "402",
        id: "CredisimanV3",
        value: "https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/cs___bd85ef9f24aaa2353b93bf11b4c25bf7.svg",
        path: "cs___bd85ef9f24aaa2353b93bf11b4c25bf7.svg",
    };

    const imageCredisimanV2 = {
        paymentId: "403",
        id: "CredisimanV2",
        value: "https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/Group___754e0dac9bdd730b2eb861a1e06e863a.svg",
        path: "Group___754e0dac9bdd730b2eb861a1e06e863a.svg",
    };

    const imageCredisimanV4 = {
        paymentId: "406",
        id: "CredisimanV2",
        value: "https://simanqa.vtexassets.com/assets/simanqa.file-manager/images/Group___754e0dac9bdd730b2eb861a1e06e863a.svg",
        path: "Group___754e0dac9bdd730b2eb861a1e06e863a.svg",
    };

    let updateImages: {
        paymentId: string;
        id: string;
        value: string;
        path: string;
    }[] = [];

    if (visibility === "all") {
        const allValidatedTags = getValidatedTagsImgs(results, tagsPreview);
        updateImages = [...allValidatedTags];

        updateImages.unshift(imageCredisimanV3);
        updateImages.unshift(imageCredisimanV2);
        updateImages.unshift(imageCredisimanV4);
    } else if (visibility === "credisiman") {
        updateImages = [];

        updateImages.unshift(imageCredisimanV3);
        updateImages.unshift(imageCredisimanV2);
        updateImages.unshift(imageCredisimanV4);
    } else if (visibility === "others") {
        const othersValidatedTags = getValidatedTagsImgs(results, tagsPreview);
        updateImages = [...othersValidatedTags];
    }

    return {
        ...tagsPreview,
        tagsImgs: updateImages,
    };
};
