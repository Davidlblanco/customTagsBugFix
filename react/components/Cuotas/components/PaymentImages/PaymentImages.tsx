import React from "react";
import { BankType, GenericTagsApi, TagsStyles } from "../../Types/PaymentCustom";

import styles from "./styles.css";

export default function PaymentImages({
    paymentsImages,
    tagStyles,
    availablePayments,
    isPdp
}: Props) {
    const checksIfPaymentIsValid = paymentsImages
        ?.map((img) => {
            const payment = availablePayments.find((pay) => {
                if (pay?.BankTypes && pay?.BankTypes.length > 0) {
                    return pay?.BankTypes?.some(bank => bank.name === img.id && pay.paymentId === img.paymentId)
                } else {
                    return pay.paymentId === img.paymentId;
                }
            });
            const isValid = payment?.isValid;
            return {
                ...img,
                isValid
            };
        })
        .filter((img) => img.isValid);

    if (!checksIfPaymentIsValid) return <></>;

    return (
        <div
            className={styles["tag-preview-flag-container"]}
            style={{
                width: `calc(18px * ${checksIfPaymentIsValid?.length})`,
            }}
        >
            {checksIfPaymentIsValid.slice(0, isPdp ? checksIfPaymentIsValid.length : 3).map((img, i) => {
                const left = i === 0 ? "-5px" : `${20 * i - (7 + i)}px`;

                return (
                    <span
                        key={img.id}
                        className={styles["tag-preview-flag"]}
                        style={{
                            zIndex:
                                i === 0
                                    ? checksIfPaymentIsValid?.length * 10 + 1
                                    : Math.round((checksIfPaymentIsValid?.length * 10) / i),
                            left,
                            ...tagStyles,
                        }}
                    >
                        <img
                            src={img.value}
                            alt={img.id}
                            style={{
                                objectFit: "contain",
                                maxWidth: "20px",
                                width: "100%",
                                maxHeight: "16px",
                                height: "100%",
                            }}
                        />
                    </span>
                );
            })}

            {checksIfPaymentIsValid.length > 3 && !isPdp && (
                <span
                    className={`${styles["tag-preview-flag"]} ${styles.more}`}
                    style={{
                        zIndex: Math.round((checksIfPaymentIsValid?.length * 10) / 3),
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
    paymentsImages?: GenericTagsApi["tagsImgs"];
    tagStyles?: TagsStyles;
    availablePayments: {
        paymentId: string;
        isValid: boolean;
        BankTypes?: BankType[];

    }[];
    isPdp?: boolean;
}

export type PaymentsImages = {
    image: string;
};
