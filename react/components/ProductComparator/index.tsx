import React from "react";

import { useProduct } from "vtex.product-context";

import style from './styles.css';
import { useConfigs } from "./hooks/useConfigs";
import { useProductComplements } from "./hooks/useProductComplements";

const ProductComparator = () => {
    const productContext = useProduct();
    const categoryIds = productContext?.product?.categoryTree?.map?.((item) => item.id);

    const { data, isLoading } = useConfigs();
    const { data: dataProduct, loading } = useProductComplements();

    if (isLoading || loading) {
        return (
            <>
                Loading
            </>
        )
    }

    console.log('data', dataProduct, loading);
    console.log('categoryId ', categoryIds);
    console.log('data ProductComparator', data);
    console.log('productContext', productContext);

    const hasMatchingCategory = categoryIds?.some(id => data.some(item => item?.category?.id.toString() === id.toString() && item?.active == true));

    console.log('hasMatchingCategory', hasMatchingCategory);

    if (!hasMatchingCategory || !dataProduct) return null;

    return (
        <div className={style.container}>
            ProductComparator
        </div>
    )
}

export default ProductComparator;