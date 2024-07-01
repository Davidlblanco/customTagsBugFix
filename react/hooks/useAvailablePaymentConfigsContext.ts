import { useEffect, useState } from "react";
import { PaymentConfig } from "../components/Cuotas/Types/PaymentCustom";
import axios from "axios";

interface UseAvailablePaymentConfigsData {
    availableConfigs: PaymentConfig[];
    isLoading: boolean;
}

export function useAvailablePaymentConfigs(): UseAvailablePaymentConfigsData {
    const [data, setData] = useState<UseAvailablePaymentConfigsData>({
        availableConfigs: [],
        isLoading: true,
    });

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get<PaymentConfig[]>(
                "/_v/payment-custom-config/configActives/"
            );

            setData({
                availableConfigs: req.data,
                isLoading: false,
            });
        }
        fetchData();
    }, []);

    return data;
}
