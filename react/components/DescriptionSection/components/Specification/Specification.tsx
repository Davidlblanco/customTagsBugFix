import React from "react";

import style from './styles.css'

export type Item = {
    name: string;
    values: string[];
}

interface SpecificationProps {
    title: string;
    items: Item[];
    showViewMore: boolean;
}

const Specification = ({
    title,
    items,
    showViewMore
}: SpecificationProps) => {
    
    return (
        <>
            {items && items?.length > 0 && (
                <div className={`${style.containerSpecification}`}>
                    <div className={style.wrapTitle}>
                        <h3 className={style.title}>{title}</h3>
                    </div>
                    <ul className={`${style.wrapList} ${showViewMore ? style.wrapListMobile : ''} `}>
                        {items?.map(({ name, values }: Item) => (
                            <li className={`${style.listItem}`}>
                                <span className={style.itemName}>{name}</span>
                                <span className={style.itemValue}>{values}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Specification;