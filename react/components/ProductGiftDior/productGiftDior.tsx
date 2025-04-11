import React, { useEffect, useState } from "react";
import useProduct from "vtex.product-context/useProduct";
import { Gift } from "./Types/productGiftTypes";
import { GiftItem } from "./Components/GiftItem/GiftItem";
import { RegaliaIcon } from "./Assets/ant-design_gift-outlined";
import iconArrowDown from "./Assets/ArrowDown.png";
import iconArrowUp from "./Assets/ArrowUp.png";
import styles from "./styles.css";
import { SearchProduct } from "../../typings/search";
import axios from "axios";

const GetCurrentProductGifts = (
    giftsData,
    selectedItemId: string | undefined
): Gift[] => {
    const selectedItemFromProductQuery = giftsData?.items?.find(
        (item) => item.itemId === selectedItemId
    );
    const sellers = selectedItemFromProductQuery?.sellers ?? [];

    const gifts = sellers.reduce(
        (acc: Gift[], curr) => acc.concat(curr.commertialOffer.ItemMetadataAttachment ?? []),
        []
    );
    const giftsExcludingSelectedItem = gifts.filter(
        (gift) => gift.id !== selectedItemId
    ).map((gift) => ({
        productName: gift.Name,
        brand: gift.BrandName,
        linkText: "",
        description: gift.NameComplete,
        skuName: gift.Name,
        images: [
            {
                imageUrl: gift.MainImage,
                imageLabel: gift.Name,
                imageText: gift.Name,
            },
        ],
    }));

    return giftsExcludingSelectedItem;
};

const ProductGiftDior = () => {
    const [gifts, setGifts] = useState<Gift[]>([]);
    const haveGifts = gifts.length > 0;

    const { product, selectedItem } = useProduct();
    const selectedItemId = selectedItem?.itemId;
    const productId = product?.productId;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    useEffect(() => {
        const fetchGifts = async () => {
            if (productId && selectedItemId) {
                const product = await getProductData(productId || "");
                const selectedItemId = selectedItem?.itemId;
                const gifts = GetCurrentProductGifts(product, selectedItemId);
                setLoading(false);
                setError(null);
                setGifts(gifts);
            }
        }
        fetchGifts().catch((err) => {
            setLoading(false);
            setError(err);
        });
    }, [productId, selectedItemId]);

    if (loading) return <div>Loading...</div>;

    if (error) {
        return <></>;
    }

    return (
        haveGifts && (
            <div className={styles.giftsContainerDior}>
                <div className={styles.titleContainerDior} onClick={toggleDropdown}>
                    <div className={styles.giftIconDior}>
                        <RegaliaIcon />
                        <span className={styles.giftTitleDior}>
                            Regalo por tu compra
                        </span>
                    </div>
                    <div className={styles.arrowDownDior} onClick={toggleDropdown}>
                        {isDropdownOpen ? (
                            <img src={iconArrowUp} alt="Arrow Up" />
                        ) : (
                            <img src={iconArrowDown} alt="Arrow Down" />
                        )}
                    </div>
                </div>
                <div className={isDropdownOpen ? styles.dropdownDiorOpen : styles.dropdownDiorClosed}>
                    <GiftItem gifts={gifts} key={productId} />
                </div>
            </div>
        )
    );
};

async function getProductData(productId: string) {
    const { data } = await axios.get<SearchProduct[]>(
        `/api/catalog_system/pub/products/search?fq=productId:${productId}`
    );
    return data[0];
}

export { ProductGiftDior };
