import React from "react";

import { FormattedCurrency } from "vtex.format-currency";

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
    const maxInterestRate = getCredisimanFinancing(credisimanResults, updateCredisimanTagsPreview?.interestRate);
    const textInformation = updateCredisimanTagsPreview?.tagInformation?.value ?? "";
    const textCuota = maxInterestRate?.numberOfInstallments && maxInterestRate?.numberOfInstallments > 1 ? 'cuotas' : 'cuota';
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
                                Hasta {maxInterestRate?.numberOfInstallments} {textCuota} con financiamiento*
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
                        {textInformation}
                    </div>
                </div>
            )}
        </>
    );
};

export default InstallmentsWithInterest;