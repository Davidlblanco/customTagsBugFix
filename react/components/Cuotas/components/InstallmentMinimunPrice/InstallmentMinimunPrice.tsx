import React from "react";
import { InstallmentResult } from "../../Logic/PaymentCustomValidators";
import { FormattedCurrency } from "vtex.format-currency";
import styles from "./styles.css";

export default function InstallmentMinimunPrice({ installment }: Props) {
    const rule = installment.rulesResults.find(
        (rule) => rule.valid && rule.type === "minimum_price"
    );
    if (!rule) return <></>;

    const minimumPrice = rule.ruleValue[0] as number;

    return minimumPrice > 0 ? (
        <span className={styles["minimum-price"]}>
            *Compra mínima <FormattedCurrency value={minimumPrice / 100} />
        </span>
    ) : (
        <></>
    );
}

interface Props {
    installment: InstallmentResult;
}
