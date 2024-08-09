import React from "react";
import { FormattedCurrency } from "vtex.format-currency";

import PaymentImages from "../../../PaymentImages/PaymentImages";
import InstallmentDetailDrawer from "../InstallmentDetailDrawer/InstallmentDetailDrawer";
import { getBestPayment } from "../../../../hooks/useProductPayments";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { Results } from "../../../../Types/Results";

import style from './styles.css';

interface OtherCardsProps {
    values: {
        updateOthersTagsPreview?: GenericTagsFront | null;
        otherResults: Results[];
    }
}

const OtherCards = ({ values }: OtherCardsProps) => {
    const { updateOthersTagsPreview, otherResults } = values;
    const { groupedTags, sortedInstallments } = processInstallments(otherResults);
    const isSingleItem = sortedInstallments.length === 1;
    const minInstallments = sortedInstallments?.some((item) => item >= 6);
    const verifyTagsPreview = updateOthersTagsPreview &&
        updateOthersTagsPreview?.tagIsActive &&
        updateOthersTagsPreview?.tagsImgs?.length > 0;
    return (
        <>
            {minInstallments && (
                <div className={`${style.containerOtherCards}`}>
                    <div className={`${style.wrapOtherCards}`}>
                        <h2 className={`${style.titleOtherCards}`}>
                            Con otras tarjetas
                        </h2>
                        {sortedInstallments.map((installment, index) => {
                            const isLastItem = index === sortedInstallments.length - 1;
                            return (
                                <div
                                    key={installment}
                                    className={`
                                        ${style.wrapContentPaymentImages} 
                                        ${!isSingleItem && !isLastItem ? style.borderWrapContentPayment : ''}
                                        ${isSingleItem ? style.singleItem : ''}
                                    `}
                                >
                                    {verifyTagsPreview && (
                                        <div className={`${style.wrapPaymentImages}`}>
                                            <PaymentImages
                                                paymentsImages={updateOthersTagsPreview?.tagsImgs}
                                                availablePayments={groupedTags[installment].map((bank) => ({
                                                    paymentId: bank.paymentId,
                                                    isValid: bank.isValid,
                                                }))}
                                                tagStyles={updateOthersTagsPreview?.styles}
                                            />
                                        </div>
                                    )}

                                    <div className={`${style.wrapInfomartionOther}`}>
                                        <InstallmentDetailDrawer
                                            installment={installment}
                                            firstText="Hasta"
                                            secundText="cuotas sin intereses"
                                        />
                                        {groupedTags[installment][0]?.bestInstallment!.installmentPrice && (
                                            <div className={`${style.installmentPrice}`}>
                                                <FormattedCurrency
                                                    value={groupedTags[installment][0]?.bestInstallment!.installmentPrice / 100}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

const processInstallments = (otherResults: Results[]): ProcessInstallmentsResult => {
    const filteredBanks = otherResults?.filter(result =>
        result?.installments?.some(installment => installment?.installment >= 6)
    );

    const bestInstallments = filteredBanks?.map(bank => {
        return {
            ...bank,
            bestInstallment: getBestPayment([bank])?.bestInstallment
        };
    });

    const groupedTags = bestInstallments.reduce((acc, bank) => {
        const installment = bank.bestInstallment?.installment;
        if (!installment) return acc;

        if (!acc[installment]) {
            acc[installment] = [];
        }
        acc[installment].push(bank);
        return acc;
    }, {});

    const sortedInstallments = Object.keys(groupedTags)
        .map(Number)
        .sort((a, b) => b - a);

    return { groupedTags, sortedInstallments };
};

export default OtherCards;

interface ProcessInstallmentsResult {
    groupedTags: Record<number, Results[]>;
    sortedInstallments: number[];
}