import { ConfigGroup } from "../../../typings/config";
import { MaybeProduct } from "vtex.product-context/react/ProductTypes";

export const filterTags = (configs: ConfigGroup[], product: MaybeProduct): ConfigGroup[] => {
  const configsActives = configs?.filter((config) => config?.active === true);
  const includedTags = filterIncludedTags(configsActives, product);
  const excludedTags = filterExcludedTags(configsActives, product);

  const filteredTags = includedTags?.filter((includedTag) => !excludedTags?.some((excludedItem) => includedTag?.id === excludedItem?.id));

  return filterTagsByDeadLine(filteredTags) ?? [];
};

const filterIncludedTags = (configs: ConfigGroup[], product: MaybeProduct): ConfigGroup[] => {

  return (
    configs?.filter((config) => {
      const { tagIncluded } = config;

      const hasMatchingCategories = getCategoryValues(product, tagIncluded?.category?.values);
      const collections = getCollectionIds(product);
      const brand = product?.brand;
      const skusId = getSkusIds(product);

      if (tagIncluded?.category?.active && hasMatchingCategories) {
        return true;
      }

      if (tagIncluded?.collection?.active && collections?.some((coll) => tagIncluded?.collection?.values?.includes(coll))) {
        return true;
      }

      if (tagIncluded?.brand?.active && brand && tagIncluded?.brand?.values?.includes(brand)) {
        return true;
      }

      if (tagIncluded?.sku?.active && skusId?.some((skuId) => tagIncluded?.sku?.values?.includes(skuId))) {
        return true;
      }

      return false;
    }) || []
  );
};

export const filterExcludedTags = (configs: ConfigGroup[], product: MaybeProduct): ConfigGroup[] => {
  return (
    configs?.filter((config) => {
      const { tagNotIncluded } = config;

      const hasMatchingCategories = getCategoryValues(product, tagNotIncluded?.category?.values);
      const collections = getCollectionIds(product);
      const brand = product?.brand;
      const skusId = getSkusIds(product);

      return (
        (tagNotIncluded?.category?.active && hasMatchingCategories) ||
        (tagNotIncluded?.collection?.active && collections?.some((coll) => tagNotIncluded?.collection?.values?.includes(coll))) ||
        (tagNotIncluded?.brand?.active && brand && tagNotIncluded?.brand?.values?.includes(brand)) ||
        (tagNotIncluded?.sku?.active && skusId?.some((skuId) => tagNotIncluded?.sku?.values?.includes(skuId)))
      );
    }) || []
  );
};

const getCategoryValues = (product: MaybeProduct, values: { value: string; name: string; label: string; childrensIds: string[] }[]): boolean => {
  const categoryTree = product?.categoryTree;
  const categoryId = product?.categoryId;
  const categoryIds = product?.categoriesIds?.[0]?.split("/") ?? product?.categoryTree?.map(category => category.id.toString());

  if (categoryTree) {
    const categoryTreeIds = categoryTree?.map((category) => category?.id?.toString());
    return !!categoryTreeIds?.some((cat) => values?.some((val) => val?.value === cat));
  }

  if (categoryIds) {
    return categoryIds.some((id) => id && values?.some((val) => val?.value == id));
  }

  if (categoryId) {
    return checkCategoryIdInValues(categoryId, values);
  }

  return false;
};

const getCollectionIds = (product: MaybeProduct): string[] | undefined => {
  return product?.productClusters?.map((collection) => collection?.id?.toString());
};

const getSkusIds = (product: MaybeProduct): string[] | undefined => {
  return product?.items?.map((sku) => sku?.itemId?.toString());
};

const checkCategoryIdInValues = (categoryId: string, values: { value: string; name: string; label: string; childrensIds: string[] }[]) => {
  return values?.some((val) => val?.value === categoryId || val?.childrensIds?.includes(categoryId?.toString()));
};

const filterTagsByDeadLine = (configs: ConfigGroup[]): ConfigGroup[] => {
  const currentDate = new Date();

  return configs.filter((config) => {
    const { deadlineTag } = config;
    const startDate = deadlineTag?.startDate ? new Date(deadlineTag?.startDate) : null;
    const endDate = deadlineTag?.noEndDate ? null : deadlineTag?.endDate ? new Date(deadlineTag?.endDate) : null;

    return !((startDate && currentDate < startDate) || (endDate && currentDate > endDate));
  });
};
