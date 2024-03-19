import React from "react";
import { ShippingContainer } from "./Components/shippingContainer";
import { GetUserPostalCode } from "./Logic/ShippingPreviewLogic";
import { DeliveryIcon } from "./Assets/delivery-moving";
import { PickUpIcon } from "./Assets/carbon_store";
import { ExpressIcon } from "./Assets/24hrs";
import { ShippingType } from "./Types/types";
import { useBestPickupPoint } from "./Hooks/useBestPickupPoint";
import { useShippingEstimative } from "./Hooks/useShippingEstimative";
import styles from "./shippingPreview.css";

const ShippingPreview = () => {
    const userPostalCode = GetUserPostalCode();
    const { delivery, expressDelivery, scheduledDelivery } =
        useShippingEstimative(userPostalCode);
    const { bestPickupPoint } = useBestPickupPoint();
    const shouldRender =
        Object.keys(bestPickupPoint || {}).length > 0 ||
        Object.keys(scheduledDelivery || {}).length > 0 ||
        Object.keys(expressDelivery || {}).length > 0 ||
        Object.keys(delivery || {}).length > 0;

    const shippingOptions = [
        {
            icon: <DeliveryIcon />,
            type: ShippingType["Envío a domicilio"],
            shippingData: delivery,
        },
        {
            icon: <ExpressIcon />,
            type: ShippingType["Entrega express"],
            shippingData: expressDelivery,
        },
        {
            icon: <DeliveryIcon />,
            type: ShippingType["Entrega programada"],
            shippingData: scheduledDelivery,
        },
        {
            icon: <PickUpIcon />,
            type: ShippingType["Retiro en Tienda"],
            shippingData: bestPickupPoint,
        },
    ];

    return (
        shouldRender && (
            <div className={styles.ShippingPreviewContainer}>
                <div className={styles.shippingPreviewTitle}>
                    <span>Métodos de entrega disponibles</span>
                </div>
                {shippingOptions.map((option) => (
                    <ShippingContainer
                        key={option.shippingData?.id}
                        icon={option.icon}
                        type={option.type}
                        shippingData={option.shippingData}
                    />
                ))}
            </div>
        )
    );
};

export { ShippingPreview };
