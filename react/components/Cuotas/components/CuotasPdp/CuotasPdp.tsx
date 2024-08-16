import React from "react";
import { FormattedCurrency } from "vtex.format-currency";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import InformationDrawer from "./components/InformationDrawer/InformationDrawer";

import { handleTags } from "./utils/handleTags";
import { bestInstallmentValues } from "./utils/bestInstallmentValues";

import { GenericTagsFront } from "../../Types/PaymentCustom";
import { Results } from "../../Types/Results";
import { BestInstallment } from "../../Types/BestInstallment";

import styles from './styles.css';

interface CuotasPdpProps {
    tagsPreview?: GenericTagsFront | null;
    bestInstallment?: BestInstallment;
    results: Results[];
}

const CuotasPdp = ({
    tagsPreview,
    bestInstallment,
    results,
}: CuotasPdpProps) => {
    const {
        credisimanResults,
        otherResults,
        updateAllTagsPreview,
        updateCredisimanTagsPreview,
        updateOthersTagsPreview
    } = handleTags(results, tagsPreview);
    const installmentValues = bestInstallmentValues(bestInstallment, results);
    const verifyTagsPreview = updateAllTagsPreview &&
        updateAllTagsPreview?.tagIsActive &&
        updateAllTagsPreview?.tagsImgs?.length > 0;
    return (
        <>
            {results.length > 0 && (
                <div className={`${styles.cuotasPdp}`}>
                    <div className={`${styles.tagPreviewWrapper}`}>
                        <div className={`${styles.tagPreviewDetails}`}>
                            <InstallmentDetails
                                installment={installmentValues?.installment}
                                tag={{
                                    quantityImgs: updateAllTagsPreview?.tagsImgs?.length ?? 0,
                                    styles: updateAllTagsPreview?.styles ?? {},
                                }}
                                visibility={'pdp'}
                            />
                            {installmentValues?.installmentPrice && (
                                <div className={`${styles.installmentPrice}`}>
                                    <FormattedCurrency
                                        value={installmentValues!.installmentPrice}
                                    />
                                </div>
                            )}
                        </div>
                        {verifyTagsPreview ? (
                            <div className={`${styles.wrapPaymentImages}`}>
                                <PaymentImages
                                    paymentsImages={updateAllTagsPreview?.tagsImgs}
                                    availablePayments={results?.map((result) => ({
                                        paymentId: result.paymentId,
                                        isValid: result.isValid,
                                    }))}
                                    tagStyles={updateAllTagsPreview?.styles}
                                    results={results}
                                    isPdp={true}
                                />
                            </div>
                        ) : (
                            <div className={`${styles.space}`}></div>
                        )}
                        <InformationDrawer
                            credisimanResults={credisimanResults}
                            otherResults={otherResults}
                            updateCredisimanTagsPreview={updateCredisimanTagsPreview}
                            updateOthersTagsPreview={updateOthersTagsPreview}
                        />
                    </div>
                </div>
            )}
        </>
    )
}



export default CuotasPdp;

