import React, { createContext, useContext, useState, useMemo } from "react";

// Define the type for the context value
type TabContextType<T> = {
    tabCache: Record<number, T>;
    updateTabCache: (tabIndex: number, data: T) => void;
};

const TabContext = createContext<TabContextType<any> | undefined>(undefined);

export const TabProvider: React.FC = ({ children }) => {
    const [tabCache, setTabCache] = useState<Record<number, any>>({});

    const updateTabCache = <T extends {}>(tabIndex: number, data: T) => {
        setTabCache(prevCache => ({
            ...prevCache,
            [tabIndex]: data
        }));
    };

    const contextValue = useMemo(() => ({ tabCache, updateTabCache }), [
        tabCache,
        updateTabCache
    ]);

    return (
        <TabContext.Provider value={contextValue}>
            {children}
        </TabContext.Provider>
    );
};

export function useTabContext<T>(): TabContextType<T> {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTabContext must be used within a TabProvider");
    }
    return context as TabContextType<T>;
}
