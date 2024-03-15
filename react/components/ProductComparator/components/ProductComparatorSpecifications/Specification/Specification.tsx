import React from "react";

import { reorganizeProperties } from "../../../utils/reorganizeProperties";

import SpecificationValues from "./SpecificationValues/SpecificationValues";

import { Item } from '../../../types/ProductComparator';

import styles from './styles.css';

interface SpecificationProps {
    items: Item[][];
}

const Specification = ({
    items
}: SpecificationProps) => {

    const properties = reorganizeProperties(items);

    return (
        <>
            {items && items?.length > 0 && (
                <div className={styles["container-specification"]}>
                    <ul className={styles["wrap-list"]}>
                        {Object.entries(properties)?.map(([name, values]: [string, { [key: string]: string }[]]) => (
                            <li className={styles["list-item"]} key={name}>
                                <span className={styles["item-name"]}>
                                    {name}
                                </span>
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