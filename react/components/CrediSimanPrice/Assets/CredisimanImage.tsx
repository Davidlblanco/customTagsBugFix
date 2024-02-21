import React from "react";
import VisaCredisimanSVG from "./credisiman-visa.svg";
import DefaultCredisimanSVG from "./credisiman-default.svg";
import { credisimanVisaCountriesList } from "../Config/constants";

interface CredisimanImageProps {
    countryAccount: string;
}

const CredisimanImage = (props: CredisimanImageProps) => {
    const { countryAccount } = props;

    const isVisaCredisiman = credisimanVisaCountriesList.includes(
        countryAccount
    );

    const imageSource = isVisaCredisiman
        ? `${VisaCredisimanSVG}`
        : `${DefaultCredisimanSVG}`;

    return <img src={imageSource} />;
};

export default CredisimanImage;
