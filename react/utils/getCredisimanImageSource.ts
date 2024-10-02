import VisaCredisimanSVG from "./CredisimanImage/credisiman-visa.svg";
import DefaultCredisimanSVG from "./CredisimanImage/credisiman-default.svg";

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
    "simancrc",
    "simaninstorecr",
    "simanqacr",
    "simanqainstorecr",
];

function getImageSource(countryAccount: string) {
    const isVisaCredisiman =
        credisimanVisaCountriesList.includes(countryAccount);

    const imageSource = isVisaCredisiman
            ? `${VisaCredisimanSVG}`
            : `${DefaultCredisimanSVG}`;

    return imageSource;
}



export default getImageSource;