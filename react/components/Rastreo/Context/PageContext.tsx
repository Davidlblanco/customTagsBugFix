import React, {
    createContext,
    useMemo,
    useState,
    ReactNode,
    Dispatch
} from "react";

export const PageContext = createContext({} as any);

type ContextProps = {
    children: ReactNode;
};

type CurrentPage = "InputPage" | "StatusPage";

interface PageContextProps {
    isInputPage: boolean;
    setPage: Dispatch<CurrentPage>;
    order: string;
    setMockOrderData: Dispatch<any>;
    setOrder: Dispatch<string>;
    setLoading: Dispatch<boolean>;
    loading: boolean;
    vtexOrderData: any;
    setVtexOrderData: any;
    isVtexOrder: boolean;
    setIsVtexOrder: Dispatch<boolean>;
}

const PageContextProvider = (props: ContextProps) => {
    const [page, setPage] = useState<CurrentPage>("InputPage");
    const [order, setOrder] = useState("");
    const [loading, setLoading] = useState(false);
    const [isVtexOrder, setIsVtexOrder] = useState(false);
    const [vtexOrderData, setVtexOrderData] = useState<any>();
    const [mockOrderData, setMockOrderData] = useState<any>({});

    const isInputPage = page === "InputPage";

    const ctx: PageContextProps = useMemo(
        () => ({
            setPage,
            isInputPage,
            order,
            setOrder,
            mockOrderData,
            setMockOrderData,
            setVtexOrderData,
            vtexOrderData,
            setLoading,
            loading,
            isVtexOrder,
            setIsVtexOrder
        }),
        [
            setPage,
            isInputPage,
            order,
            setOrder,
            mockOrderData,
            setMockOrderData,
            vtexOrderData,
            setVtexOrderData,
            setLoading,
            loading,
            isVtexOrder,
            setIsVtexOrder
        ]
    );
    return (
        <PageContext.Provider value={ctx}>
            {props.children}
        </PageContext.Provider>
    );
};

const usePageContext = () => {
    const context = React.useContext(PageContext);
    if (context === undefined) {
        throw new Error(
            "usePageContext must be used within a PageContextProvider"
        );
    }
    return context;
};

export { PageContextProvider, usePageContext };
