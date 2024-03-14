import React, { useEffect, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from "vtex.product-context";
import styles from "./styles.css";

interface HideMiddleProductPageProps {
    categorys: string[];
}

interface HideCategoryTree {
    id: string;
    name: string;
    href: string;
}

const GetProductCategorys = (categoryTree: HideCategoryTree[]) => {
    return categoryTree.map((category) => Number(category.id));
};

const HideMiddleProductPage = ({ categorys }: HideMiddleProductPageProps) => {
    const productContext = useProduct();
    console.log(productContext);
    const [productInfoLoaded, setProductInfoLoaded] = useState(false);

    useEffect(() => {
        if (productContext?.product?.categoryTree) {
            setProductInfoLoaded(true);
        }
    }, [productContext]);

    const productCategorys = GetProductCategorys(
        productContext?.product?.categoryTree || []
    );

    const shouldHideMiddlePage = !productCategorys.some((category) =>
        categorys.includes(category.toString())
    );

    if (canUseDOM && productInfoLoaded) {
        const container = document.querySelector(
            ".vtex-flex-layout-0-x-flexRowContent--product-main"
        );

        if (container) {
            const children = container.children;
            const childBeforeLast = children[children.length - 2];
            const firstChild = children[0];

            if (
                shouldHideMiddlePage &&
                childBeforeLast instanceof HTMLElement &&
                firstChild instanceof HTMLElement
            ) {
                childBeforeLast.classList.add(styles.HideClass);
                firstChild.classList.add(styles.ChangeWidth);
            }
        }
    }

    return <></>;
};

export { HideMiddleProductPage };
