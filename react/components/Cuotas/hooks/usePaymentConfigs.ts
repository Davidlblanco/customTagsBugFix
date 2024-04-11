import { PaymentConfig } from "../Types/PaymentCustom";
import useGet from "../../../hooks/useGet";
import { useMemo } from "react";

export default function usePaymentConfigs(filters: PaymentConfigFilters) {
    const { data, isLoading } = useGet<PaymentConfig[]>({
        url: "/_v/payment-custom-config/configActives/",
    });

    const configs = useMemo(() => {
        if (!data) return null;

        let result = data;

        // ---- Filter configs ----
        if (filters) {
            if (filters.paymentIds?.length) {
                result = result.filter((config) =>
                    filters.paymentIds?.includes(config.paymentId)
                );
            }
        }

        return result;
    }, [data, filters]);

    return {
        configs: configs ?? [],
        isLoading,
    };
}

export interface PaymentConfigFilters {
    paymentIds?: string[];
}
