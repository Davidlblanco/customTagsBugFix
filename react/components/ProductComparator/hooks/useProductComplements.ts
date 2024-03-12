import { useProduct } from "vtex.product-context";
import { useEffect, useState } from "react";
import axios from "axios";

export function useProductComplements() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
