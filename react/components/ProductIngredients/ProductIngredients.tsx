import React, { useState } from "react";
import { useProduct } from "vtex.product-context";
import styles from "./ProductIngredients.css";

const ProductIngredients = () => {
    const productContext = useProduct();
    const [showAll, setShowAll] = useState(false);
    const productsSpecifications = productContext?.product?.specificationGroups;
    const categories = productContext?.product?.categories || [];
    const allSpecifications = productsSpecifications?.find(
        (specification) => specification.originalName === "allSpecifications"
    );

    const ingredients = allSpecifications?.specifications.find(
        (specification) => specification.name === "Ingredientes"
    );
    const ingredients_list = "• " + ingredients?.values[0].replace(/,/g, " • ").split(", ") || "";

    if (ingredients_list.length <= 0 || !categories.includes('/Belleza e higiene/')) return <></>;

    return (
        <div className={styles.componentContainer}>
            <span className={styles.title}>Ingredientes</span> <br />
            <span className={styles.specificationValue}>
                {ingredients_list}
            </span>
            {ingredients_list?.length > 100 && (
                <button
                    className={styles.showMore}
                    onClick={() => setShowAll(!showAll)}
                >Ver más</button>
            )}
            {showAll && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.close} onClick={() => setShowAll(!showAll)}>x</button>
                        <p className={styles.titleModal}>Ingredientes</p> <br />
                        <div className={styles.ingredientsList}>
                            <span className={styles.specificationValueFull}>
                                {ingredients_list}  
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { ProductIngredients };
