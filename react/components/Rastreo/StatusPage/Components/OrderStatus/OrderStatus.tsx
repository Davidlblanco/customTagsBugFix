import React from "react";
import { renderCurrentStatus } from "./OrderStatusLogic";
import { OrderProducts } from "../OrderProducts/OrderProducts";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { useDevice } from "vtex.device-detector";
import styles from "./OrderStatus.css";

export type CurrentStateText = "ToDo" | "Doing" | "Done";
export type ArrowState = "Active" | "Disabled";

const OrderStatus = ({ OrderInformation }: any) => {
    const orderState = OrderInformation?.estados[OrderInformation?.estados?.length - 1]?.posicion;
    const orderDetails = OrderInformation?.estados
    const { isMobile } = useDevice();
    
    const renderText = (
        upperText: string,
        lowerText: string,
        state: CurrentStateText
    ) => {
        let upperTextClassName = `${styles.informationUpperText}`;
        let lowerTextClassName = `${styles.informationLowerText}`;

    let icon = 'arquivos/check-icon-b.png';
    let iconClass = `${styles.informationIcon}`;

    if (state === "Doing") {
      upperTextClassName = upperTextClassName + "Doing";
      lowerTextClassName = lowerTextClassName + "Doing";
      icon = 'arquivos/checkloading-icon-b.png';
      iconClass = iconClass + 'Rotate';
    } else if (state === "ToDo") {
      upperTextClassName = upperTextClassName + "ToDo";
      lowerTextClassName = lowerTextClassName + "ToDo";
      icon = 'arquivos/circle-icon-b.png';
    }

    if (isMobile) {
      return (
        <div className={styles.containerInformation}>
          <div>
           <img className={iconClass} src={icon} alt="" />
          </div>
          <div className={styles.containerStatusTextMobile}>
            <span className={upperTextClassName}>{upperText}</span>
            <span className={lowerTextClassName}>{lowerText}</span>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.containerInformation}>
        <img className={iconClass} src={icon} alt="" />
        <span className={upperTextClassName}>{upperText}</span>
        <span className={lowerTextClassName}>{lowerText}</span>
      </div>
    );
  };

  const renderArrow = (arrowState: ArrowState) => {
    let arrowTrailClassName = `${styles.arrowTrail}`;
    let arrowRightClassName = `${styles.arrowRight}`;

    if (arrowState === "Disabled") {
      arrowTrailClassName = arrowTrailClassName + "Disabled";
      arrowRightClassName = arrowRightClassName + "Disabled";
    }

    return (
      <div className={styles.containerArrow}>
        <div className={arrowTrailClassName}></div>
        <div className={arrowRightClassName}></div>
      </div>
    );
  };

  return (
    <div className={styles.containerStatus}>
      {renderCurrentStatus(orderState, renderArrow, renderText)}
      <div className={styles.middleStatus}>
        <OrderProducts />
        <OrderDetails details={orderDetails}/>
      </div>
    </div>
    );
};

export { OrderStatus };
