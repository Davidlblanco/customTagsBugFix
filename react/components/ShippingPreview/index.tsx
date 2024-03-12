import React from "react";
import { ShippingContainer } from "./Components/shippingContainer";
import {
    useGetShippingEstimative,
    GetUserPostalCode,
    useGetBestPickupPoint,
} from "./Logic/ShippingPreviewLogic";
import { ExpressIcon } from "./Assets/24hrs";
import styles from "./shippingPreview.css";

const ShippingPreview = () => {
    const userPostalCode = GetUserPostalCode();
    const { estimative } = useGetShippingEstimative(userPostalCode);
    const { bestPickupPoint } = useGetBestPickupPoint();

    console.log(estimative, "user address");
    console.log(bestPickupPoint, "pickup");

    return (
        <div className={styles.ShippingPreviewContainer}>
            <div>
                <span>Métodos de entrega disponibles</span>
            </div>
            <ShippingContainer icon={<ExpressIcon />} />
        </div>
    );
};

export { ShippingPreview };
