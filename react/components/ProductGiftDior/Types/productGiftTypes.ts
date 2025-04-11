export interface ProductGiftsQueryResponse {
    product: {
        items: ProductGiftsQueryResponseItem[];
    };
}

interface ProductGiftsQueryResponseItem {
    itemId: string;
    sellers: ProductGiftsQueryResponseSeller[];
}

interface ProductGiftsQueryResponseSeller {
    commertialOffer: {
        gifts: Gift[];
    };
}

export interface Gift {
    productName: string;
    brand: string;
    linkText: string;
    description: string;
    skuName: string;
    images: GiftImage[];
}

interface GiftImage {
    imageUrl: string;
    imageLabel: string;
    imageText: string;
}
