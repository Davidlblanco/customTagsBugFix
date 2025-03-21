import React, { FunctionComponent } from "react";
interface ProductInformationWrapperProps {
    categoriesWhereMiddleAppear: string[];
    ProductLeft: React.ComponentType;
    ProductMiddle: React.ComponentType;
    ProductRight: React.ComponentType;
}

const ProductInformationWrapper: FunctionComponent<ProductInformationWrapperProps> = ({
    ProductLeft,
    ProductMiddle,
    ProductRight,
}) => {
    return (
        <>
            <ProductLeft />
            <ProductMiddle />
            <ProductRight />
        </>
    );
};

export { ProductInformationWrapper };
