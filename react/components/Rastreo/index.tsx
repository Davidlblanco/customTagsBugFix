import React from "react";
import { Main } from "./Main/Main";
import { PageContextProvider } from "./Context/PageContext";

const Rastreo = () => {
    return (
        <PageContextProvider>
            <Main />
        </PageContextProvider>
    );
};

export { Rastreo };
