import React, { FunctionComponent } from "react";
import { useProduct } from "vtex.product-context";

interface WrapperAddToCartProps {
    AddToCartWithoutSimanPro: React.ComponentType;
    AddToCartWithSimanPro: React.ComponentType;
}

const WrapperAddToCart: FunctionComponent<WrapperAddToCartProps> = ({
    AddToCartWithSimanPro,
    AddToCartWithoutSimanPro,
}) => {
    const product = useProduct();

    if (!product) return <></>;

  const isSimanProProduct = product?.product?.specificationGroups?.find((specification) => specification.originalName.toLowerCase() === 'siman pro')

    if (isSimanProProduct) return <AddToCartWithSimanPro />;

    return <AddToCartWithoutSimanPro />;
};

export default WrapperAddToCart;
