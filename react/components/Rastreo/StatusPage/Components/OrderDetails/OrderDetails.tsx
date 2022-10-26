import React from "react";
import { Accordion } from "../Accordion/Accordion";
import { usePageContext } from "../../../Context/PageContext";
import styles from "./OrderDetails.css";

const OrderDetails = ({ details }: any) => {
    const { vtexOrderData } = usePageContext();
    const shippingData = vtexOrderData?.shippingData
    const logisticsInfo = shippingData?.logisticsInfo[0]
    const selectedAddresses = shippingData?.selectedAddresses[0]
    const status = details[details.length - 1]?.estado;
    const fecha = details[details?.length - 1]?.fecha;

    const OrderStatusDate = new Date(fecha).toLocaleDateString("es-CO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",    
    });

    const OrderShippingEstimateDate = new Date(logisticsInfo?.shippingEstimateDate).toLocaleDateString("es-CO",{
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit"
    })


    return (
        <div className={styles.containerOrderDetails}>
            <p className={styles.orderDetailSmallTitle}>
                Detalles de la entrega
            </p>
            <p className={styles.orderDetailSmall}>Tu orden llegará el</p>
            <h2 className={styles.orderDetailRelise}>
                {OrderShippingEstimateDate}
            </h2>
            <p className={styles.orderDetailSmall}>Dirección</p>
            <p className={styles.orderDireccion}>
              {selectedAddresses?.street} {selectedAddresses?.number}, {selectedAddresses?.city}
            </p>

            <div className={styles.OrderDetailStatus}>
                <span className={styles.OrderDetailDate}>{OrderStatusDate}</span>
                <span className={styles.orderDetailStatusText}>{status}</span>
            </div>

            <Accordion accordionTitle="Detalles de rastreo">
                {details.map((detail: any) => {
                  const detailDate = new Date(detail?.fecha)
                  const hours = detailDate.getHours()
                  const minutes = detailDate.getMinutes();
                  const seconds = detailDate.getSeconds();
                  const currentDetailDate = detailDate.toLocaleDateString("es-CO")
                  return(
                    <div className={styles.accordionDetails}>
                      <p>{currentDetailDate}</p>
                      <p>{hours < 10 ? `0${hours}` : hours}&gt;{minutes < 10 ? `0${minutes}` : minutes}&gt;{seconds < 10 ? `0${seconds}` : seconds}</p>
                      <p>{detail?.estado}</p>
                    </div>
                  )
                })}
            </Accordion>
        </div>
    );
};

export { OrderDetails };
