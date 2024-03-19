import React, { useState } from "react";

import { useProduct } from "vtex.product-context";

import Description from "./components/Description/Description";
import Specification, { Item } from "./components/Specification/Specification";

import { calculateSizeLines } from "./components/utils/calculateSizeLines";

import style from "./styles.css";

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
    const description = productContext?.product?.description;

    const specificationGroups =
        productContext?.product?.specificationGroups ?? [];

    const allSpecifications = specificationGroups.find(
        (spec) => spec.originalName == "allSpecifications"
    )?.specifications;

    const [showViewMore, setShowViewMore] = useState<boolean>(false);

    const showAlls = () => {
        setShowViewMore(!showViewMore);
    };

    const tableSize: number = allSpecifications?.length
        ? allSpecifications?.length * 50
        : 0 * 50;
    const containerSize: number = calculateSizeLines(description as string);
    const checkValues: number =
        tableSize > containerSize ? tableSize + 115 : containerSize + 255;
    const isVisibleButton =
        (allSpecifications && allSpecifications?.length > 3) ||
        (description && description?.length > 253);

    return (
        <div className={style.wrapDescriptionSection}>
            <div
                style={{ height: showViewMore ? checkValues : 255 }}
                className={`${style.wrapContent}`}
            >
                <Description
                    title={titleDescription}
                    content={description as string}
                    showViewMore={showViewMore}
                />
                <Specification
                    title={titleSpecification}
                    items={allSpecifications as Item[]}
                    showViewMore={showViewMore}
                />
            </div>
            {isVisibleButton && (
                <button
                    className={style.button}
                    type="button"
                    onClick={() => showAlls()}
                >
                    {showViewMore ? buttonTextSeeLess : buttonTextViewMore}
                </button>
            )}
        </div>
    );
};

DescriptionSection.schema = {
    title: "DescriptionSection",
};

export default DescriptionSection;
