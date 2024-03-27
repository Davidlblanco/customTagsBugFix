import React from "react";
import { SellerNamePDP } from "./ProductPage/SellerNamePDP";
import { SellerNameShelf } from "./Shelf/SellerNameShelf";

interface SellerNameProps {
    isForShelf: boolean;
}

const SellerName = ({ isForShelf = false }: SellerNameProps) => {
    return <>{isForShelf ? <SellerNameShelf /> : <SellerNamePDP />}</>;
};

export { SellerName };
