import React, { FC } from "react";

import ProductComparatorItem from "./components/ProductComparatorItem/ProductComparatorItem";

import { Product } from "vtex.product-context/react/ProductTypes";

import styles from "./styles.css";
import ProductSeen from "./components/ProductSeen/ProductSeen";

interface ProductComparatorListProps {
  readonly products: Product[];
}

const ProductComparatorList: FC<ProductComparatorListProps> = ({
  products,
  children
}) => {
  return (
    <div className={styles["purchase-complement-list"]}>
      <ProductSeen>
        {children}
      </ProductSeen>
      <div>
        <span>Productos similares</span>
        <div className={styles["purchase-complement-list"]}>
          {products.map((prod) => (
            <ProductComparatorItem
              key={prod.productId}
              product={prod}
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

