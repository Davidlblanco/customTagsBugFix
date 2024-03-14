import React from "react";
import { ShippingContainer } from "./Components/shippingContainer";
import {
    useGetShippingEstimative,
    GetUserPostalCode,
    useGetBestPickupPoint,
} from "./Logic/ShippingPreviewLogic";
import { DeliveryIcon } from "./Assets/delivery-moving";
import { PickUpIcon } from "./Assets/carbon_store";
import { ExpressIcon } from "./Assets/24hrs";
import styles from "./shippingPreview.css";
import { ShippingType } from "./Types/types";

const ShippingPreview = () => {
    const userPostalCode = GetUserPostalCode();
    const { delivery, expressDelivery, scheduledDelivery } =
        useGetShippingEstimative(userPostalCode);
    const { bestPickupPoint } = useGetBestPickupPoint();

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
        <div className={styles.ShippingPreviewContainer}>
            <div>
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
    );
};

export { ShippingPreview };
