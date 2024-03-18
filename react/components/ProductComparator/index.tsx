import React, { FC } from "react";

import { useProduct } from "vtex.product-context";

import ProductComparatorList from "./components/ProductComparatorList/ProductComparatorList";
import ProductComparatorSpecifications from "./components/ProductComparatorSpecifications/ProductComparatorSpecifications";

import { useConfigs } from "./hooks/useConfigs";
import { useProductComplements } from "./hooks/useProductComplements";

import { hasMatchingCategory } from "./utils/hasMatchingCategory";

import styles from './styles.css';


interface ProductComparatorProps {
    titleProductSeen: string;
    titleSimilarProducts: string;
    titleSpecification: string;
}

const ProductComparator: FC<ProductComparatorProps> = ({
    children,
    titleProductSeen,
    titleSimilarProducts,
    titleSpecification
}) => {

    const productContext = useProduct();
    const { data } = useConfigs();
    const { data: dataProduct } = useProductComplements();

    const isCategory = hasMatchingCategory(data, productContext);

    if (!isCategory || !dataProduct) return <></>;

    console.log("dataProduct", dataProduct.slice(0, 4));

    return (
        <div className={styles["container-product-comparator"]}>
            <ProductComparatorList
                products={dataProduct.slice(0, 4)}
                titleProductSeen={titleProductSeen}
                titleSimilarProducts={titleSimilarProducts}
            >
                {children}
            </ProductComparatorList>
            <ProductComparatorSpecifications
                products={dataProduct.slice(0, 4)}
                titleSpecifications={titleSpecification}
            />
        </div>
    )
}

export default ProductComparator;