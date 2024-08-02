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
import { useProduct } from "vtex.product-context";
import { getCredisimanFinancing } from "./utils/getCredisimanFinancing";
import { CommercialOffer } from "vtex.product-context/react/ProductTypes";

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
    const productSelected = useProduct()?.selectedItem;
    const productCommertialOffer = productSelected?.sellers?.[0]?.commertialOffer;
    const {
        credisimanResults,
        otherResults,
        updateAllTagsPreview,
        updateCredisimanTagsPreview,
        updateOthersTagsPreview
    } = handleTags(results, tagsPreview);
    const installmentValues = bestInstallmentValues(productCommertialOffer, bestInstallment, credisimanResults);
    return (
        <>
            {updateAllTagsPreview && updateAllTagsPreview.tagIsActive && (
                <div className={`${styles.cuotasPdp}`}>
                    <div className={`${styles.tagPreviewWrapper}`}>
                        <div className={`${styles.tagPreviewDetails}`}>
                            <InstallmentDetails
                                installment={installmentValues?.installment}
                                tag={{
                                    quantityImgs: updateAllTagsPreview?.tagsImgs?.length,
                                    styles: updateAllTagsPreview?.styles,
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

const bestInstallmentValues = (
    productCommertialOffer: CommercialOffer | undefined,
    bestInstallment: BestInstallment,
    credisimanResults: Results[]
): BestInstallmentValues => {
    const installment = bestInstallment?.installment;
    const credisimanFinancing = getCredisimanFinancing(productCommertialOffer, installment);

    let values: BestInstallmentValues = {};

    const credisimanCuotas = credisimanResults?.find((item) => item.paymentId === '405' && item?.isValid);

    if (credisimanFinancing && credisimanCuotas) {
        values = {
            installment: credisimanFinancing?.numberOfInstallments,
            installmentPrice: parseFloat((credisimanFinancing?.installmentValue ?? 0 / 100).toFixed(2))
        };
    } else {
        values = {
            installment: bestInstallment?.installment,
            installmentPrice: parseFloat(((bestInstallment?.installmentPrice ?? 0) / 100).toFixed(2))
        };
    }

    return values;
};


export default CuotasPdp;

type BestInstallmentValues = {
    installment?: number;
    installmentPrice?: number;
};