import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from "vtex.product-context";

interface ProductInformationWrapperProps {
    categorys: string[];
    ProductLeft: React.ComponentType;
    ProductMiddle: React.ComponentType;
    ProductRight: React.ComponentType;
}

interface HideCategoryTree {
    id: string;
    name: string;
    href: string;
}

const ProductInformationWrapper: FunctionComponent<
    ProductInformationWrapperProps
> = ({ ProductLeft, ProductMiddle, ProductRight, categorys }) => {
    const productContext = useProduct();
    const [productInfoLoaded, setProductInfoLoaded] = useState(false);

    useEffect(() => {
        if (productContext?.product?.categoryTree) {
            setProductInfoLoaded(true);
        }
    }, [productContext?.product?.categoryTree]);

    const GetProductCategorys = useCallback(
        (categoryTree: HideCategoryTree[]) => {
            return categoryTree.map((category) => Number(category.id));
        },
        []
    );

    const productCategorys = GetProductCategorys(
        productContext?.product?.categoryTree || []
    );

    const shouldShowMiddlePage = productCategorys.some((category) =>
        categorys.includes(category.toString())
    );

    if (!shouldShowMiddlePage && canUseDOM && productInfoLoaded) {
        const container = document.querySelector(
            ".vtex-flex-layout-0-x-flexCol--main-product-left"
        );
        if (container && container instanceof HTMLElement) {
            container.style.width = "71%";
        }
    }

    return (
        <>
            <ProductLeft />
            {shouldShowMiddlePage && <ProductMiddle />}
            <ProductRight />
        </>
    );
};

export { ProductInformationWrapper };
