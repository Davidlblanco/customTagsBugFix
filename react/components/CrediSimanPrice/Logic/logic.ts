import { CredisimanType, CredisimanStorage } from "../Types/credisimanTypes";
import { getWithExpiry, setWithExpiry } from "../Cache/crediSimanCache";
import { minutesToExpiryCache } from "../Config/constants";
import { ProductContextState } from "vtex.product-context/react/ProductContextProvider";
import { simulation } from "../Api/simulation";

let mutex = false;

export const GetCrediSimanProductData = async (
    productId: string | undefined,
    skuId: string | undefined,
    channelId: string | undefined,
    productContext: Partial<ProductContextState> | undefined
): Promise<CredisimanType | undefined> => {
    while (mutex) {
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    mutex = true;

    const credisimanStorage: CredisimanStorage | undefined =
        getWithExpiry("products");
    const allProductsData = credisimanStorage?.value ?? {};
    const productDataInCache = allProductsData[skuId ?? ""];
    const sellerId = productContext?.selectedItem?.sellers[0]?.sellerId;

    if (!productDataInCache) {
        const newProductData = await fetchProductData({
            productId,
            skuId,
            channelId,
            sellerId
        });

        if (newProductData) {
            CalculateDiscount(newProductData, productContext);
            allProductsData[skuId ?? ""] = newProductData;

            const expiryTime =
                credisimanStorage?.remainingMillisecondsExpire ??
                minutesToExpiryCache * 60 * 1000;
            setWithExpiry("products", allProductsData, expiryTime);

            mutex = false;
            return newProductData; // Return the new product data from the API
        }
    } else {
        mutex = false;
        return productDataInCache; // Return the product data from the cache instead of fetching it from the API
    }

    mutex = false;
    return undefined;
};

const CalculateDiscount = (
    productData: CredisimanType,
    productContext: Partial<ProductContextState> | undefined
) => {
    const { discountValue, method, totalWithDiscount } = productData;
    const productPrice =
        productContext?.selectedItem?.sellers[0]?.commertialOffer.ListPrice;

    if (method === "nominal" && discountValue !== 0) {
        const totalValue = totalWithDiscount + discountValue;
        const value = 1 - totalWithDiscount / totalValue;
        productData.discountValue = Math.abs(Math.round(value * 100));
    } else if (discountValue === 0) {
        if (productPrice) {
            const percent = totalWithDiscount / productPrice;
            productData.discountValue = Math.abs(
                Math.round((1 - percent) * 100)
            );
        }
    }
};

const fetchProductData = async ({
    productId,
    skuId,
    channelId,
    sellerId
}: {
    productId: string | undefined;
    skuId: string | undefined;
    channelId: string | undefined;
    sellerId: string | undefined;
}) => {
    return await simulation({ productId, skuId, channelId, sellerId });
};