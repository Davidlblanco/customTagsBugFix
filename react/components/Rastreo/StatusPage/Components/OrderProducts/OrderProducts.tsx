import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll'
import { useDevice } from "vtex.device-detector";
import { usePageContext } from "../../../Context/PageContext";
import { OrderTotal } from "../OrderTotal/OrderTotal";
import useFormattedPrice from "../../../../../utils/FormattedPrice";
import styles from "./OrderProducts.css";

const OrderProducts =  () => {
  const { vtexOrderData, isVtexOrder, mockOrderData } = usePageContext();
  const productsVtex = vtexOrderData?.items
  const currencySymbol = vtexOrderData?.storePreferencesData?.currencySymbol
  const products = mockOrderData?.detalle?.articulos
  const haveMoreThan1 = productsVtex?.length > 1;
  const { isMobile } = useDevice();

  const FormatPrice = (value: number) =>{
    return `${useFormattedPrice(value,currencySymbol)}`;
  }

  const renderProducts = (productToShow: any) => {
    return (
      productToShow?.map((product: any) => {
        return (
          <div className={styles.containerProduct}>
            <div className={styles.productImageContainer}>
              <img src={product?.imageUrl} />
            </div>
            <div className={styles.productInformationText}>
              <p>{product?.name}</p>
            </div>
            <div className={styles.productInformationNumber}>
              {product?.price === product?.listPrice ? (
                <p className={styles.newPrice}>{FormatPrice(product?.price)}</p>
              )
                :
                (
                  <>
                    <p className={styles.oldPrice}>{FormatPrice(product?.listPrice)}</p>
                    <p className={styles.newPrice}>{FormatPrice(product?.price)}</p>
                  </>
                )}
              <p className={styles.productInformationCant}>Cant: {product?.quantity}</p>
            </div>
          </div>
        )
      })
    )
  }

  if (isMobile) {
    return (
      <div className={styles.containerOrderProducts}>
        <p className={styles.OrderProductsTitle}>Listado de productos</p>

        <ScrollContainer className={`${styles.productsList} ${haveMoreThan1 ? styles.MoreThanOne : null}`} vertical={false} >
          {isVtexOrder ? renderProducts(productsVtex) : renderProducts(products)}
        </ScrollContainer>
        <OrderTotal productTotal={productsVtex} currencySymbol={currencySymbol}/>
      </div>
    )
  }

  return (
    <div className={styles.containerOrderProducts}>
      <p className={styles.OrderProductsTitle}>Listado de productos</p>

      <div className={styles.productsList} >
        {isVtexOrder ? renderProducts(productsVtex) : renderProducts(products)}
      </div>
      <OrderTotal productTotal={productsVtex} currencySymbol={currencySymbol} />
    </div>
  );
};

export { OrderProducts };
