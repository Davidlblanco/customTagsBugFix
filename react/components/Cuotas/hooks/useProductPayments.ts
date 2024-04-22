import { useMemo } from "react";
import usePaymentConfigs, { PaymentConfigFilters } from "./usePaymentConfigs";
import useSelectedProductInfo from "./useSelectedProductInfo";
import {
    PaymentResult,
    validateConfig,
} from "../Logic/PaymentCustomValidators";

export default function useProductPayments(props: Props) {
    const selectedProductInfo = useSelectedProductInfo();
    const paymentConfigs = usePaymentConfigs(props);

    const results = useMemo(() => {
        return paymentConfigs?.configs?.map((config) =>
            validateConfig(config, selectedProductInfo)
        );
    }, [paymentConfigs.configs, selectedProductInfo]);

    const bestPayment = useMemo(() => {
        return getBestPayment(results);
    }, [results]);

    return {
        skuId: selectedProductInfo.skuId,
        results,
        bestPayment: bestPayment,
        bestInstallment: bestPayment?.bestInstallment,
        isLoading: paymentConfigs.isLoading,
    };
}

function getBestPayment(data: PaymentResult[]): PaymentResult | null {
    return data.reduce((prev: PaymentResult | null, current) => {
        // If the current payment is not valid, we ignore it
        if (!current.isValid || !current.bestInstallment) return prev;

        // If there is no previous payment, we return the current one
        if (!prev?.bestInstallment) return current;

        // If the current payment has a higher installment, we return the current one
        if (
            current.bestInstallment.installment >
            prev.bestInstallment.installment
        )
            return current;

        // Otherwise we return the previous one
        return prev;
    }, null);
}

interface Props extends PaymentConfigFilters {}
