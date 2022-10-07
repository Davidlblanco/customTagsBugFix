import React from "react";
import { usePageContext } from "../Context/PageContext";
import { OrderStatus } from "./Components/OrderStatus/OrderStatus";
import { Spinner } from 'vtex.styleguide'
import styles from "./StatusPage.css";

const StatusPage = () => {
    const { mockOrderData, order, vtexOrderData, loading } = usePageContext();

    console.log(mockOrderData, "siman")
    console.log(vtexOrderData, "vtex") 

    if(loading){
      return(
        <div className={styles.ContainerLoading}>
          <Spinner />
        </div>
      )
    }

    if(vtexOrderData?.hasOwnProperty("error") || !mockOrderData?.body?.canal_digital || mockOrderData?.code === 500){
      return(
        <div className={styles.ContainerError}>
          <h1>Pedido no encontrado</h1>
        </div>
      )
    }

    const OrderInformation = mockOrderData?.body?.detalle
    const isMoreThen1Seller = mockOrderData?.body?.detalle?.length > 1

    if(isMoreThen1Seller){
      return(
        <div>
          <h1 className={`${styles.orderText} ${styles.orderTextMoreSellers}`}>Pedido #{order}</h1>
          {OrderInformation.map((orderInfo: any) =>{
            return(
              <div className={styles.newDespacho}>
                {/* <p className={`${styles.despachoText} ${styles.despachoTextMoreSellers}`}>Despacho #{orderInfo?.despacho}</p> */}
                <OrderStatus OrderInformation={orderInfo}/>
              </div>
            )         
          })}
        </div>
      )
    }

    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.orderText}>Pedido #{order}</h1>
                {/* <p className={styles.despachoText}>Despacho #{DespachoId}</p> */}
            </div>
                <OrderStatus OrderInformation={OrderInformation[0]}/>
        </div>
    );
};

export { StatusPage };
