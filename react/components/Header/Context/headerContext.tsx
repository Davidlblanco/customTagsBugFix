import React, {
    createContext,
    useMemo,
    useState,
    ReactNode,
    useEffect,
} from "react";
import waitForSingleEl from "../../../utils/waitForSingleEl";

export const HeaderContext = createContext({} as any);

type ContextProps = {
    children: ReactNode;
};

interface HeaderContextProps {
    isDarkMode: boolean;
}

const HeaderContextProvider = (props: ContextProps) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const fetchBody = async () => {
            const body: Element = await waitForSingleEl("body");

            if (body?.classList.contains("vtex-dark")) {
                setIsDarkMode(true);
            } else {
                setIsDarkMode(false);
            }
        };

        fetchBody();
    }, []);

    const ctx: HeaderContextProps = useMemo(
        () => ({
            isDarkMode,
        }),
        [isDarkMode]
    );
    return (
        <HeaderContext.Provider value={ctx}>
            {props.children}
        </HeaderContext.Provider>
    );
};

const useHeaderContext = () => {
    const context = React.useContext(HeaderContext);
    if (context === undefined) {
        throw new Error(
            "useHeaderContext must be used within a HeaderContextProvider"
        );
    }
    return context;
};

export { HeaderContextProvider, useHeaderContext };
