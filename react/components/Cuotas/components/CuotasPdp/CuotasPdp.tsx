import React from "react";
import { FormattedCurrency } from "vtex.format-currency";
import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import InformationDrawer from "./components/InformationDrawer/InformationDrawer";
import { handleTags } from "./utils/handleTags";
import { GenericTagsFront } from "../../Types/PaymentCustom";
import { Results } from "../../Types/Results";
import { BestInstallment } from "../../Types/BestInstallment";
import { getCredisimanFinancing } from "./utils/getCredisimanFinancing";
import styles from "./styles.css";

interface CuotasPdpProps {
    tagsPreview?: GenericTagsFront | null;
    bestInstallment?: BestInstallment;
    results: Results[];
}

const CuotasPdp = ({ tagsPreview, bestInstallment, results }: CuotasPdpProps) => {
    const {
        credisimanResults,
        otherResults,
        updateAllTagsPreview,
        updateCredisimanTagsPreview,
        updateOthersTagsPreview,
    } = handleTags(results, tagsPreview);
    const installmentValues = bestInstallmentValues(bestInstallment, credisimanResults);
    const verifyTagsPreview =
        updateAllTagsPreview && updateAllTagsPreview?.tagIsActive && updateAllTagsPreview?.tagsImgs?.length > 0;
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
                                visibility={"pdp"}
                            />
                            {installmentValues?.installmentPrice && (
                                <div className={`${styles.installmentPrice}`}>
                                    <FormattedCurrency value={installmentValues!.installmentPrice} />
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
                                        BankTypes: result?.BankTypes
                                    }))}
                                    tagStyles={updateAllTagsPreview?.styles}
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
    );
};

const bestInstallmentValues = (
    bestInstallment: BestInstallment,
    credisimanResults: Results[]
): BestInstallmentValues => {
    const installment = bestInstallment?.installment;
    const credisimanFinancing = getCredisimanFinancing(installment);

    let values: BestInstallmentValues = {};

    const credisimanCuotas = credisimanResults?.find((item) => item.paymentId === "406" && item?.isValid);

    if (credisimanFinancing && credisimanCuotas) {
        values = {
            installment: credisimanFinancing?.numberOfInstallments,
            installmentPrice: parseFloat((credisimanFinancing?.installmentValue ?? 0 / 100).toFixed(2)),
        };
    } else {
        values = {
            installment: bestInstallment?.installment,
            installmentPrice: parseFloat(((bestInstallment?.installmentPrice ?? 0) / 100).toFixed(2)),
        };
    }

    return values;
};

type BestInstallmentValues = {
    installment?: number;
    installmentPrice?: number;
};

export default CuotasPdp;
