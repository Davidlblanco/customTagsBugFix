import React from "react";
import { ShippingContainerProps } from "../Types/types";
import styles from "./shippingContainer.css";

const ShippingContainer = ({ icon }: ShippingContainerProps) => {
    return (
        <div className={styles.shippingContainer}>
            <div>
                {icon}
                <span>test</span>
            </div>
            <div>
                <span>test2</span>
            </div>
        </div>
    );
};
export { ShippingContainer };
