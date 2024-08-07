import React from "react";
import { GenericTagsApi, TagsStyles } from "../../Types/PaymentCustom";

import styles from "./styles.css";

export default function PaymentImages({
    paymentsImages,
    tagStyles,
    availablePayments,
}: Props) {
    const checksIfPaymentIsValid = paymentsImages
        ?.map((img) => {
            const isValid = availablePayments.find(
                (pay) => `${pay.paymentId}` === `${img.paymentId}`
            )?.isValid;

            return {
                ...img,
                isValid,
            };
        })
        .filter((img) => img.isValid);

    return (
        <div
            className={styles["tag-preview-flag-container"]}
            style={{
                width: `calc(18px * ${checksIfPaymentIsValid?.length})`,
            }}
        >
            {checksIfPaymentIsValid?.map((img, i) => {
                const left = i === 0 ? "-5px" : `${20 * i - (7 + i)}px`;

                return (
                    <span
                        key={img.id}
                        className={styles["tag-preview-flag"]}
                        style={{
                            zIndex:
                                i === 0
                                    ? checksIfPaymentIsValid?.length * 10 + 1
                                    : Math.round(
                                          (checksIfPaymentIsValid?.length *
                                              10) /
                                              i
                                      ),
                            left,
                            ...tagStyles,
                        }}
                    >
                        <img
                            src={img.value}
                            alt={img.id}
                            width={14}
                            height={14}
                            style={{ objectFit: "cover" }}
                        />
                    </span>
                );
            })}
        </div>
    );
}

interface Props {
    paymentsImages: GenericTagsApi["tagsImgs"];
    tagStyles: TagsStyles;
    availablePayments: {
        paymentId: string;
        isValid: boolean;
    }[];
}

export type PaymentsImages = {
    image: string;
};
