import React from "react";

import { FormattedCurrency } from "vtex.format-currency";

import PaymentImages from "../../../PaymentImages/PaymentImages";
import InstallmentDetailDrawer from "../InstallmentDetailDrawer/InstallmentDetailDrawer";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { BestInstallment } from "../../../../Types/BestInstallment";
import { Results } from "../../../../Types/Results";

import style from './styles.css';

interface OtherCardsProps {
    values: {
        tagsPreview?: GenericTagsFront | null;
        bestInstallment?: BestInstallment;
        results: Results[];
    }
}

const OtherCards = ({ values }: OtherCardsProps) => {
    const { tagsPreview, results } = values;

    const findMaxInstallment = (results: Results[]): Results | null => {
        if (results.length === 0) return null;

        return results.reduce((maxResult, currentResult) => {
            const maxInstallmentPrice = currentResult.installments.reduce((maxPrice, installment) =>
                installment.installmentPrice > maxPrice ? installment.installmentPrice : maxPrice
                , 0);

            return maxInstallmentPrice > (maxResult?.installments.reduce((maxPrice, installment) =>
                installment.installmentPrice > maxPrice ? installment.installmentPrice : maxPrice
                , 0) ?? 0) ? currentResult : maxResult;
        }, results[0] || null);
    };


    const otherResults = results.filter((result) => result.paymentId !== '403' && result.isValid) ?? [];
    const otherTagsImgs = tagsPreview?.tagsImgs?.filter((result) => result.paymentId !== '403') ?? [];
    const bestInstallment = findMaxInstallment(otherResults)?.bestInstallment;

    return (
        <>
            {tagsPreview && tagsPreview.tagIsActive && (
                <div className={`${style.containerOtherCards}`}>
                    <div className={`${style.wrapOtherCards}`}>
                        <h2 className={`${style.titleOtherCards}`}>
                            Con otras tarjetas
                        </h2>
                        <div className={`${style.wrapPaymentImages}`}>
                            <PaymentImages
                                paymentsImages={otherTagsImgs}
                                availablePayments={otherResults?.map((result) => ({
                                    paymentId: result.paymentId,
                                    isValid: result.isValid,
                                }))}
                                tagStyles={tagsPreview?.styles}
                            />
                        </div>
                        <div className={`${style.wrapInfomartionOther}`}>
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

export default OtherCards;