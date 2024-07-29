import React, { useEffect, useRef, useState } from "react";
import Description from "../components/Description/Description";
import Specification, { Item } from "../components/Specification/Specification";
import { ProductSpecification } from "vtex.product-context/react/ProductTypes";
import style from "./styles.css";
import calculateDescriptionSizeLines from "../components/utils/calculateDescriptionSizeLines";
import useScreenSize from "../../../hooks/useScreenSize";
import calculateSpecificationSizeLines from "../components/utils/calculateSpecificationSizeLines";

const ANIMATION_TIME = 600;
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
    const [maxHeight, setMaxHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const screenSize = useScreenSize();

    useEffect(() => {
        if (!ref.current || !showViewMore) return;

        const timeout = setTimeout(() => {
            setMaxHeight(ref.current?.clientHeight ?? 0);
        }, ANIMATION_TIME);

        return () => {
            clearTimeout(timeout);
        };
    }, [
        showViewMore,
        ref?.current,
        description,
        allSpecifications,
        screenSize.width,
    ]);

    useEffect(() => {
        const baseHeight = Math.max(
            calculateDescriptionSizeLines(description),
            calculateSpecificationSizeLines(allSpecifications)
        );
        setMaxHeight(baseHeight);
    }, [description, screenSize.width]);

    const isVisibleButton =
        (allSpecifications && allSpecifications?.length > 3) ||
        (description && description?.length > 253);

    const activeMaxHeight = showViewMore ? maxHeight : 250;

    return (
        <div className={style.wrapDescriptionSection}>
            <div
                style={{
                    maxHeight: activeMaxHeight,
                    transition: `transition: all ${ANIMATION_TIME}ms ease-in-out 0s`,
                }}
                className={`${style.wrapContent}`}
                ref={ref}
            >
                <Description title={titleDescription} content={description} />
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
