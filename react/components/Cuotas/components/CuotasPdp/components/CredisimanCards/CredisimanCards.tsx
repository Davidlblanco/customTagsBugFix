import React from "react";
import { FormattedCurrency } from "vtex.format-currency";

import PaymentImages from "../../../PaymentImages/PaymentImages";
import InstallmentDetailDrawer from "../InstallmentDetailDrawer/InstallmentDetailDrawer";
import InstallmentsWithInterest from "../InstallmentsWithInterest/InstallmentsWithInterest";

import { getBestPayment } from "../../../../hooks/useProductPayments";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { Results } from "../../../../Types/Results";

import style from './styles.css';

interface CredisimanCardsProps {
    values: {
        updateCredisimanTagsPreview?: GenericTagsFront | null;
        credisimanResults: Results[];
    }
}

const CredisimanCards = ({ values }: CredisimanCardsProps) => {
    const { updateCredisimanTagsPreview, credisimanResults } = values;
    const bestInstallment = getBestPayment(credisimanResults)?.bestInstallment;
    return (
        <>
            {credisimanResults.length > 0 && updateCredisimanTagsPreview && updateCredisimanTagsPreview.tagIsActive && (
                <div className={`${style.containerCredisimanCards}`}>
                    <div className={`${style.wrapCredisimanCards}`}>
                        <h2 className={`${style.titleCredisimanCards}`}>
                            Con tarjetas Credisiman
                        </h2>
                        <div className={`${style.wrapPaymentImages}`}>
                            <PaymentImages
                                paymentsImages={updateCredisimanTagsPreview?.tagsImgs}
                                availablePayments={credisimanResults?.map((result) => ({
                                    paymentId: result.paymentId,
                                    isValid: result.isValid,
                                }))}
                                tagStyles={updateCredisimanTagsPreview?.styles}
                            />
                        </div>
                        <InstallmentsWithInterest />
                        <div className={`${style.wrapInfomartionCredisiman}`}>
                            <InstallmentDetailDrawer
                                installment={bestInstallment?.installment}
                                firstText="Hasta"
                                secundText="cuotas sin intereses"
                            />
                            <div className={`${style.installmentPrice}`}>
                                <FormattedCurrency
                                    value={bestInstallment!.installmentPrice / 100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CredisimanCards;