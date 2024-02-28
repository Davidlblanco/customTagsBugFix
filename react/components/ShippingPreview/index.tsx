import React from "react";
import { Container } from "./Container";
import { TabProvider } from "./Context/shippingPreviewContext";

const ShippingPreview = ({ children }) => {
    return (
        <TabProvider>
            <Container>{children}</Container>
        </TabProvider>
    );
};

export { ShippingPreview };
