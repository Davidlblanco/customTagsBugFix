import { useProduct } from "vtex.product-context";
import UseSimanPro from "./useSimanPro";
import useProductSearch from "../../../hooks/useProductSearch";

export default function useSelectedProductInfo() {
   const productContext = useProduct();
   const simanpro = UseSimanPro();

   const productItem = productContext?.product;
   const selectedItem = productContext?.selectedItem;

   const productSearch = useProductSearch({ IDs: selectedItem?.itemId ? [selectedItem?.itemId] : [""] })

   const selectedItemPrice = selectedItem?.sellers[0]?.commertialOffer?.Price ?? 0;
   const selectedQuantity = productContext?.selectedQuantity ?? 0;
   const productQuantityPrice = selectedItemPrice * selectedQuantity * 100;

   return {
      skuId: selectedItem?.itemId ?? "",
      totalPrice: productQuantityPrice + simanpro.total,
      sellerId: selectedItem?.sellers[0].sellerId ?? "",
      categoriesIds: productItem?.categoryTree?.map((category) => category.id) ?? [
         productItem?.categoryId ? String(productItem?.categoryId) : "",
      ],
      brandId: productItem?.brandId ? productItem.brandId.toString() : "",
      simanpro: simanpro,
      productClusters: productSearch[0]?.productClusters ? productSearch[0]?.productClusters?.map((item) => {
         return item?.id
      }) : []
   };
}

export type SelectedProductInfo = ReturnType<typeof useSelectedProductInfo>;
