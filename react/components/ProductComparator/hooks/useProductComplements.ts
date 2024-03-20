import { useEffect, useState } from "react";
import { Product } from "vtex.product-context/react/ProductTypes";
import axios from "axios";
import { useProduct } from "vtex.product-context";

export function useProductComplements() {

  const productContext = useProduct();
  const categoryIds = productContext?.product?.categoryTree?.map((item) => item.id)?.join(",") as string[] | undefined;
  const categoryId = productContext?.product?.categoryId as string;
  const skuId = productContext?.product?.productId;

  const [dataByCategory, setDataByCategory] = useState<Product[]>([]);
  const [dataByCategories, setDataByCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (ids: string[]) => {
    if (ids) {
      setLoading(true);
      const { data } = await axios.get(`/_v/product-comparator/category/${ids}/${skuId}`);
      setLoading(false);
      return data.slice(0, 4);
    }
    return [];
  };

  useEffect(() => {
    const fetchDataAndFallback = async () => {
      if (categoryId) {
        const dataByCategory = await fetchData([categoryId]);
        setDataByCategory(dataByCategory);
      }

      if (categoryIds) {
        const dataByCategories = await fetchData(categoryIds as string[]);
        setDataByCategories(dataByCategories);
      }
    };

    fetchDataAndFallback();
  }, [categoryIds, categoryId]);

  const data = dataByCategory.length > 0 ? dataByCategory : dataByCategories;

  return {
    data,
    loading
  };
}
