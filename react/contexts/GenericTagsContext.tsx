import React, { useEffect, useState } from "react";
import { GenericTagsApi } from "../components/Cuotas/Types/PaymentCustom";
import axios from "axios";

const initialData = {
    tags: null,
    isLoading: true,
};

const Context = React.createContext<ContextData>(initialData);

export function GenericTagsContextProvider({ children }: Props) {
    const [data, setData] = useState<ContextData>(initialData);
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get<GenericTagsApi>(
                "/_v/payment-custom-config/generic-tags"
            );
            setData({
                tags: req.data,
                isLoading: false,
            });
        }
        fetchData();
    }, []);
    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export function useGenericTags() {
    return React.useContext(Context);
}

interface Props {
    readonly children: React.ReactNode;
}

interface ContextData {
    tags: GenericTagsApi | null;
    isLoading: boolean;
}
