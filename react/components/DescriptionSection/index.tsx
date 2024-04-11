import React, { useState } from "react";
import { useProduct } from "vtex.product-context";
import { useDevice } from "vtex.device-detector";
import { DesktopDescription } from "./Desktop/DesktopDescription";
import { MobileDescription } from "./Mobile/MobileDescription";

interface DescriptionSectionProps {
    titleDescription: string;
    titleSpecification: string;
    buttonTextViewMore: string;
    buttonTextSeeLess: string;
}

const DescriptionSection = ({
    titleDescription,
    titleSpecification,
    buttonTextViewMore,
    buttonTextSeeLess,
}: DescriptionSectionProps) => {
    const productContext = useProduct();
    const { isMobile } = useDevice();
    const [showViewMore, setShowViewMore] = useState<boolean>(false);

    const description = productContext?.product?.description;

    const specificationGroups =
        productContext?.product?.specificationGroups ?? [];

    const allSpecifications = specificationGroups.find(
        (spec) => spec.originalName == "allSpecifications"
    )?.specifications;

    const showAlls = () => {
        setShowViewMore(!showViewMore);
    };

    return isMobile ? (
        <MobileDescription
            titleDescription={titleDescription}
            titleSpecification={titleSpecification}
            description={description}
            allSpecifications={allSpecifications}
        />
    ) : (
        <DesktopDescription
            titleDescription={titleDescription}
            titleSpecification={titleSpecification}
            buttonTextViewMore={buttonTextViewMore}
            buttonTextSeeLess={buttonTextSeeLess}
            allSpecifications={allSpecifications}
            description={description}
            showViewMore={showViewMore}
            showAlls={showAlls}
        />
    );
};

DescriptionSection.schema = {
    title: "DescriptionSection",
};

export default DescriptionSection;
