import React, { FC } from "react";

import { ProductContextProvider } from "vtex.product-context";

import { getFirstAvailableSku } from "../../../../utils/getFirstAvailableSku";

import { Product } from "vtex.product-context/react/ProductTypes";

import styles from "./styles.css";

interface ProductComparatorItemProps {
  readonly product: Product;
}

const ProductComparatorItem: FC<ProductComparatorItemProps> = ({
  product,
  children
}) => {
  const selectedSkuId = getFirstAvailableSku(product)?.itemId;
  return (
    <>
      <ProductContextProvider
        product={product}
        query={{ skuId: selectedSkuId }}
      >
        <a
          className={styles["list-item--link"]}
          href={product?.link}
          target="_blank"
        >
          {children}
        </a>
      </ProductContextProvider>
    </>
  );
}


export default ProductComparatorItem;
