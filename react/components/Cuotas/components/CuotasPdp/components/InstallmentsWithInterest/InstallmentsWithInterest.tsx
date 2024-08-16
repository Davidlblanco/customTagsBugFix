import React from "react";

import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";

import { getBestPayment } from "../../../../hooks/useProductPayments";
import { getCredisimanFinancing } from "../../utils/getCredisimanFinancing";

import { Results } from "../../../../Types/Results";

import style from './styles.css';

interface InstallmentsWithInterestProps {
    credisimanResults: Results[];
    interestFreeValid: boolean;
}

const InstallmentsWithInterest = ({
    credisimanResults,
    interestFreeValid
}: InstallmentsWithInterestProps) => {
    const productSelected = useProduct()?.selectedItem;
    const productCommertialOffer = productSelected?.sellers?.[0]?.commertialOffer;
    const bestInstallment = getBestPayment(credisimanResults, true)?.bestInstallment;
    const maxInterestRate = getCredisimanFinancing(productCommertialOffer, bestInstallment?.installment);
    return (
        <>
            {maxInterestRate && (
                <div className={`
                    ${style.containerCredisimanInstallmentsWithInterest} 
                    ${!interestFreeValid ? style.containerInstallmentsBorderNone : ''}
                `}>
                    <div className={`${style.wrapCredisimanInstallmentsWithInterest}`}>
                        <div className={`${style.wrapCredisimanInstallments}`}>
                            <div className={`${style.informationNumberOfInstallments}`}>
                                Hasta {maxInterestRate?.numberOfInstallments} cuotas con financiamiento*
                            </div>

                            <div className={`${style.priceOfInstallments}`}>
                                <FormattedCurrency
                                    value={maxInterestRate?.installmentValue ?? 0}
                                />
                            </div>
                        </div>
                        <span className={`${style.wrapCredisimanFinancingValues}`}>
                            <div className={`${style.wrapTotalInterest}`}>
                                <span className={`${style.titleTotalInterest}`}>Total interés:</span>
                                <span className={`${style.priceTotalInterest}`}>
                                    <FormattedCurrency
                                        value={maxInterestRate?.totalInterest}
                                    />
                                </span>
                            </div>

                            <span>|</span>

                            <div className={`${style.wrapFullCredit}`}>
                                <span className={`${style.titleFullCredit}`}>Total crédito:</span>
                                <span className={`${style.pricefullCredit}`}>
                                    <FormattedCurrency
                                        value={maxInterestRate?.fullCredit}
                                    />
                                </span>
                            </div>
                        </span>
                    </div>
                    <div className={`
                        ${style.interestPercentageInformation} 
                        ${!interestFreeValid ? style.interestInformationPaddingNone : ''}
                    `}>
                        *{maxInterestRate?.interestRate}% tasa de interés efectiva anual. Sujeta a aprobación por
                        el departamento de créditos de Almacenes Siman S.A. de C.V.
                    </div>
                </div>
            )}
        </>
    )
}

export default InstallmentsWithInterest;