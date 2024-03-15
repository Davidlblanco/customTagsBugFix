import React, { FC } from "react"

import Title from "../../../Title/Title";

import styles from "./styles.css";

interface ProductSeenProps {
    titleProductSeen: string;
}

const ProductSeen: FC<ProductSeenProps> = ({
    children,
    titleProductSeen
}) => {
    return (
        <div className={styles["product-comparator-seen"]}>
            <Title
                title={titleProductSeen}
            />
            {children}
        </div>
    )
}

export default ProductSeen;