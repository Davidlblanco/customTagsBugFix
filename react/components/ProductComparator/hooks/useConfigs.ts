import useGet from "../../../hooks/useGet";
import { ConfigGroup } from "../types/ProductComparator";

export const useConfigs = () => {
  const { data, isLoading, error } = useGet<ConfigGroup[]>({
    url: "/_v/product-comparator/config",
    initialData: [] as Array<ConfigGroup>,
  });
  return { data: data ?? [], isLoading, error };
}
