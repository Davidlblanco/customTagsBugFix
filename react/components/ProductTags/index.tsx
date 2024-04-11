import React from "react";
import { useProduct } from "vtex.product-context";
import style from "./styles.css";
import { TagsContent } from "./config/content";
import { propertyId } from "./config/const";

const generateTag = (listTagsID: string[]) => {
    const tagsElements = listTagsID.map((tagId) => {
        const tagContent = TagsContent.find(
            (tagContent) => tagContent.id == tagId
        );

        return (
            <div
                style={{
                    background: tagContent?.backgroundColor,
                    color: tagContent?.textColor,
                }}
                className={style["tag-content"]}
            >
                {tagContent?.text}
            </div>
        );
    });

    return <div className={style["tags-wrapper"]}>{tagsElements}</div>;
};

const ProductTags = () => {
    const productContextValue = useProduct();
    const productProperties = productContextValue?.product?.properties;
    const listTagsID = productProperties?.find(
        (prop) => prop.name.toLocaleLowerCase() === propertyId
    )?.values;

    if (!listTagsID) return <> </>;

    const tagsElement = generateTag(listTagsID);

    return tagsElement;
};

export { ProductTags };
