import React from "react";

import styles from "./styles.css";

interface InstallmentDetailDrawerProps {
  installment?: number;
  firstText: string;
  secundText: string;
}

const InstallmentDetailDrawer = ({
  installment,
  firstText,
  secundText
}: InstallmentDetailDrawerProps) => {
  const text = `${firstText} ${installment} ${secundText}`;
  return (
    <span
      className={`${styles.textInstallmentDetailDrawer}`}
    >
      {text}
    </span>
  );
}

export default InstallmentDetailDrawer;