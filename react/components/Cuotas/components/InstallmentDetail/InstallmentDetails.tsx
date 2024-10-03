import React from "react";
import styles from "./styles.css";
import { TagsStyles } from "../../Types/PaymentCustom";

interface InstallmentDetailsProps {
  installment?: number;
  tag: {
    styles: TagsStyles;
    tagIsActive?: boolean;
    quantityImgs: number;
  }
  visibility: 'pdp' | 'product-summary';
}

export default function InstallmentDetails({
  installment,
  tag,
  visibility
}: InstallmentDetailsProps) {
  const textCuota = installment && installment > 1 ? 'cuotas' : 'cuota';
  return (
    <span
      className={`${visibility == "pdp" ? styles.tagPreviewInstallmentsPdp : styles.tagPreviewInstallmentsSummary}`}
      style={{
        zIndex: tag.quantityImgs ? tag.quantityImgs * 10 + 2 : 0,
        ...tag.styles,
      }}
    >
      {visibility === "pdp" && installment && (
        <>Obtén hasta cuotas de</>
      )}
      {visibility === "product-summary" && installment && (
        <>Hasta {installment} {textCuota}</>
      )}
    </span>
  );
}