import React from "react";
import { InputPage } from "../InputPage/InputPage";
import { StatusPage } from "../StatusPage/StatusPage";
import { BreadCrumb } from "../BreadCrumb/BreadCrumb";
import { usePageContext } from "../Context/PageContext";

const Main = () => {
    const { isInputPage } = usePageContext();

    return (
        <div>
            <BreadCrumb />
            {isInputPage ? <InputPage /> : <StatusPage />}
        </div>
    );
};

export { Main };
