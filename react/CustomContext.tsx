import React from "react";
import { AvailablePaymentConfigsContextProvider } from "./contexts/AvailablePaymentConfigsContext";
import { GenericTagsContextProvider } from "./contexts/GenericTagsContext";
//import { CustomTagConfigsContextProvider } from "siman.custom-tags";

export default function CustomContext({ children }) {
    return (

        <AvailablePaymentConfigsContextProvider>
            <GenericTagsContextProvider>
                {children}
            </GenericTagsContextProvider>
        </AvailablePaymentConfigsContextProvider>

    );
}