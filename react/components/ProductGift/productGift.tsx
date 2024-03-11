import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import useProduct from "vtex.product-context/useProduct";
import ProductGiftsQuery from "../../graphql/productGifts.gql";
import { ProductGiftsQueryResponse, Gift } from "./Types/productGiftTypes";
import { GiftItem } from "./Components/GiftItem/GiftItem";
import styles from "./styles.css";

const GetCurrentProductGifts = (
    giftsData: ProductGiftsQueryResponse | undefined,
    selectedItemId: string | undefined
): Gift[] => {
    const selectedItemFromProductQuery = giftsData?.product.items.find(
        (item) => item.itemId === selectedItemId
    );
    const sellers = selectedItemFromProductQuery?.sellers ?? [];

    const gifts = sellers.reduce(
        (acc: Gift[], curr) => acc.concat(curr.commertialOffer.gifts ?? []),
        []
    );

    return gifts;
};

const ProductGift = () => {
    const [gifts, setGifts] = useState<Gift[]>([]);
    const haveGifts = gifts.length > 0;

    const { product, selectedItem } = useProduct();
    const selectedItemId = selectedItem?.itemId;
    const productId = product?.productId;

    const { data, loading, error } = useQuery<ProductGiftsQueryResponse>(
        ProductGiftsQuery,
        {
            variables: {
                identifier: {
                    field: "id",
                    value: productId,
                },
            },
            skip: productId == null,
        }
    );

    useEffect(() => {
        if (data) {
            const gifts = GetCurrentProductGifts(data, selectedItemId);
            setGifts(gifts);
        }
    }, [data, selectedItemId]);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    console.log(gifts);

    return (
        haveGifts && (
            <div className={styles.giftsContainer}>
                <span className={styles.giftTitle}>
                    Gratis al comprar este producto
                </span>
                {gifts?.map((gift: Gift) => (
                    <GiftItem gift={gift} key={gift.linkText} />
                ))}
            </div>
        )
    );
};

export { ProductGift };
