import React from "react";
import { handleCredisimanInstallments } from "./utils/handleCredisimanInstallments";

import style from './styles.modules.css';

export function CredisimanCuotas() {
  const { credisiman } = handleCredisimanInstallments();

  const canRender =
  credisiman?.installment && credisiman.installment > 1;

  if (!canRender) return <></>

  return (
    <div className={style.credisimanContainer}>
      <span className={style.installments}>{credisiman?.installment} Cuotas</span>
      <img 
        src="/arquivos/credisiman-tag-pdp.png" 
        alt="tarjeta de crédito siman en color azul" 
        width={24} 
        height={30} 
        loading="lazy" 
      />
    </div>
  )
}