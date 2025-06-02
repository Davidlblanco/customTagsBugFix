import { useProduct } from "vtex.product-context";
import { useEffect, useState } from "react";
import { filterTags } from "../components/CustomTagsEl/utils/filterTags";
import { ConfigGroup } from "../typings/config";
import axios from "axios";
import { SearchProduct } from "../typings/search";
import { useCustomTagConfigs } from "../contexts/CustomTagsConfigsContext";

export default function useProductTags(algoliaProductContext?: AlgoliaProductContext | undefined) {
    const [filteredTags, setFilteredTags] = useState<ProcutTags>();
    const productContext = useProduct();
    const algoliaContext = algoliaProductContext;
    const { data } = useCustomTagConfigs();

    useEffect(() => {
        if (!data || (!productContext?.product && !algoliaContext)) {
            return;
        }
        const _set = async () => {
            const prod = productContext?.product!;

            if (
                !prod?.categoryTree &&
                !algoliaContext?.categoryTree &&
                !prod?.categoryId &&
                !algoliaContext?.categoryId
            ) {
                const _aditionalData = await getProductData(prod.productId ?? algoliaContext?.skuId);
                prod.categoryId = _aditionalData?.categoryId;
                prod.categoriesIds = _aditionalData?.categoriesIds;
            }
            const tags = filterTags(data, prod ?? algoliaContext, productContext?.selectedItem?.itemId);

            setFilteredTags({
                top: tags?.filter(
                    (tag: any) => tag?.customTag?.tagPosition === "top" && tag?.tagTemplate === "customTagTemplate"
                ),
                center: tags?.filter(
                    (tag: any) => tag?.customTag?.tagPosition === "center" && tag?.tagTemplate === "customTagTemplate"
                ),
                bottom: tags?.filter(
                    (tag: any) => tag?.customTag?.tagPosition === "bottom" && tag?.tagTemplate === "customTagTemplate"
                ),
                tagInsignia: tags?.filter((tag: any) => tag?.tagTemplate === "tagInsigniaTemplate"),
            });
        };

        _set();
    }, [data, productContext?.product, algoliaContext, productContext?.selectedItem]);

    return {
        filteredTags,
        hrefProduct: productContext?.product?.link ?? algoliaContext?.link,
        skuId: productContext?.selectedItem?.itemId ?? algoliaContext?.skuId?.toString(),
    };
}

interface ProcutTags {
    top: ConfigGroup[];
    center: ConfigGroup[];
    bottom: ConfigGroup[];
    tagInsignia: ConfigGroup[];
}

async function getProductData(productId: string) {
    const { data } = await axios.get<SearchProduct[]>(
        `/api/catalog_system/pub/products/search?fq=productId:${productId}`
    );
    return data[0];
}
