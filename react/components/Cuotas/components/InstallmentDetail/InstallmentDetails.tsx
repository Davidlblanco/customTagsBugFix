import React from "react";
import styles from "./styles.css";
import { TagsStyles } from "../../Types/PaymentCustom";

interface InstallmentDetailsProps {
  installment?: number;
  tag: {
    styles: TagsStyles;
    quantityImgs?: number;
  }
}

export default function InstallmentDetails({ installment, tag }: InstallmentDetailsProps) {
    return (
      <span
        className={styles['tag-preview-installments']}
        style={{
          zIndex: tag.quantityImgs ? tag.quantityImgs * 10 + 2 : 0,
          ...tag.styles,
        }}
      >
        {installment} cuotas con
      </span>
    );
}
