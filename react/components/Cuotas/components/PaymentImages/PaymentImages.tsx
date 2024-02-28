import React from "react";
import styles from "./styles.css";

export default function PaymentImages({ paymentsImages }: Props) {
   return (
      <div className={styles.OtherPaymentsImages}>
         {paymentsImages?.map((item) => {
            return <img className={styles.OtherPaymentsImage} src={item.image} key={item.image} alt="Payment" />;
         })}
      </div>
   );
}

interface Props {
   paymentsImages: PaymentsImages[];
}

export type PaymentsImages = {
   image: string;
};
