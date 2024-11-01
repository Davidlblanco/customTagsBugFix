import React from "react";
import { AvailablePaymentConfigsContextProvider } from "./contexts/AvailablePaymentConfigsContext";
import { GenericTagsContextProvider } from "./contexts/GenericTagsContext";
import { CustomTagConfigsContextProvider } from "./contexts/CustomTagsConfigsContext";



export default function CustomContext({ children }) {
    return (
        <CustomTagConfigsContextProvider>
            <AvailablePaymentConfigsContextProvider>
                <GenericTagsContextProvider>
                    {children}
                </GenericTagsContextProvider>
            </AvailablePaymentConfigsContextProvider>
        </CustomTagConfigsContextProvider>
    );
}
