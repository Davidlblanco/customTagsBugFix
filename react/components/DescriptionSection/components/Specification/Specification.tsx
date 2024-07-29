import React from "react";

import style from "./styles.css";

export type Item = {
    name: string;
    values: string[];
};

interface SpecificationProps {
    title: string;
    items: Item[];
    showViewMore: boolean;
}

export const RenderSpecifications = (items: Item[] | undefined) => {
    if (items && items?.length > 0) {
        return items?.map(({ name, values }: Item) => (
            <li key={name} className={`${style.listItem}`}>
                <span className={style.itemName}>{name}</span>
                <span className={style.itemValue}>{values}</span>
            </li>
        ));
    }
    return [<></>];
};

const Specification = ({ title, items, showViewMore }: SpecificationProps) => {
    return (
        <>
            {items && items?.length > 0 && (
                <div className={`${style.containerSpecification}`}>
                    <div className={style.wrapTitle}>
                        <h3 className={style.title}>{title}</h3>
                    </div>

                    <ul
                        className={`${style.wrapList} ${
                            showViewMore ? style.wrapListMobile : ""
                        } `}
                    >
                        {RenderSpecifications(items)}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Specification;
