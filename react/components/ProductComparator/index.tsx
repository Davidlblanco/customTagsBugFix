import React, { FC } from "react";

import { useProduct } from "vtex.product-context";
import { Product } from "vtex.product-context/react/ProductTypes";

import ProductComparatorList from "./components/ProductComparatorList/ProductComparatorList";
import ProductComparatorSpecifications from "./components/ProductComparatorSpecifications/ProductComparatorSpecifications";

import { useConfigs } from "./hooks/useConfigs";
import { useProductComplements } from "./hooks/useProductComplements";

import { hasMatchingCategory } from "./utils/hasMatchingCategory";

import styles from "./styles.css";

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
    const product = productContext?.product;

    const { data } = useConfigs();
    const { data: productValues } = useProductComplements();

    const isCategory = hasMatchingCategory(data, product as Product);

    if (!isCategory || productValues.length === 0) return null;

    return (
        <div className={styles["container-product-comparator"]}>
            <ProductComparatorList
                products={productValues}
                titleProductSeen={titleProductSeen}
                titleSimilarProducts={titleSimilarProducts}
            >
                {children}
            </ProductComparatorList>
            <ProductComparatorSpecifications
                products={productValues}
                titleSpecifications={titleSpecification}
            />
        </div>
    );
};

export default ProductComparator;
