import { ConfigGroup } from "../types/ProductComparator";

export const hasMatchingCategory = (data: ConfigGroup[], productContext) => {
    const categoryIds = productContext?.product?.categoryTree?.map?.(item => item.id);
    if (!categoryIds) return false;

    return categoryIds.some(id =>
        data.some(item =>
            item?.category?.id.toString() === id.toString() &&
            item?.active === true
        )
    );
}
