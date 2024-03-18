import React, { FC, useEffect, useState } from "react";

import { useProduct } from "vtex.product-context";
import { Product } from "vtex.product-context/react/ProductTypes";

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
    const product = productContext?.product;

    const categoryIds = productContext?.product?.categoryTree?.map((item) => item.id)?.join(",") as string[] | undefined;
    const categoryId = productContext?.product?.categoryId as string;
    console.log("categoryIds", categoryIds)

    const { data } = useConfigs();

    const [productValues, setProductValues] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = () => {
            if (categoryId) {
                const { data } = useProductComplements([categoryId]);
                if (data) {
                    setProductValues(data);
                } else {
                    if (categoryIds) {
                        const { data } = useProductComplements(categoryIds);
                        setProductValues(data);
                    }
                }
            }
        };

        fetchData();
    }, [categoryId, categoryIds]);

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
    )
}

export default ProductComparator;
