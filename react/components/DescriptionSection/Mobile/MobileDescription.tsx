import React from "react";
import { Accordion } from "../../Accordion/Accordion";
import { ProductSpecification } from "vtex.product-context/react/ProductTypes";
import { RenderSpecifications } from "../components/Specification/Specification";
import style from "./styles.css";

interface Props {
    titleDescription: string;
    titleSpecification: string;
    description: string | undefined;
    allSpecifications: ProductSpecification[] | undefined;
}

const MobileDescription = ({
    titleDescription,
    titleSpecification,
    description,
    allSpecifications,
}: Props) => {
    return (
        <div className={style.MobileContainer}>
            <Accordion title={titleDescription}>{description}</Accordion>
            <Accordion title={titleSpecification}>
                <ul>{RenderSpecifications(allSpecifications)}</ul>
            </Accordion>
        </div>
    );
};

export { MobileDescription };
