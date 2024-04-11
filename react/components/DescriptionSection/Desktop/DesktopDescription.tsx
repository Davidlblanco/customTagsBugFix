import React from "react";
import Description from "../components/Description/Description";
import Specification, { Item } from "../components/Specification/Specification";
import { calculateSizeLines } from "../components/utils/calculateSizeLines";
import { ProductSpecification } from "vtex.product-context/react/ProductTypes";
import style from "./styles.css";

interface DescriptionSectionProps {
    titleDescription: string;
    titleSpecification: string;
    buttonTextViewMore: string;
    buttonTextSeeLess: string;
    allSpecifications: ProductSpecification[] | undefined;
    description: string | undefined;
    showViewMore: boolean;
    showAlls: () => void;
}

const DesktopDescription = ({
    titleDescription,
    titleSpecification,
    buttonTextViewMore,
    buttonTextSeeLess,
    allSpecifications,
    description,
    showViewMore,
    showAlls,
}: DescriptionSectionProps) => {
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

export { DesktopDescription };
