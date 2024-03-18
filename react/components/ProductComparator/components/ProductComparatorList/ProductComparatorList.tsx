import React, { FC } from "react";

import ProductComparatorItem from "./components/ProductComparatorItem/ProductComparatorItem";

import { Product } from "vtex.product-context/react/ProductTypes";

import Title from "../Title/Title";
import ProductSeen from "./components/ProductSeen/ProductSeen";

import styles from "./styles.css";

interface ProductComparatorListProps {
  readonly products: Product[];
  titleProductSeen: string;
  titleSimilarProducts: string;
}

const ProductComparatorList: FC<ProductComparatorListProps> = ({
  products,
  titleProductSeen,
  titleSimilarProducts,
  children
}) => {
  return (
    <div className={styles["container-product-comparator-list"]}>
      <ProductSeen
        titleProductSeen={titleProductSeen}
      >
        {children}
      </ProductSeen>
      <div className={styles["wrap-diviser"]} />
      <div className={styles["wrap-product-comparator-list"]}>
        <Title
          title={titleSimilarProducts}
        />
        <div className={styles["product-comparator-list"]}>
          {products?.map((product) => (
            <ProductComparatorItem
              key={product.productId}
              product={product}
            >
              {children}
            </ProductComparatorItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductComparatorList;

