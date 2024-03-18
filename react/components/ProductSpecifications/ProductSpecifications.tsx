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

    if (!allSpecifications) return <></>;

    return (
        <div className={styles.ComponentContainer}>
            <span className={styles.Title}>Especificaciones</span>
            <ul>
                {allSpecifications?.specifications.map(
                    (specification, index) => (
                        <li
                            className={`${styles.SpecificationElement} ${
                                index < 4 || showAll ? styles.show : ""
                            }`}
                            key={specification.name}
                        >
                            {specification.name}: {specification.values[0]}
                        </li>
                    )
                )}
            </ul>
            {allSpecifications?.specifications?.length > 4 && (
                <button
                    className={styles.ShowMore}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
};

export { ProductSpecifications };
