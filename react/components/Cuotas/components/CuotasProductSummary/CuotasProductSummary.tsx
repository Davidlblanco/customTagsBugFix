import React from "react";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import { GenericTagsFront } from "../../Types/PaymentCustom";

import { BestInstallment } from "../../Types/BestInstallment";
import { Results } from "../../Types/Results";

import styles from './styles.css';

interface CuotasProductSummaryProps {
    tagsPreview?: GenericTagsFront | null;
    bestInstallment?: BestInstallment;
    results: Results[];
}

const CuotasProductSummary = ({
    tagsPreview,
    bestInstallment,
    results
}: CuotasProductSummaryProps) => {
    return (
        <div className={`${styles.cuotasProductSummary}`}>
            {tagsPreview && tagsPreview.tagIsActive && (
                <div className={`${styles.tagPreviewWrapper}`}>
                    <InstallmentDetails
                        installment={bestInstallment?.installment}
                        tag={{
                            quantityImgs: tagsPreview?.tagsImgs?.length,
                            styles: tagsPreview.styles,
                        }}
                        visibility={'product-summary'}
                    />
                    <PaymentImages
                        paymentsImages={tagsPreview?.tagsImgs}
                        availablePayments={results?.map((result) => ({
                            paymentId: result.paymentId,
                            isValid: result.isValid,
                        }))}
                        tagStyles={tagsPreview?.styles}
                    />
                </div>
            )}
        </div>
    )
}

export default CuotasProductSummary;