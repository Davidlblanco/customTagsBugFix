import { useMemo } from "react";
import { useAvailablePaymentConfigs } from "../../../contexts/AvailablePaymentConfigsContext";

export default function usePaymentConfigs(filters: PaymentConfigFilters) {
    const { availableConfigs, isLoading } = useAvailablePaymentConfigs();

    const configs = useMemo(() => {
        if (!availableConfigs) return [];

        let result = availableConfigs;
        if (filters) {
            if (filters.paymentIds?.length) {
                result = result.filter((config) =>
                    filters.paymentIds?.includes(config.paymentId)
                );
            }
        }

        return result;
    }, [availableConfigs, filters]);

    return {
        configs: configs,
        isLoading,
    };
}

export interface PaymentConfigFilters {
    paymentIds?: string[];
    cachedCredisiman?: Record<number, string>;
}
