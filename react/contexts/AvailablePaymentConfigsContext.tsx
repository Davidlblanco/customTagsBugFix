import React, { useEffect, useState } from "react";
import { PaymentConfig } from "../components/Cuotas/Types/PaymentCustom";
import axios from "axios";

const initialData = {
    availableConfigs: [],
    isLoading: true,
};

const AvailablePaymentConfigsContext =
    React.createContext<ContextData>(initialData);

export function AvailablePaymentConfigsContextProvider({ children }: Props) {
    const [data, setData] = useState<ContextData>(initialData);

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

    return (
        <AvailablePaymentConfigsContext.Provider value={data}>
            {children}
        </AvailablePaymentConfigsContext.Provider>
    );
}

export function useAvailablePaymentConfigs() {
    return React.useContext(AvailablePaymentConfigsContext);
}

interface Props {
    readonly children: React.ReactNode;
}

interface ContextData {
    availableConfigs: PaymentConfig[];
    isLoading: boolean;
}
