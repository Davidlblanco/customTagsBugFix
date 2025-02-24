import React from "react";
import { AvailablePaymentConfigsContextProvider } from "./contexts/AvailablePaymentConfigsContext";
import { GenericTagsContextProvider } from "./contexts/GenericTagsContext";
import { CustomTagConfigsContextProvider } from "./contexts/CustomTagsConfigsContext";
import { QuickViewContextProvider } from "./contexts/QuickViewContext";

export default function CustomContext({ children }) {
    return (
        <CustomTagConfigsContextProvider>
          <AvailablePaymentConfigsContextProvider>
              <GenericTagsContextProvider>
                <QuickViewContextProvider>
                    {children}
                </QuickViewContextProvider>
              </GenericTagsContextProvider>
          </AvailablePaymentConfigsContextProvider>
        </CustomTagConfigsContextProvider>
    );
}
