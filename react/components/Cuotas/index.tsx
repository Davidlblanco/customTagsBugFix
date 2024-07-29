import React, { useEffect, useState } from "react";
import { Spinner } from "vtex.styleguide";
import styles from "./Cuotas.css";
import useProductPayments from "./hooks/useProductPayments";
import { FormattedCurrency } from "vtex.format-currency";
import { GenericTagsFront } from "./Types/PaymentCustom";
import PaymentImages from "./components/PaymentImages/PaymentImages";
import InstallmentDetails from "./components/InstallmentDetail/InstallmentDetails";
import { useGenericTags } from "../../contexts/GenericTagsContext";

const Cuotas: StorefrontFunctionComponent<Props> = ({ hidePrice }) => {
    const [tagsPreview, setTagsPreview] = useState<GenericTagsFront | null>(
        null
    );
    const { tags } = useGenericTags();

    const { isLoading, bestInstallment, results } = useProductPayments({
        paymentIds: [], // This filter is optional
    });

    useEffect(() => {
        if (!tags) return;
        setTagsPreview({
            ...tags,
            styles: {
                backgroundColor: tags.styles?.find(
                    (tag) => tag.id === "backgroundColor"
                )?.value,
                borderColor: tags.styles?.find(
                    (tag) => tag.id === "borderColor"
                )?.value,
                borderRadius: tags.styles?.find(
                    (tag) => tag.id === "borderRadius"
                )?.value,
                fontSize: tags.styles?.find((tag) => tag.id === "fontSize")
                    ?.value,
                color: tags.styles?.find((tag) => tag.id === "textColor")
                    ?.value,
            },
        });
    }, [tags]);

    if (isLoading) {
        return (
            <div className={styles.SpinnerContainer}>
                <Spinner />
            </div>
        );
    }

    const canRender =
        bestInstallment?.installment && bestInstallment.installment > 1;

    if (!canRender || !tagsPreview?.tagIsActive) {
        return <></>;
    }

    return (
        <div
            className={`${styles.CuotasContainerNewpdp} ${hidePrice ? styles["without-price"] : ""
                }`}
        >
            {tagsPreview?.tagIsActive && (
                <div className={styles["tag-preview-wrapper"]}>
                    <InstallmentDetails
                        installment={bestInstallment?.installment}
                        tag={{
                            quantityImgs: tagsPreview?.tagsImgs?.length,
                            styles: tagsPreview?.styles,
                        }}
                    />

                    <PaymentImages
                        paymentsImages={tagsPreview?.tagsImgs}
                        availablePayments={results.map((result) => ({
                            paymentId: result.paymentId,
                            isValid: result.isValid,
                        }))}
                        tagStyles={tagsPreview?.styles}
                    />
                </div>
            )}

            {!hidePrice && (
                <div className={styles.OtherPaymentsContainer}>
                    <div className={styles.InstallmentPrice}>
                        <FormattedCurrency
                            value={bestInstallment!.installmentPrice / 100}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

Cuotas.schema = {
    title: "Custom Cuotas",
};

type Props = {
    hidePrice: boolean;
};

export { Cuotas };