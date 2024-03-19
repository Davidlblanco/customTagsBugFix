import { GetCountry } from "../Logic/ShippingPreviewLogic";

export const GetCountryDefaultGeoCoordinates = () => {
    const EL_SALVADOR_COORDINATES = [-88.91666666, 13.83333333];
    const GUATEMALA_COORDINATES = [-90.5068824, 14.6349149];
    const NICARAGUA_COORDINATES = [-86.2361744, 12.1149926];
    const COSTA_RICA_COORDINATES = [-84.14615189999999, 9.920695];

    switch (GetCountry()) {
        case "SLV":
            return EL_SALVADOR_COORDINATES;
        case "GTM":
            return GUATEMALA_COORDINATES;
        case "NIC":
            return NICARAGUA_COORDINATES;
        case "CRI":
            return COSTA_RICA_COORDINATES;
        default:
            console.error("Country not supported, GetPickUpPoints");
            return [];
    }
};

export const GetCountryDefaultPostalCode = () => {
    const EL_SALVADOR_POSTAL_CODE = "01101";
    const GUATEMALA_POSTAL_CODE = "01001";
    const NICARAGUA_POSTAL_CODE = "11001";
    const COSTA_RICA_POSTAL_CODE = "10101";

    switch (GetCountry()) {
        case "SLV":
            return EL_SALVADOR_POSTAL_CODE;
        case "GTM":
            return GUATEMALA_POSTAL_CODE;
        case "NIC":
            return NICARAGUA_POSTAL_CODE;
        case "CRI":
            return COSTA_RICA_POSTAL_CODE;
        default:
            return console.error(
                "Country not supported, GetCountryDefaultPostalCode"
            );
    }
};
