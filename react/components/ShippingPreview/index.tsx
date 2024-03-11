import React from "react";
import { ShippingContainer } from "./Components/shippingContainer";
import {
    useGetShippingEstimative,
    GetUserPostalCode,
    useGetPickUpPoints,
} from "./Logic/ShippingPreviewLogic";
import { ExpressIcon } from "./Assets/24hrs";
import styles from "./shippingPreview.css";

const ShippingPreview = () => {
    const userPostalCode = GetUserPostalCode();
    const { estimative } = useGetShippingEstimative(userPostalCode);
    const { pickupPoints } = useGetPickUpPoints();

    console.log(estimative);
    console.log(pickupPoints);

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
