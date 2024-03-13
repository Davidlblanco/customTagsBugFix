import React, { FC } from "react";

import { useProduct } from "vtex.product-context";

import ProductComparatorList from "./components/ProductComparatorList/ProductComparatorList";

import { useConfigs } from "./hooks/useConfigs";
import { useProductComplements } from "./hooks/useProductComplements";

import style from './styles.css';

const ProductComparator: FC = ({ children }) => {
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

    if (!hasMatchingCategory || !dataProduct) return null;
    return (
        <div className={style.container}>
            <ProductComparatorList
                products={dataProduct}
            >
                {children}
            </ProductComparatorList>
        </div>
    )
}

export default ProductComparator;