import React, { useState } from "react";
import { useProduct } from "vtex.product-context";
import styles from "./ProductSpecifications.css";

const ProductSpecifications = () => {
    const productContext = useProduct();
    const [showAll, setShowAll] = useState(false);

    const productsSpecifications = productContext?.product?.specificationGroups;
    const allSpecifications = productsSpecifications?.find(
        (specification) => specification.originalName === "allSpecifications"
    );
    const categories = productContext?.product?.categories || [];

    if (!allSpecifications || categories.includes('/Belleza e higiene/')) return (<></>);

    return (
        <div className={styles.componentContainer}>
            <span className={styles.title}>Especificaciones</span>
            <ul className={styles.specificationList}>
                {allSpecifications?.specifications.map(
                    (specification, index) => (
                        <li
                            className={`${styles.specificationElement} ${
                                index < 4 || showAll ? styles.show : ""
                            }`}
                            key={specification.name}
                        >
                            {specification.name}:
                            <span className={styles.specificationValue}>
                                {specification.values[0]}
                            </span>
                        </li>
                    )
                )}
            </ul>
            {allSpecifications?.specifications?.length > 4 && (
                <button
                    className={styles.showMore}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
};

export { ProductSpecifications };
