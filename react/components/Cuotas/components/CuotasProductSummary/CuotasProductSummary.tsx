import React from "react";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import { credisimanInstallments } from "../CuotasPdp/utils/credisimanInstallments";

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
    const { updateAllTagsPreview } = credisimanInstallments(results, tagsPreview);
    return (
        <div className={`${styles.cuotasProductSummary}`}>
            {updateAllTagsPreview && updateAllTagsPreview.tagIsActive && (
                <div className={`${styles.tagPreviewWrapper}`}>
                    <InstallmentDetails
                        installment={bestInstallment?.installment}
                        tag={{
                            quantityImgs: updateAllTagsPreview?.tagsImgs?.length,
                            styles: updateAllTagsPreview.styles,
                        }}
                        visibility={'product-summary'}
                    />
                    <PaymentImages
                        paymentsImages={updateAllTagsPreview?.tagsImgs}
                        availablePayments={results?.map((result) => ({
                            paymentId: result.paymentId,
                            isValid: result.isValid,
                        }))}
                        tagStyles={updateAllTagsPreview?.styles}
                    />
                </div>
            )}
        </div>
    )
}

export default CuotasProductSummary;