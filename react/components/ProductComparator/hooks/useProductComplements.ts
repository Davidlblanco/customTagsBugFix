import { useEffect, useState } from "react";

import { Product } from "vtex.product-context/react/ProductTypes";

import axios from "axios";

export function useProductComplements(id: string[] = []) {

  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const { data } = await axios.get(
          `/_v/product-comparator/category/${id}`
        );
        setData(data.slice(0, 4));
        setLoading(false);
      }
    };

    fetchData();
  }, id);

  return { data, loading };
}