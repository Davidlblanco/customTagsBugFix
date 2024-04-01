import React from "react";
import { useProduct } from "vtex.product-context";
import styles from "./SellerNameShelf.css";


const SellerNameShelf = () => {
  const productContextValue = useProduct();
  const sellerNameValue = productContextValue?.selectedItem?.sellers[0]?.sellerName;
  const sellerIdValue = productContextValue?.selectedItem?.sellers[0]?.sellerId;

  const moveToPage = () => {
    location.href = `/${sellerIdValue}?map=seller`;
  };



  if (sellerNameValue) {
    if (sellerNameValue == "Tienda Siman" || sellerNameValue == '1') {
      return <div className={styles.containerSallername}>
      <button className={styles.nameShelf} onClick={moveToPage}> Vendido por: <span className={styles["sellerName"]}> Síman </span></button>
    </div>
    } else {
      return <div className={styles.containerSallername}>
        <button className={styles.nameShelf} onClick={moveToPage}> Vendido por: <span className={styles["sellerName"]}> {sellerNameValue} </span></button>
      </div>
    }
  }
  return <></>
}

export { SellerNameShelf };