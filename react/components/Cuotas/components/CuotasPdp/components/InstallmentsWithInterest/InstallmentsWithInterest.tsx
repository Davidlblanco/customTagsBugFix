import React from "react";

import { FormattedCurrency } from "vtex.format-currency";

import { getBestPayment } from "../../../../hooks/useProductPayments";
import { getCredisimanFinancing } from "../../utils/getCredisimanFinancing";

import { Results } from "../../../../Types/Results";
import { GenericTagsFront } from "../../../../Types/PaymentCustom";

import style from "./styles.css";

interface InstallmentsWithInterestProps {
    credisimanResults: Results[];
    interestFreeValid: boolean;
    updateCredisimanTagsPreview?: GenericTagsFront | null;
}

const InstallmentsWithInterest = ({
    credisimanResults,
    interestFreeValid,
    updateCredisimanTagsPreview,
}: InstallmentsWithInterestProps) => {
    const credisiman = credisimanResults?.filter((item) => item?.paymentId === "406");
    const bestInstallment = getBestPayment(credisiman ?? [])?.bestInstallment;
    const maxInterestRate = getCredisimanFinancing(bestInstallment?.installment);

    const textInformation = updateCredisimanTagsPreview?.tagInformation?.value ?? "";
    return (
        <>
            {maxInterestRate && (
                <div
                    className={`
                    ${style.containerCredisimanInstallmentsWithInterest} 
                    ${!interestFreeValid ? style.containerInstallmentsBorderNone : ""}
                `}
                >
                    <div className={`${style.wrapCredisimanInstallmentsWithInterest}`}>
                        <div className={`${style.wrapCredisimanInstallments}`}>
                            <div className={`${style.informationNumberOfInstallments}`}>
                                Hasta {maxInterestRate?.numberOfInstallments} cuotas con financiamiento*
                            </div>

                            <div className={`${style.priceOfInstallments}`}>
                                <FormattedCurrency value={maxInterestRate?.installmentValue ?? 0} />
                            </div>
                        </div>
                        <span className={`${style.wrapCredisimanFinancingValues}`}>
                            <div className={`${style.wrapTotalInterest}`}>
                                <span className={`${style.titleTotalInterest}`}>Total interés:</span>
                                <span className={`${style.priceTotalInterest}`}>
                                    <FormattedCurrency value={maxInterestRate?.totalInterest} />
                                </span>
                            </div>

                            <span>|</span>

                            <div className={`${style.wrapFullCredit}`}>
                                <span className={`${style.titleFullCredit}`}>Total crédito:</span>
                                <span className={`${style.pricefullCredit}`}>
                                    <FormattedCurrency value={maxInterestRate?.fullCredit} />
                                </span>
                            </div>
                        </span>
                    </div>
                    <div
                        className={`
                        ${style.interestPercentageInformation} 
                        ${!interestFreeValid ? style.interestInformationPaddingNone : ""}
                    `}
                    >
                        {/* *{maxInterestRate?.interestRate}% tasa de interés efectiva anual. Sujeta a aprobación por
                        el departamento de créditos de Almacenes Siman S.A. de C.V. */}
                        {textInformation}
                    </div>
                </div>
            )}
        </>
    );
};

export default InstallmentsWithInterest;
