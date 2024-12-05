import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { canUseDOM } from "vtex.render-runtime";
import { useProduct } from "vtex.product-context";

interface ProductInformationWrapperProps {
    categoriesWhereMiddleAppear: string[];
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
    categoriesWhereMiddleAppear,
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

    const GetProductCategories = useCallback((categoryTree: CategoryTree[]) => {
        return categoryTree.map((category) => Number(category.id));
    }, []);

    const productCategories = GetProductCategories(
        productContext?.product?.categoryTree || []
    );

    const shouldShowMiddlePage =
        categoriesWhereMiddleAppear && categoriesWhereMiddleAppear.length > 0
            ? productCategories.some((category) =>
                  categoriesWhereMiddleAppear.includes(category.toString())
              )
            : allSpecifications && allSpecifications.specifications.length > 1;

    if (!shouldShowMiddlePage && canUseDOM && productInfoLoaded) {
        const containerLeft = document.querySelector(
            ".vtex-flex-layout-0-x-flexCol--main-product-left"
        ) as HTMLElement;

        const containerRight = document.querySelector(
            ".vtex-flex-layout-0-x-flexCol--main-product-right"
        ) as HTMLElement;

        if (containerLeft && containerRight) {
            containerLeft.style.width = "71%";
            containerLeft.style.marginRight = "16px";
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
