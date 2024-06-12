import React from "react";
import VisaCredisimanSVG from "./credisiman-visa.svg";
import DefaultCredisimanSVG from "./credisiman-default.svg";

// List of countries that has payment Visa Credisiman  : SV | GT
const credisimanVisaCountriesList = [
    "siman",
    "simaninstoresv",
    "simanqa",
    "simanqainstoresv",
    "simanguatemala",
    "simaninstoregt",
    "simanqagt",
    "simanqainstoregt",
];

interface CredisimanImageProps {
    countryAccount: string;
}

const CredisimanImage = (props: CredisimanImageProps) => {
    const { countryAccount } = props;

    const isVisaCredisiman =
        credisimanVisaCountriesList.includes(countryAccount);

    const imageSource = isVisaCredisiman
        ? `${VisaCredisimanSVG}`
        : `${DefaultCredisimanSVG}`;

    return <img src={imageSource} alt="Credisiman" />;
};

export default CredisimanImage;
