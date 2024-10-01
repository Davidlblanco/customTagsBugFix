import React from "react";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import { handleTags } from "../CuotasPdp/utils/handleTags";

import { GenericTagsFront } from "../../Types/PaymentCustom";
import { BestInstallment } from "../../Types/BestInstallment";
import { Results } from "../../Types/Results";

import styles from "./styles.css";

interface CuotasProductSummaryProps {
    tagsPreview?: GenericTagsFront | null;
    bestInstallment?: BestInstallment;
    results: Results[];
}

const CuotasProductSummary = ({ tagsPreview, bestInstallment, results }: CuotasProductSummaryProps) => {
    const { updateAllTagsPreview } = handleTags(results, tagsPreview);
    const verifyTagsPreview =
        updateAllTagsPreview && updateAllTagsPreview?.tagIsActive && updateAllTagsPreview?.tagsImgs?.length > 0;
    return (
        <div className={`${styles.cuotasProductSummary}`}>
            {results.length > 0 && (
                <div className={`${styles.tagPreviewWrapper}`}>
                    <InstallmentDetails
                        installment={bestInstallment?.installment}
                        tag={{
                            quantityImgs: updateAllTagsPreview?.tagsImgs?.length ?? 0,
                            tagIsActive: updateAllTagsPreview?.tagIsActive,
                            styles: updateAllTagsPreview?.styles ?? {},
                        }}
                        visibility={"product-summary"}
                    />
                    {verifyTagsPreview && (
                        <PaymentImages
                            paymentsImages={updateAllTagsPreview?.tagsImgs}
                            availablePayments={results?.map((result) => ({
                                paymentId: result.paymentId,
                                isValid: result.isValid,
                                BankTypes: result?.BankTypes
                            }))}
                            tagStyles={updateAllTagsPreview?.styles}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CuotasProductSummary;