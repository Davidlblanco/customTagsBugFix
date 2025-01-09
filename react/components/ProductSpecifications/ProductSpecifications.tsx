import React, { useState } from "react";
import { useProduct } from "vtex.product-context";
import styles from "./ProductSpecifications.css";

const ProductSpecifications = () => {
    const productContext = useProduct();
    const [showAll, setShowAll] = useState(false);

    let productsSpecifications = productContext?.product?.specificationGroups || [];
    const categories = productContext?.product?.categories || [];

    const allSpecifications = productsSpecifications?.find(
        (specification) => specification.originalName === "allSpecifications"
    );

    if (!allSpecifications) return <></>;

    return (
        <div className={styles.componentContainer}>
            <span className={styles.title}>Especificaciones</span>
            <ul className={styles.specificationList}>
                {allSpecifications?.specifications.map((specification, index) =>
                    // Hide ingredients if the category is 'Belleza e higiene'
                    categories.includes("/Belleza e higiene/") && specification.name === "Ingredientes" ? null : (
                        <li
                            className={`${styles.specificationElement} ${index < 4 || showAll ? styles.show : ""}`}
                            key={specification.name}
                        >
                            {specification.name}: {specification.values[0]}
                        </li>
                    )
                )}
            </ul>
            {allSpecifications?.specifications?.length > 4 && (
                <button className={styles.showMore} onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
};

export { ProductSpecifications };
