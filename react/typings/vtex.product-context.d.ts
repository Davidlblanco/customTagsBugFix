declare module "vtex.product-context/useProduct" {
    import { ItemMetadata } from "../modules/AssemblyTypings";

    export interface Attachment {
        id: string;
        name: string;
        required: boolean;
    }

    export interface SelectedItem {
        itemId: string;
        sellers: Array<{
            commertialOffer: {
                AvailableQuantity: number;
            };
        }>;
        attachments: Attachment[];
    }

    export interface Product {
        cacheId: string;
        productName: string;
        productId: string;
        description: string;
        titleTag: string;
        metaTagDescription: string;
        linkText: string;
        productReference: string;
        categoryId: string;
        categoriesIds: string[];
        categories: string[];
        categoryTree: Array<{
            id: string;
            name: string;
            href: string;
        }>;
        brand: string;
        brandId: string;
        properties: Array<{
            name: string;
            values: string;
        }>;
        specificationGroups: Array<{
            name: string;
            specifications: Array<{
                name: string;
                values: string[];
            }>;
        }>;
        items: ProductContextItem[];
        itemMetadata: {
            items: ItemMetadata[];
            priceTable: any[];
        };
    }

    const useProduct: () => ProductContext;
    export default useProduct;

    export interface ProductContext {
        selectedQuantity: number;
        product: Product | null;
        selectedItem: SelectedItem | null;
        assemblyOptions: any;
    }
}

declare module "vtex.product-context/ProductDispatchContext" {
    type DispatchFunction = (payload: { type: string; args?: unknown }) => void;
    export const useProductDispatch: () => DispatchFunction;
}
