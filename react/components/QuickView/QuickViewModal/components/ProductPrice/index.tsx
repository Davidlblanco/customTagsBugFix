import React from "react";
import styles from "./styles.css";
import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import type { ProductTypes } from "vtex.product-context";

export function QuickViewProductPrice() {
    const product = useProduct();
    const seller = getDefaultSeller(product?.selectedItem?.sellers);
    const offer = seller?.commertialOffer;
    const listPrice = offer?.ListPrice ?? 0;
    const sellingPrice = offer?.Price ?? 0;

    const porcentage = ((listPrice - sellingPrice) / listPrice) * 100;

    function getDefaultSeller(sellers?: ProductTypes.Seller[]) {
        if (!sellers) {
            return undefined;
        }

        const defaultSeller = sellers.find((seller) => seller.sellerDefault);

        if (defaultSeller) {
            return defaultSeller;
        }

        return sellers[0];
    }

    return (
        <div className={styles["quickview-product-price"]}>
            <span className={styles["quickview-product-price__selling-price"]}>
                <FormattedCurrency value={sellingPrice} />
                {porcentage > 0 && (
                    <span className={styles["quickview-product-price__porcentage"]}>-{porcentage.toFixed(0)}%</span>
                )}
            </span>

            {listPrice !== sellingPrice && (
                <span className={styles["quickview-product-price__list-price"]}>
                    <FormattedCurrency value={listPrice} />
                </span>
            )}
        </div>
    );
}
