import React from "react";
import { CurrentStateText, ArrowState } from "./OrderStatus";
import styles from "./OrderStatus.css";

export const renderCurrentStatus = (
    orderState: number,
    renderArrow: (arg0: ArrowState) => void,
    renderText: (arg0: string, arg1: string, arg2: CurrentStateText) => void
) => {
    switch (orderState) {
        case 1:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pago", "Aprobado", "Doing")}
                    {renderArrow("Disabled")}
                    {renderText("Pedido", "Preparado", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Enviando", "Pedido", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Entregar", "Pedido", "ToDo")}
                </div>
            );
        case 2:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pago", "Aprobado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pedido", "Preparado", "Doing")}
                    {renderArrow("Disabled")}
                    {renderText("Enviando", "Pedido", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Entregar", "Pedido", "ToDo")}
                </div>
            );

        case 3:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pago", "Aprobado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Preparando", "Pedido", "Doing")}
                    {renderArrow("Active")}
                    {renderText("Enviando", "Pedido", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Entregar", "Pedido", "ToDo")}
                </div>
            );

        case 4:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pago", "Aprobado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pedido", "Preparado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Enviando", "Pedido", "Doing")}
                    {renderArrow("Active")}
                    {renderText("Entregar", "Pedido", "ToDo")}
                </div>
            );

        case 5:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pago", "Aprobado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pedido", "Preparado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Enviando", "Pedido", "Done")}
                    {renderArrow("Active")}
                    {renderText("En ruta", "Para entrega", "Doing")}
                </div>
            );

        case 6:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pago", "Aprobado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pedido", "Preparado", "Done")}
                    {renderArrow("Active")}
                    {renderText("Enviando", "Pedido", "Done")}
                    {renderArrow("Active")}
                    {renderText("Pedido", "Entregado", "Done")}
                </div>
            );

        default:
            return (
                <div className={styles.containerCurrentStatus}>
                    {renderText("Pedido", "Confirmado", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Pago", "Aprobado", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Pedido", "Preparado", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Enviando", "Pedido", "ToDo")}
                    {renderArrow("Disabled")}
                    {renderText("Entregar", "Pedido", "ToDo")}
                </div>
            );
    }
};
