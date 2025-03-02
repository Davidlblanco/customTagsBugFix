import React from "react";
import styles from "./styles.css"
import { FormattedCurrency } from "vtex.format-currency";

interface QuickViewProductPriceProps {
  sellingPrice: number;
  listPrice: number;
}

export function QuickViewProductPrice({ sellingPrice, listPrice }: QuickViewProductPriceProps) {
  const porcentage = ((listPrice - sellingPrice) / listPrice) * 100;
  
  return (
    <div className={styles['quickview-product-price']}>
      <span className={styles['quickview-product-price__selling-price']}>
        <FormattedCurrency value={sellingPrice} />

        <span className={styles['quickview-product-price__porcentage']}>
          -{porcentage.toFixed(0)}%
        </span>
      </span>

      <span className={styles['quickview-product-price__list-price']}>
        <FormattedCurrency value={listPrice} />
      </span>
    </div>
  )
}
