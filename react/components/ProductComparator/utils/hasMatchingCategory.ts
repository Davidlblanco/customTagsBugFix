import { ConfigGroup } from "../types/ProductComparator";
import { Product } from "vtex.product-context/react/ProductTypes";

export const hasMatchingCategory = (data: ConfigGroup[], product: Product) => {
    const categoryIds = product?.categoryId;
    if (!categoryIds) return false;

    return data.some(item =>
        item?.category?.id.toString() === categoryIds.toString() &&
        item?.active === true
    )
}
