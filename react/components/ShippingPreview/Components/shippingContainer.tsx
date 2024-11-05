import React from "react";
import { SlasTranslator } from "../../../utils/slasTranslator";
import { FormattedCurrency } from "vtex.format-currency";
import {
    ShippingContainerProps,
    ShippingInfo,
    ShippingType,
} from "../Types/types";
import styles from "./shippingContainer.css";

const GetPriceText = (price?: number) => {
    if (price === 0) {
        return "Gratis";
    } else if (price) {
        return <FormattedCurrency value={price / 100} />;
    }
    return "";
};

const GetMessageByType = (
    shippingType: ShippingType,
    shippingData?: ShippingInfo
): JSX.Element => {
    const priceText = GetPriceText(shippingData?.price);
    const estimateText = SlasTranslator(shippingData?.shippingEstimate);
    const isFreeAndHavePrice = priceText !== "" && priceText === "Gratis";

    switch (shippingType) {
        case ShippingType["Entrega express"]:
            return <span>¡Recibe hoy! Desde {priceText}</span>;
        case ShippingType["Entrega programada"]:
        case ShippingType["Envío a domicilio"]:
            return (
                <span>
                    {isFreeAndHavePrice ? "" : "Desde"} {priceText} según zona
                    de envío, entrega en hasta {estimateText}
                </span>
            );
        case ShippingType["Retiro en Tienda"]:
            return (
                <div>
                    <span>
                        {priceText}, entrega en hasta {estimateText}
                    </span>
                    <p>
                        "Recuerda, tendrás <b>30 días</b> para recoger tu pedido; <b>caso contrario, se cancelará la compra y procederemos con el reembolso.</b>"
                    </p>
                </div>
            );
    }
};

const ShippingContainer = ({
    icon,
    type,
    shippingData,
}: ShippingContainerProps) => {
    if (
        !shippingData ||
        (shippingData && Object.keys(shippingData).length === 0)
    )
        return <></>;

    return (
        <div className={styles.shippingContainer}>
            <div className={styles.topShipping}>
                {icon}
                <span>{ShippingType[type]}</span>
            </div>
            <div className={styles.bottomShipping}>
                {GetMessageByType(type, shippingData)}
            </div>
        </div>
    );
};

export { ShippingContainer };
