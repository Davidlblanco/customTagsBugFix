import React from "react";
import { FormattedCurrency } from "vtex.format-currency";

import PaymentImages from "../../../PaymentImages/PaymentImages";
import InstallmentDetailDrawer from "../InstallmentDetailDrawer/InstallmentDetailDrawer";
import InstallmentsWithInterest from "../InstallmentsWithInterest/InstallmentsWithInterest";

import { getBestPayment } from "../../../../hooks/useProductPayments";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { Results } from "../../../../Types/Results";

import style from "./styles.css";

interface CredisimanCardsProps {
    values: {
        updateCredisimanTagsPreview?: GenericTagsFront | null;
        credisimanResults: Results[];
    };
}

const CredisimanCards = ({ values }: CredisimanCardsProps) => {
    const { updateCredisimanTagsPreview, credisimanResults } = values;
    const interestFreeCredisiman = credisimanResults?.filter((item) => item?.paymentId !== "406");
    const bestInstallment = getBestPayment(interestFreeCredisiman)?.bestInstallment;
    const interestFreeValid = bestInstallment ? true : false;

    const verifyTagsPreview =
        updateCredisimanTagsPreview &&
        updateCredisimanTagsPreview?.tagIsActive &&
        updateCredisimanTagsPreview?.tagsImgs?.length > 0;

    return (
        <>
            {credisimanResults.length > 0 && (
                <div className={`${style.containerCredisimanCards}`}>
                    <div className={`${style.wrapCredisimanCards}`}>
                        <h2 className={`${style.titleCredisimanCards}`}>Con tarjetas Credisiman</h2>
                        {verifyTagsPreview && (
                            <div className={`${style.wrapPaymentImages}`}>
                                <PaymentImages
                                    paymentsImages={updateCredisimanTagsPreview?.tagsImgs}
                                    availablePayments={credisimanResults?.map((result) => ({
                                        paymentId: result.paymentId,
                                        isValid: result.isValid,
                                    }))}
                                    tagStyles={updateCredisimanTagsPreview?.styles}
                                    isPdp={true}
                                />
                            </div>
                        )}
                        <InstallmentsWithInterest
                            credisimanResults={credisimanResults}
                            interestFreeValid={interestFreeValid}
                            updateCredisimanTagsPreview={updateCredisimanTagsPreview}
                        />
                        {interestFreeValid && (
                            <div className={`${style.wrapCredisimanInterestFreeInstallments}`}>
                                <InstallmentDetailDrawer
                                    installment={bestInstallment?.installment}
                                    firstText="Hasta"
                                    secundText="cuotas sin intereses"
                                    className={`${style.credsimanTextInterestFreeInstallments}`}
                                />
                                {bestInstallment?.installmentPrice && (
                                    <div className={`${style.credisimanPriceInterestFreeInstallments}`}>
                                        <FormattedCurrency value={bestInstallment!.installmentPrice / 100} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default CredisimanCards;