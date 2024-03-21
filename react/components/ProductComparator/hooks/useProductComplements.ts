import { useEffect, useState } from "react";
import { Product } from "vtex.product-context/react/ProductTypes";
import axios from "axios";
import { useProduct } from "vtex.product-context";

export function useProductComplements() {

  const productContext = useProduct();
  const categoryId = productContext?.product?.categoryId as string;
  const skuId = productContext?.product?.productId;
  const categoryIds = productContext?.product?.categoryTree?.map((item) => item.id)?.join(",");

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/_v/product-comparator/category/${categoryId}/${skuId}`);
      setLoading(false);
      return data.slice(0, 4);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar dados por categoria:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDataAndFallback = async () => {
      if (categoryId || categoryIds) {
        const dataByCategory = await fetchDataCategory(categoryId);
        const dataByCategories = await fetchDataCategory(categoryIds as string);
        setData(dataByCategory > 0 ? dataByCategory : dataByCategories);
      }
    };

    fetchDataAndFallback();
  }, [categoryId, skuId, categoryIds]);

  return {
    data,
    loading
  };
}
