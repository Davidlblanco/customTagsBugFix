import React from "react";
import { handleCredisimanInstallments } from "./utils/handleCredisimanInstallments";
import { useRuntime } from "vtex.render-runtime";

import style from "./styles.modules.css";

export function CredisimanCuotas() {
    const { account } = useRuntime();

    const { credisiman } = handleCredisimanInstallments(account);

    const canRender = credisiman?.installment && credisiman.installment > 1;

    if (!canRender) return <></>;

    return (
        <div className={style.credisimanContainer}>
            <span className={style.installments}>
                {credisiman?.installment} Cuotas
            </span>
            <img
                src="https://simanqa.vtexassets.com/arquivos/credisiman-tag-pdp.png"
                alt="tarjeta de crédito siman en color azul"
                width={24}
                height={24}
                loading="lazy"
            />
        </div>
    );
}
