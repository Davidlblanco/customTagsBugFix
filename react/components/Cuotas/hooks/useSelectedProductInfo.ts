import { useProduct } from "vtex.product-context";
import UseSimanPro from "./useSimanPro";
import useProductSearch from "../../../hooks/useProductSearch";

export default function useSelectedProductInfo(
    cachedCredisiman?: Record<number, string>,
    algoliaProductContext?: AlgoliaProductContext | undefined
) {
    const productContext = useProduct();
    const simanpro = UseSimanPro();

    const productItem = productContext?.product ?? algoliaProductContext;
    const selectedItem = productContext?.selectedItem;

    const IDs = algoliaProductContext
        ? [algoliaProductContext?.skuId?.toString()]
        : selectedItem?.itemId
        ? [selectedItem?.itemId]
        : undefined;

    const productSearch = useProductSearch({
        IDs,
    });

    const skuId = algoliaProductContext ? algoliaProductContext.skuId?.toString() : selectedItem?.itemId ?? "";
    const sellerId = algoliaProductContext
        ? algoliaProductContext?.items[0]?.sellers[0]?.sellerId
        : selectedItem?.sellers[0].sellerId ?? "";

    const selectedItemPrice =
        selectedItem?.sellers[0]?.commertialOffer?.Price ?? algoliaProductContext?.price.price ?? 0;
    const selectedQuantity = algoliaProductContext ? 1 : productContext?.selectedQuantity ?? 0;
    const productQuantityPrice = selectedItemPrice * selectedQuantity * 100;
    let productQuantityCredisimanPrice = 0;

    if (cachedCredisiman?.[skuId]) {
        productQuantityCredisimanPrice = cachedCredisiman[skuId].totalWithDiscount * 100;
    }

    return {
        skuId,
        totalPrice: productQuantityPrice + simanpro.total / 100,
        sellerId,
        categoriesIds: productSearch[0]?.categoryTree?.map((category) => category.id) ?? [
            productItem?.categoryId ? String(productItem?.categoryId) : "",
        ],
        brandId: productItem?.brandId ? productItem.brandId.toString() : "",
        simanpro: simanpro,
        totalCredisimanPrice:
            productQuantityCredisimanPrice > 0 ? productQuantityCredisimanPrice + simanpro.total / 100 : 0,
        productClusters: productSearch[0]?.productClusters
            ? productSearch[0]?.productClusters?.map((item) => {
                  return item?.id;
              })
            : [],
    };
}

export type SelectedProductInfo = ReturnType<typeof useSelectedProductInfo>;
