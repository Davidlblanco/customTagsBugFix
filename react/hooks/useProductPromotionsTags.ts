import { useProduct } from "vtex.product-context";
import { useEffect, useState } from "react";
import { filterTags } from "../components/AutomatePriceTagEl/utils/filterTags";
import { ConfigGroupPromotions } from "../typings/config";
import useSimulationAutomatePriceTag from "./useSimulationAutomatePriceTag";

export default function useProductPromotionsTags(
  session: any,
  account: any,
  workspace: any,
  algoliaProductContext?: AlgoliaProductContext | undefined
) {
  const [filteredTags, setFilteredTags] = useState<ProcutTags>();
  const productContext = useProduct();

  const productValues = {
    skuId: productContext?.selectedItem?.itemId?.toString() || algoliaProductContext?.skuId?.toString(),
    sellerId: productContext?.selectedItem?.sellers?.[0]?.sellerId ||
      algoliaProductContext?.items?.find((item) =>
        item?.itemId?.toString() === algoliaProductContext?.skuId?.toString()
      )?.sellers?.[0]?.sellerId
  };

  const { data } = useSimulationAutomatePriceTag(session, account, workspace, productValues);

  useEffect(() => {
    if (!data || (!productContext?.product && !algoliaProductContext)) {
      return;
    }

    const configs = data?.map((item) => item?.config) ?? [];

    const _set = async () => {
      const tags = filterTags(configs);

      setFilteredTags({
        top: tags?.filter((tag) => tag?.customTag?.tagPosition === "top"),
        center: tags?.filter((tag) => tag?.customTag?.tagPosition === "center"),
        bottom: tags?.filter((tag) => tag?.customTag?.tagPosition === "bottom")
      });
    };

    _set();
  }, [data, productContext?.product, algoliaProductContext]);

  return {
    filteredTags,
    hrefProduct: productContext?.product?.link ?? algoliaProductContext?.link,
    skuId: productContext?.selectedItem?.itemId ?? algoliaProductContext?.skuId?.toString()
  };
}

interface ProcutTags {
  top: ConfigGroupPromotions[];
  center: ConfigGroupPromotions[];
  bottom: ConfigGroupPromotions[];
}