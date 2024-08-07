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
                    ${style.containerInstallmentsWithInterest} 
                    ${!interestFreeValid ? style.containerInstallmentsBorderNone : ''}
                `}>
                    <div className={`${style.wrapInstallmentsWithInterest}`}>
                        <div className={`${style.wrapInstallments}`}>
                            <div className={`${style.installmentsInformation}`}>
                                Hasta {maxInterestRate?.numberOfInstallments} cuotas con financiamiento*
                            </div>

                            <div className={`${style.installmentsWithInterestPrice}`}>
                                <FormattedCurrency
                                    value={maxInterestRate?.installmentValue ?? 0}
                                />
                            </div>
                        </div>
                        <span className={`${style.installmentsWithInterestValues}`}>
                            <div className={`${style.interestValues}`}>
                                <span className={`${style.interestTitle}`}>Total interés:</span>
                                <FormattedCurrency
                                    value={maxInterestRate?.totalInterest}
                                />
                            </div>

                            <span>|</span>

                            <div className={`${style.interestValues}`}>
                                <span className={`${style.interestTitle}`}>Total crédito:</span>
                                <FormattedCurrency
                                    value={maxInterestRate?.fullCredit}
                                />
                            </div>
                        </span>
                    </div>
                    <div className={`
                        ${style.installmentsWithInterestInformation} 
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