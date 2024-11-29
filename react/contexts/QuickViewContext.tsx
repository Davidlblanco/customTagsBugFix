import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  readonly children: React.ReactNode;
}

interface ContextData {
  quickviews: QuickViewApi | null;
  isLoading: boolean;
}

const initialData = {
  quickviews: null,
  isLoading: true,
};

const Context = React.createContext<ContextData>(initialData);

export function QuickViewContextProvider({ children }: Props) {
    const [data, setData] = useState<ContextData>(initialData);
    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(
                "/_v1/admin-quickview/quickviews"
            );
            setData({
                quickviews: data,
                isLoading: false,
            });
        }
        fetchData();
    }, []);
    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export function useQuickView() {
    return React.useContext(Context);
}
