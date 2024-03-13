import { Product } from "vtex.product-context/react/ProductTypes";

export const getFirstAvailableSku = (product: Product) => {
    return product?.items?.find((item) =>
        item.sellers.some(
            (s) =>
                s.commertialOffer?.AvailableQuantity > 0 && s.commertialOffer?.Price > 0
        )
    );
}
