import React from "react";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
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
                </div>
            )}
        </div>
    );
};

export default CuotasProductSummary;