import React from "react"

import Title from "../Title/Title";

import { Product } from "vtex.product-context/react/ProductTypes";

import Specification from "./Specification/Specification";

import styles from './styles.css';

interface ProductComparatorSpecificationsProps {
    readonly products: Product[];
    titleSpecifications: string;
}

const ProductComparatorSpecifications = ({
    products,
    titleSpecifications
}: ProductComparatorSpecificationsProps) => {

    const properties = products?.map((product) => product?.properties);

    return (
        <div className={styles["wrap-specification"]}>
            <div className={styles["title-specification"]}>
                <Title title={titleSpecifications} />
            </div>
            <Specification
                items={properties}
            />
        </div>
    )
}

export default ProductComparatorSpecifications