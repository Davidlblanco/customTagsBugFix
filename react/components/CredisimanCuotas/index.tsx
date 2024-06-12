import React from "react";
import { handleCredisimanInstallments } from "./utils/handleCredisimanInstallments";
import { useRuntime } from "vtex.render-runtime";
import CredisimanImage from "../../utils/CredisimanImage/CredisimanImage";

import style from "./styles.modules.css";

export function CredisimanCuotas() {
    const { account } = useRuntime();
    const { credisiman } = handleCredisimanInstallments(account);
    const countryAccount: string = account ?? "siman";

    const canRender = credisiman?.installment && credisiman.installment > 1;

    if (!canRender) return <></>;

    return (
        <div className={style.credisimanContainer}>
            <span className={style.installments}>
                {credisiman?.installment} Cuotas
            </span>
            <CredisimanImage countryAccount={countryAccount} />
        </div>
    );
}
