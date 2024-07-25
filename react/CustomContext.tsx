import React from "react";
import { AvailablePaymentConfigsContextProvider } from "./contexts/AvailablePaymentConfigsContext";
import { GenericTagsContextProvider } from "./contexts/GenericTagsContext";

export default function CustomContext({ children }) {
    return (
      <AvailablePaymentConfigsContextProvider>
        <GenericTagsContextProvider>
            {children}
        </GenericTagsContextProvider>
      </AvailablePaymentConfigsContextProvider>
    );
}
