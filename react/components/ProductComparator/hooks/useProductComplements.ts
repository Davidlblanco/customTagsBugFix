import { useProduct } from "vtex.product-context";
import { useEffect, useState } from "react";

import { Product } from "vtex.product-context/react/ProductTypes";

import axios from "axios";

export function useProductComplements() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const prodData = useProduct();

  useEffect(() => {
    const fetchData = async () => {
      const ids = prodData?.product?.categoryTree
        ?.map?.((item) => item.id)
        .join(",");

      if (ids) {
        setLoading(true);
        const { data } = await axios.get(
          `/_v/product-comparator/category/${ids}`
        );
        setData(data);
        setLoading(false);
      }
    };

    fetchData();
  }, prodData?.product?.categoryTree);

  return { data, loading };
}
