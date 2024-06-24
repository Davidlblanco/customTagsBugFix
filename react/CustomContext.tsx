import React from "react";
import { AvailablePaymentConfigsContextProvider } from "./contexts/AvailablePaymentConfigsContext";
import { GenericTagsContextProvider } from "./contexts/GenericTagsContext";
import { CustomTagsConfigContextProvider } from "siman.custom-tags";

export default function CustomContext({ children }) {
    return (
        <CustomTagsConfigContextProvider>
            <AvailablePaymentConfigsContextProvider>
                <GenericTagsContextProvider>
                    {children}
                </GenericTagsContextProvider>
            </AvailablePaymentConfigsContextProvider>
        </CustomTagsConfigContextProvider>
    );
}