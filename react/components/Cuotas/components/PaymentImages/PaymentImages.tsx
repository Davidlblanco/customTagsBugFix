import React from "react";
import { GenericTagsApi, TagsStyles } from "../../Types/PaymentCustom";

import styles from "./styles.css";
import { getBestPayment } from "../../hooks/useProductPayments";
import { Results } from "../../Types/Results";

export default function PaymentImages({
  paymentsImages,
  tagStyles,
  availablePayments,
  isPdp,
  results
}: Props) {
  const resultsCredisiman = results?.filter((item) => item.paymentId === '403' || item.paymentId === '402') ?? [];
  const bestInstallmentCredisimanFalse = getBestPayment(resultsCredisiman, false)?.bestInstallment;
  const bestInstallmentCredisimanTrue = getBestPayment(resultsCredisiman, true)?.bestInstallment;

  const filteredCredisimanImages = paymentsImages?.filter((img) =>
    (img.paymentId === '402' && bestInstallmentCredisimanFalse) || (img.paymentId === '403' && bestInstallmentCredisimanTrue)
  );

  const checksIfPaymentIsValid = [
    ...filteredCredisimanImages ?? [],
    ...paymentsImages?.map(img => {
      const isValid = availablePayments.find((pay) =>
        pay.paymentId === img.paymentId &&
        pay.paymentId !== '403' && pay.paymentId !== '402'
      )?.isValid;
      return {
        ...img,
        isValid,
      }
    }).filter(img => img.isValid) ?? []
  ];

  if (!checksIfPaymentIsValid) return <></>

  return (
    <div
      className={styles['tag-preview-flag-container']}
      style={{
        width: `calc(18px * ${checksIfPaymentIsValid?.length})`,
      }}
    >
      {checksIfPaymentIsValid.slice(0, isPdp ? checksIfPaymentIsValid.length : 3).map((img, i) => {
        const left = i === 0 ? '-5px' : `${(20 * i) - (7 + i)}px`;

        return (
          <span
            key={img.id}
            className={styles['tag-preview-flag']}
            style={{
              zIndex: i === 0 ? checksIfPaymentIsValid?.length * 10 + 1 : Math.round(checksIfPaymentIsValid?.length * 10 / i),
              left,
              ...tagStyles,
            }}
          >
            <img
              src={img.value}
              alt={img.id}
              style={{
                objectFit: 'contain',
                maxWidth: '20px',
                width: '100%',
                maxHeight: '16px',
                height: '100%'
              }}
            />
          </span>
        )
      })}

      {checksIfPaymentIsValid.length > 3 && !isPdp && (
        <span
          className={`${styles['tag-preview-flag']} ${styles.more}`}
          style={{
            zIndex: Math.round(checksIfPaymentIsValid?.length * 10 / 3),
            left: `54px`,
            ...tagStyles,
          }}
        >
          +{checksIfPaymentIsValid.length - 3}
        </span>
      )}
    </div>
  );
}

interface Props {
  paymentsImages?: GenericTagsApi['tagsImgs'];
  tagStyles?: TagsStyles;
  availablePayments: {
    paymentId: string;
    isValid: boolean;
  }[]
  isPdp?: boolean
  results?: Results[];
}

export type PaymentsImages = {
  image: string;
};
