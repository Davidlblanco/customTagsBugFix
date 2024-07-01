import React from "react";
import { GenericTagsContextProvider } from "./contexts/GenericTagsContext";
import { CustomTagsConfigContextProvider } from "siman.custom-tags";

export default function CustomContext({ children }) {
    return (
        <CustomTagsConfigContextProvider>
            <GenericTagsContextProvider>{children}</GenericTagsContextProvider>
        </CustomTagsConfigContextProvider>
    );
}
