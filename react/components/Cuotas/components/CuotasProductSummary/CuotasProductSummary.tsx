import React from "react";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import { handleTags } from "../CuotasPdp/utils/handleTags";

import { bestInstallmentValues } from "../CuotasPdp/utils/bestInstallmentValues";

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
    const { updateAllTagsPreview } = handleTags(results, tagsPreview);
    const installmentValues = bestInstallmentValues(bestInstallment, results);
    return (
        <div className={`${styles.cuotasProductSummary}`}>
            {updateAllTagsPreview && updateAllTagsPreview.tagIsActive && (
                <div className={`${styles.tagPreviewWrapper}`}>
                    <InstallmentDetails
                        installment={installmentValues?.installment}
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