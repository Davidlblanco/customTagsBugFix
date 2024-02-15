import { getPromotions } from "../Api/promotions";
import { CredisimanType, CredisimanStorage} from "../Types/credisimanTypes";
import { getWithExpiry, setWithExpiry } from "../Cache/crediSimanCache";
import { minutesToExpiryCache  } from "../Config/constants";

let mutex = false;

export const GetCrediSimanProductData = async (
   productId: string | undefined,
   skuId: string | undefined,
   sellerId: string | undefined
): Promise<CredisimanType | undefined> => {
   while (mutex) {
      await new Promise((resolve) => setTimeout(resolve, 10));
   }
   mutex = true;

   const credisimanStorage : CredisimanStorage | undefined = getWithExpiry("products");
   const allProductsData = credisimanStorage?.value || {}
   const productDataInCache = allProductsData[skuId ?? ""];

   if (!productDataInCache) {
      const newProductData = await fetchProductData({ productId, skuId, sellerId });

      if (newProductData) {
         allProductsData[skuId ?? ""] = newProductData;
         CalculateNominalDiscount(newProductData);
         
         const expiryTime = credisimanStorage?.remainingMillisecondsExpire ?? (minutesToExpiryCache * 60 * 1000);
         setWithExpiry("products", allProductsData, expiryTime); 

         mutex = false;
         return newProductData; // Return the new product data from the API
      }
   } else {
      CalculateNominalDiscount(productDataInCache);

      mutex = false;
      return productDataInCache; // Return the product data from the cache instead of fetching it from the API
   }

   mutex = false;
   return undefined;
};

const fetchProductData = async ({
   productId,
   skuId,
   sellerId,
}: {
   productId: string | undefined;
   skuId: string | undefined;
   sellerId: string | undefined;
}) => {
   return await getPromotions({ productId, skuId, sellerId });
};

const CalculateNominalDiscount = (productData: CredisimanType) => {
   if (productData?.method === "nominal") {
      const totalValue = productData.totalWithDiscount + productData.discountValue;
      const value = 1 - productData.totalWithDiscount / totalValue;
      const percentageValue = Math.round(value * 100);
      productData.discountValue = percentageValue;
   }
};
