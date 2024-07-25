import React from "react";

import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";
import { CommercialOffer, Installment } from "vtex.product-context/react/ProductTypes";

import style from './styles.css';

const InstallmentsWithInterest = () => {
    const productSelected = useProduct()?.selectedItem;
    const productCommertialOffer = productSelected?.sellers?.[0]?.commertialOffer;

    const maxInterestRate = getCredisimanFinancing(productCommertialOffer);

    console.log('productCommertialOffer', productCommertialOffer);
    console.log('maxInterestRate', maxInterestRate);

    return (
        <>
            {maxInterestRate && (
                <div className={`${style.containerInstallmentsWithInterest}`}>
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
                            Total interés:
                            <FormattedCurrency
                                value={maxInterestRate?.totalInterest}
                            />
                            | Total crédito:
                            <FormattedCurrency
                                value={maxInterestRate?.fullCredit}
                            />
                        </span>
                    </div>
                    <div className={`${style.installmentsWithInterestInformation}`}>
                        *{maxInterestRate?.interestRate}% tasa de interés efectiva anual. Sujeta a aprobación por
                        el departamento de créditos de Almacenes Siman S.A. de C.V.
                    </div>
                </div>
            )}
        </>
    )
}

function formatCredisimanFinancing(commercialOffer: CommercialOffer, maxInterestRate: Installment): Financing {
    const totalValuePlusInterestRate = maxInterestRate?.TotalValuePlusInterestRate;
    const price = commercialOffer?.Price;

    const interestRate = price > 0 ? ((totalValuePlusInterestRate - price) / price) * 100 : 0;

    const financing: Financing = {
        interestRate: Math.round(interestRate * 100) / 100,
        fullCredit: totalValuePlusInterestRate,
        totalInterest: totalValuePlusInterestRate - price,
        installmentValue: maxInterestRate.Value,
        numberOfInstallments: maxInterestRate.NumberOfInstallments
    };

    return financing;
}

function getCredisimanFinancing(commercialOffer?: CommercialOffer): Financing | null {
    const installments = commercialOffer?.Installments;
    const credisimanInstallments = installments?.filter(installment =>
        installment?.PaymentSystemName.includes("Credisiman") && installment.InterestRate !== null && installment.InterestRate > 0
    ) ?? [];

    let maxInterestRateInstallment: Installment | null = null;

    for (const installment of credisimanInstallments) {
        if (
            maxInterestRateInstallment === null ||
            installment.NumberOfInstallments > maxInterestRateInstallment.NumberOfInstallments ||
            installment.InterestRate > maxInterestRateInstallment?.InterestRate
        ) {
            maxInterestRateInstallment = installment;
        }
    }

    return maxInterestRateInstallment ? formatCredisimanFinancing(commercialOffer!, maxInterestRateInstallment) : null;
}

type Financing = {
    interestRate: number;
    fullCredit: number;
    totalInterest: number;
    installmentValue?: number;
    numberOfInstallments?: number;
}

export default InstallmentsWithInterest;