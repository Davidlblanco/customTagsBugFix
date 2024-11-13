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
    const ingredients_list = ingredients?.values[0] || "";

    if (ingredients_list.length <= 0 || !categories.includes('/Belleza e higiene/')) return <></>;

    return (
        <div className={styles.componentContainerIngredients}>
            <span className={styles.titleIngredients}>Ingredientes</span> <br />
            <span className={styles.specificationValueIngredients}>
                {ingredients_list}
            </span>
            {ingredients_list?.length > 100 && (
                <button
                    className={styles.showMoreIngredients}
                    onClick={() => setShowAll(!showAll)}
                >Ver más</button>
            )}
            {showAll && (
                <div className={styles.modalIngredients}>
                    <div className={styles.modalContentIngredients}>
                        <button className={styles.closeIngredients} onClick={() => setShowAll(!showAll)}>x</button>
                        <p className={styles.titleModalIngredients}>Ingredientes</p> <br />
                        <div className={styles.ingredientsList}>
                            <span className={styles.specificationValueFullIngredients}>
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
