import React from "react";

import { toArray } from "../../../../utils/toArray";

import styles from "./styles.css";

interface SpecificationValuesProps {
    values: {
        [key: string]: string;
    }[];
}

const SpecificationValues = ({
    values
}: SpecificationValuesProps) => {
    return (
        <ul className={styles["wrap-value"]}>
            {values?.map((value, index) => {
                const valueArray = toArray(value);
                return (
                    <li key={index} className={styles["item-value"]}>
                        {valueArray?.map((value, index) => (
                            <span key={index} className={styles["value"]}>
                                {value}{index !== valueArray.length - 1 && ', '}
                            </span>
                        ))}
                    </li>
                )
            })}
        </ul>
    )
}

export default SpecificationValues;