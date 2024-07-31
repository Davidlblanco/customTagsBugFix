import React from "react";
import { FormattedCurrency } from "vtex.format-currency";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import InformationDrawer from "./components/InformationDrawer/InformationDrawer";

import { handleTags } from "./utils/handleTags";

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


    return (
        <>
            {updateAllTagsPreview && updateAllTagsPreview.tagIsActive && (
                <div className={`${styles.cuotasPdp}`}>
                    <div className={`${styles.tagPreviewWrapper}`}>
                        <div className={`${styles.tagPreviewDetails}`}>
                            <InstallmentDetails
                                installment={bestInstallment?.installment}
                                tag={{
                                    quantityImgs: updateAllTagsPreview?.tagsImgs?.length,
                                    styles: updateAllTagsPreview?.styles,
                                }}
                                visibility={'pdp'}
                            />
                            <div className={`${styles.installmentPrice}`}>
                                <FormattedCurrency
                                    value={bestInstallment!.installmentPrice / 100}
                                />
                            </div>
                        </div>
                        <div className={`${styles.wrapPaymentImages}`}>
                            <PaymentImages
                                paymentsImages={updateAllTagsPreview?.tagsImgs}
                                availablePayments={results?.map((result) => ({
                                    paymentId: result.paymentId,
                                    isValid: result.isValid,
                                }))}
                                tagStyles={updateAllTagsPreview?.styles}
                            />
                        </div>
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