import React from "react";

import { FormattedCurrency } from "vtex.format-currency";
import { useProduct } from "vtex.product-context";

import { getBestPayment } from "../../../../hooks/useProductPayments";
import { getCredisimanFinancing } from "../../utils/getCredisimanFinancing";

import { Results } from "../../../../Types/Results";

import style from './styles.css';

interface InstallmentsWithInterestProps {
    credisimanResults: Results[];
}

const InstallmentsWithInterest = ({ credisimanResults }: InstallmentsWithInterestProps) => {
    const productSelected = useProduct()?.selectedItem;
    const productCommertialOffer = productSelected?.sellers?.[0]?.commertialOffer;

    const credisiman = credisimanResults?.filter((item) => item?.paymentId === '405');
    const bestInstallment = getBestPayment(credisiman ?? [])?.bestInstallment;
    const maxInterestRate = getCredisimanFinancing(productCommertialOffer, bestInstallment?.installment);

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


export default InstallmentsWithInterest;