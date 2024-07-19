import React from "react";
import { FormattedCurrency } from "vtex.format-currency";

import InstallmentDetails from "../InstallmentDetail/InstallmentDetails";
import PaymentImages from "../PaymentImages/PaymentImages";
import InformationDrawer from "./components/InformationDrawer/InformationDrawer";

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
    return (
        <>
            {tagsPreview && tagsPreview.tagIsActive && (
                <div className={`${styles.cuotasPdp}`}>
                    <div className={`${styles.tagPreviewWrapper}`}>
                        <div className={`${styles.tagPreviewDetails}`}>
                            <InstallmentDetails
                                installment={bestInstallment?.installment}
                                tag={{
                                    quantityImgs: tagsPreview?.tagsImgs?.length,
                                    styles: tagsPreview.styles,
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
                                paymentsImages={tagsPreview?.tagsImgs}
                                availablePayments={results?.map((result) => ({
                                    paymentId: result.paymentId,
                                    isValid: result.isValid,
                                }))}
                                tagStyles={tagsPreview?.styles}
                            />
                        </div>
                        <InformationDrawer
                            tagsPreview={tagsPreview}
                            results={results}
                            bestInstallment={bestInstallment}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default CuotasPdp;