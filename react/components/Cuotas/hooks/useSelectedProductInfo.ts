import { useProduct } from "vtex.product-context";
import UseSimanPro from "./useSimanPro";
import useProductSearch from "../../../hooks/useProductSearch";

export default function useSelectedProductInfo(cachedCredisiman?: Record<number, string>) {
    const productContext = useProduct();
    const simanpro = UseSimanPro();

    const productItem = productContext?.product;
    const selectedItem = productContext?.selectedItem;

    const productSearch = useProductSearch({
        IDs: selectedItem?.itemId ? [selectedItem?.itemId] : undefined,
    });

    let skuId = selectedItem?.itemId ?? "";

    const selectedItemPrice =
        selectedItem?.sellers[0]?.commertialOffer?.Price ?? 0;
    const selectedQuantity = productContext?.selectedQuantity ?? 0;
    const productQuantityPrice = selectedItemPrice * selectedQuantity * 100;
    let productQuantityCredisimanPrice = 100;

    if(cachedCredisiman?.[skuId]){
        productQuantityCredisimanPrice = cachedCredisiman[skuId].totalWithDiscount * 100;
        console.log("Tem cache ", productQuantityPrice, " x ", productQuantityCredisimanPrice)
    }

    return {
        skuId,
        totalPrice: productQuantityPrice + (simanpro.total/100),
        sellerId: selectedItem?.sellers[0].sellerId ?? "",
        categoriesIds: productSearch[0]?.categoryTree?.map(
            (category) => category.id
        ) ?? [productItem?.categoryId ? String(productItem?.categoryId) : ""],
        brandId: productItem?.brandId ? productItem.brandId.toString() : "",
        simanpro: simanpro,
        totalCredisimanPrice:  productQuantityCredisimanPrice > 0 ? (productQuantityCredisimanPrice + (simanpro.total/100)) : 0,
        productClusters: productSearch[0]?.productClusters
            ? productSearch[0]?.productClusters?.map((item) => {
                  return item?.id;
              })
            : [],
    };
}

export type SelectedProductInfo = ReturnType<typeof useSelectedProductInfo>;
