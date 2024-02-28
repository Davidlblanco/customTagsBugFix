import React from "react";
import { Spinner } from "vtex.styleguide";
import styles from "./Cuotas.css";
import useProductPayments from "./hooks/useProductPayments";
import { FormattedCurrency } from "vtex.format-currency";
import InstallmentRuleMessage from "./components/InstallmentRuleMessage/InstallmentRuleMessage";
import InstallmentMinimunPrice from "./components/InstallmentMinimunPrice/InstallmentMinimunPrice";
import PaymentImages, {
    PaymentsImages,
} from "./components/PaymentImages/PaymentImages";
import InfoLink from "./components/InfoLink/InfoLink";

const Cuotas: StorefrontFunctionComponent<Props> = ({ paymentsImages }) => {
    const { isLoading, bestInstallment } = useProductPayments({
        paymentIds: [], // This filter is optional
    });

    console.log("bestInstallment", bestInstallment);

    if (isLoading) {
        return (
            <div className={styles.SpinnerContainer}>
                <Spinner />
            </div>
        );
    }

    const canRender =
        bestInstallment?.installment && bestInstallment.installment > 1;

    if (!canRender) {
        return <></>;
    }

    return (
        <div className={styles.CuotasContainerNewpdp}>
            <div className={styles.OtherPaymentsContainer}>
                <InstallmentRuleMessage installment={bestInstallment!} />
                <div className={styles.InstallmentPrice}>
                    <FormattedCurrency
                        value={bestInstallment!.installmentPrice / 100}
                    />
                </div>
                <InstallmentMinimunPrice installment={bestInstallment!} />
                <PaymentImages paymentsImages={paymentsImages} />
                <InfoLink />
            </div>
        </div>
    );
};

Cuotas.schema = {
    title: "Custom Cuotas",
};

type Props = {
    crediSimanImage: string;
    paymentsImages: PaymentsImages[];
};

export { Cuotas };
