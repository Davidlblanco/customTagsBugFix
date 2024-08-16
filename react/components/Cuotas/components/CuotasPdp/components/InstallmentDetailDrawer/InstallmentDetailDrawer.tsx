import React from "react";

//import styles from "./styles.css";

interface InstallmentDetailDrawerProps {
  installment?: number;
  firstText: string;
  secundText: string;
  className?: any
}

const InstallmentDetailDrawer = ({
  installment,
  firstText,
  secundText,
  className
}: InstallmentDetailDrawerProps) => {
  const text = `${firstText} ${installment} ${secundText}`;
  return (
    <span
      className={className}
    >
      {text}
    </span>
  );
}

export default InstallmentDetailDrawer;