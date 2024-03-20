import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from "vtex.product-context";

interface ProductInformationWrapperProps {
    categorysWhereMiddleAppear: string[];
    ProductLeft: React.ComponentType;
    ProductMiddle: React.ComponentType;
    ProductRight: React.ComponentType;
}

interface CategoryTree {
    id: string;
    name: string;
    href: string;
}

const ProductInformationWrapper: FunctionComponent<
    ProductInformationWrapperProps
> = ({
    ProductLeft,
    ProductMiddle,
    ProductRight,
    categorysWhereMiddleAppear,
}) => {
    const productContext = useProduct();
    const [productInfoLoaded, setProductInfoLoaded] = useState(false);

    useEffect(() => {
        if (productContext?.product?.categoryTree) {
            setProductInfoLoaded(true);
        }
    }, [productContext?.product?.categoryTree]);

    const productsSpecifications = productContext?.product?.specificationGroups;
    const allSpecifications = productsSpecifications?.find(
        (specification) => specification.originalName === "allSpecifications"
    );

    const GetProductCategorys = useCallback((categoryTree: CategoryTree[]) => {
        return categoryTree.map((category) => Number(category.id));
    }, []);

    const productCategorys = GetProductCategorys(
        productContext?.product?.categoryTree || []
    );

    const shouldShowMiddlePage =
        categorysWhereMiddleAppear && categorysWhereMiddleAppear.length > 0
            ? productCategorys.some((category) =>
                  categorysWhereMiddleAppear.includes(category.toString())
              )
            : allSpecifications && allSpecifications.specifications.length > 0;

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
