import React from "react";
import { usePageContext } from "../../../Context/PageContext";
import useFormattedPrice from "../../../../../utils/FormattedPrice";
import styles from "./OrderTotal.css";

const OrderTotal = ({ productTotal, currencySymbol }: any) => {
  const { order } = usePageContext();

  if(!productTotal) return <></>

  const FormatPrice = (value: number) =>{
    return useFormattedPrice(value, currencySymbol);
  }

  const productsTotalPrice = productTotal.reduce(
    (acc: number, object: any) => acc + object?.price,
    0
  );

  const productsTotalPriceWithoutDiscount = productTotal.reduce(
    (acc: number, object: any) => acc + object?.listPrice,
    0
  );

  const totalQuantity = productTotal.reduce(
    (acc: number, object: any) => acc + object?.quantity,
    0
  );

  const discount = productsTotalPriceWithoutDiscount - productsTotalPrice;

  return (
    <div className={styles.containerOrderTotal}>
      <div className={styles.productTextTotal}>
        <span className={styles.productTextTotalTotal}>Total</span>
        <span className={styles.productTextTotalID}>ID de compra #{order}</span>
      </div>
      <div className={styles.productNumberTotal}>
        {discount > 0 && (
          <span className={styles.productNumberDiscount}>Ahorras {FormatPrice(discount)}</span>
        )}
        <span className={styles.productNumberPrice}>{FormatPrice(productsTotalPrice)}</span>
        <span className={styles.productCant}>Cant: {totalQuantity}</span>
      </div>
    </div>
  );
};

export { OrderTotal };
