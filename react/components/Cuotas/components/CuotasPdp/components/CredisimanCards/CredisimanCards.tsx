import React from "react";

import { GenericTagsFront } from "../../../../Types/PaymentCustom";
import { BestInstallment } from "../../../../Types/BestInstallment";
import { Results } from "../../../../Types/Results";

import PaymentImages from "../../../PaymentImages/PaymentImages";

import style from './styles.css';

interface CredisimanCardsProps {
    values: {
        tagsPreview?: GenericTagsFront | null;
        bestInstallment?: BestInstallment;
        results: Results[];
    }
}

const CredisimanCards = ({ values }: CredisimanCardsProps) => {
    const { tagsPreview, results } = values;

    const otherResults = results.filter((result) => result.paymentId === '403' && result.isValid) ?? [];
    const otherTagsImgs = tagsPreview?.tagsImgs?.filter((result) => result.paymentId === '403') ?? [];

    return (
        <>
            {tagsPreview && tagsPreview.tagIsActive && (
                <div className={`${style.containerCredisimanCards}`}>
                    <div className={`${style.wrapCredisimanCards}`}>
                        <h2 className={`${style.titleCredisimanCards}`}>
                            Con tarjetas Credisiman
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
                    </div>
                </div>
            )}
        </>
    )
}

export default CredisimanCards;