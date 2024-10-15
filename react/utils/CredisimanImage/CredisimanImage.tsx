import React from "react";
import getCredisimanImageSource from "../getCredisimanImageSource"

interface CredisimanImageProps {
    countryAccount: string;
}

const CredisimanImage = (props: CredisimanImageProps) => {
    const { countryAccount } = props;

    const imageSource = getCredisimanImageSource(countryAccount);

    return <img src={imageSource} alt="Credisiman" />;
};

export default CredisimanImage;
