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

export function getBestPayment(data: PaymentResult[], interestRate?: boolean): PaymentResult | null {
    return data.reduce((prev: PaymentResult | null, current) => {
        if (!current.isValid || current.installments.length === 0) return prev;

        const filteredInstallments = current.installments.filter(inst =>
            interestRate === undefined || inst.interestRate === interestRate
        );

        if (filteredInstallments.length === 0) return prev;

        const bestInstallment = filteredInstallments.reduce((prevInst, currInst) =>
            currInst.installment > prevInst.installment ? currInst : prevInst
        );

        if (!prev || bestInstallment.installment > (prev.bestInstallment?.installment || 0)) {
            return { ...current, bestInstallment };
        }

        return prev;
    }, null);
}

interface Props extends PaymentConfigFilters { }