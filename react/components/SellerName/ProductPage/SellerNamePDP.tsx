import React from "react";
import { useProduct } from "vtex.product-context";
import styles from "./SellerName.css";
import icon from "../assets/entrega-rapida.png"

const SellerNamePDP = () => {
  const productContextValue = useProduct();
  const sellerNameValue = productContextValue?.selectedItem?.sellers[0]?.sellerName;
  const sellerIdValue = productContextValue?.selectedItem?.sellers[0]?.sellerId;
  if (sellerNameValue) {
    if (sellerNameValue == "Tienda Siman" || sellerNameValue == '1') {
      return <div className={styles.containerSellerName}>
      <img src={icon} alt="" className={styles.sellerLogo} />
      <p className={styles.sellerText}>Vendido y entregado por: </p>
      <a href={`/${sellerIdValue}?map=seller`} className={styles.sellerName}>  Siman </a>
    </div>
    } else {
      return <>
        <div className={styles.containerSellerName}>
          <img src={icon} alt="" className={styles.sellerLogo} />
          <p className={styles.sellerText}>Vendido y entregado por: </p>
          {
            sellerIdValue  != "1" 
            ? <a href={`/${sellerIdValue}?map=seller`} > {sellerNameValue}</a>
            : <span className={styles.sellerName}> {sellerNameValue}</span>
          }
          
        </div>
      </>
    }
  }
  return <></>
}

export { SellerNamePDP };