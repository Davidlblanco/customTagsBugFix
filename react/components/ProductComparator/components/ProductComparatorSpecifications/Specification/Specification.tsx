import React from "react";

import { useProduct } from "vtex.product-context";

import SpecificationValues from "./SpecificationValues/SpecificationValues";
import { Item } from '../../../types/ProductComparator';

import { reorganizeProperties } from "../../../utils/reorganizeProperties";
import { filterItems } from "../../../utils/filterItems";

import styles from './styles.css';

interface SpecificationProps {
    items: Item[][];
}

const Specification = ({ items }: SpecificationProps) => {
    const productContext = useProduct();
    const propertiesProductSeen = productContext?.product?.properties;
    const hasItems = items && items.length > 0;

    if (!hasItems || !propertiesProductSeen) {
        return null;
    }

    const filteredItems = filterItems(propertiesProductSeen, items);
    const propertiesValues = reorganizeProperties(filteredItems);

    return (
        <div className={styles["container-specification"]}>
            <ul className={styles["wrap-list"]}>
                {Object.entries(propertiesValues)?.map(([name, values]) => {
                    const propertySeen = propertiesProductSeen.find(item => item.name === name);
                    return (
                        <li className={styles["list-item"]} key={name}>
                            <div className={styles["item-name"]}>
                                <span>{name}</span>
                                {propertySeen && <span>{propertySeen.values[0]}</span>}
                            </div>
                            <SpecificationValues values={values} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Specification;
