import React from "react";

import { useProduct } from "vtex.product-context";

import { reorganizeProperties } from "../../../utils/reorganizeProperties";
import { filterItems } from "../../../utils/filterItems";

import SpecificationValues from "./SpecificationValues/SpecificationValues";

import { Item } from '../../../types/ProductComparator';

import styles from './styles.css';

interface SpecificationProps {
    items: Item[][];
}

const Specification = ({
    items
}: SpecificationProps) => {

    const productContext = useProduct();

    const propertiesProductSeen = productContext?.product?.properties;

    const filteredItems = filterItems(propertiesProductSeen as Item[], items);
    const propertiesTeste = reorganizeProperties(filteredItems);

    return (
        <>
            {items && items?.length > 0 && (
                <div className={styles["container-specification"]}>
                    <ul className={styles["wrap-list"]}>
                        {Object.entries(propertiesTeste)?.map(([name, values]: [string, { [key: string]: string }[]], index) => (
                            <li className={styles["list-item"]} key={name}>
                                <div className={styles["item-name"]}>
                                    <span>{name}</span>
                                    <span>{propertiesProductSeen && propertiesProductSeen[index]?.values[0]}</span>
                                </div>
                                <SpecificationValues
                                    values={values}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Specification;