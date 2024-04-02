import React from "react";
import useProductPayments from "../Cuotas/hooks/useProductPayments";

import style from './styles.modules.css';

export function CredisimanCuotas() {
  console.log('renderizou')

  const { isLoading, bestInstallment } = useProductPayments({
    paymentIds: ["401","403"], // This filter is optional
  });

  if (isLoading) {
    return (
      <div className="">
        Carregando...
      </div>
    );
  }

  const canRender =
      bestInstallment?.installment && bestInstallment.installment > 1;

    console.log({
      bestInstallment,
      isLoading,
      canRender,
    })

  if (!canRender) {
      return <></>;
  }

  return (
    <div className={style.credisimanContainer}>
      <span className={style.installments}>{bestInstallment?.installment} Cuotas</span>
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