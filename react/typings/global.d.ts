/* eslint-disable import/no-nodejs-modules */

interface CheckoutSimulation {
    country: string;
    postalCode: string;
    items: CheckoutSimulationItem[];
}

interface Window {
    SYNDI: any;
    __RUNTIME__?: {
        account?: string;
    };
}

interface CheckoutSimulationItem {
    quantity: string;
    id: string;
    seller?: string;
}

interface SellersItems {
    logisticsInfo: LogisticsInfo[];
    items: Item[];
}

interface Item {
    id: string;
    requestIndex: number;
    quantity: number;
    seller: string;
    sellerChain?: string[] | null;
    tax: number;
    priceValidUntil: string;
    price: number;
    listPrice: number;
    rewardValue: number;
    sellingPrice: number;
    offerings?: null[] | null;
    priceTags?: null[] | null;
    measurementUnit: string;
    unitMultiplier: number;
    parentItemIndex?: null;
    parentAssemblyBinding?: null;
    availability: string;
    catalogProvider: string;
    bestShippingOffer: Sla;
}

interface LogisticsInfo {
    itemIndex: number;
    addressId?: null;
    selectedSla?: null | string;
    selectedDeliveryChannel?: null;
    quantity: number;
    shipsTo?: string[] | null;
    slas: Sla[];
    deliveryChannels?: DeliveryChannels[] | null;
}

interface Sla {
    id: string;
    deliveryChannel: string;
    name: string;
    deliveryIds?: DeliveryIdsEntity[] | null;
    shippingEstimate: string;
    shippingEstimateDate?: null;
    lockTTL?: null;
    availableDeliveryWindows?: null[] | null;
    deliveryWindow?: null;
    price: number;
    listPrice: number;
    tax: number;
    pickupStoreInfo: PickupStoreInfo;
    pickupPointId?: null;
    pickupDistance: number;
    polygonName?: null;
    transitTime: string;
}
interface DeliveryChannels {
    id: string;
}

interface Sellers {
    keys(o: {}): Seller;
}

interface Seller {
    SellerId?: string;
    Name?: string;
}

interface RulesResult {
    matched: number[];
    operator: string;
    ruleValue: number[];
    type: string;
    unmatched: any[];
    valid: boolean;
    value: number;
}

interface ProductInformation {
    key: string;
    value: string;
}

interface SelectedItem {
    SkuId: number;
    SkuName: string;
    SkuEan: string;
    SKUReferenceCode: string;
    ImageURL: string;
}

interface BestPayment {
    installment: number;
    installmentPrice: number;
    rulesResults: RulesResult[];
    valid: boolean;
}

interface AlgoliaProductContext {
    brand: string;
    captionLink: string;
    image: string;
    loading: boolean;
    link: string;
    navigate: (options: any) => void;
    onAddToCart: () => void;
    onChangeSku: (e: any, sku: any) => void;
    price: {
        availability: string;
        listPrice: number;
        price: number;
    };
    brandId: number;
    properties: {
        name: string;
    }[];
    categoryTree: {
        id: string;
        name: string;
    }[];
    productClusters: {
        id: string;
        name: string;
    }[];
    categoryId: string[];
    items: {
        itemId: string;
        sellers: { sellerId: string }[];
    }[];
    productInformation: ProductInformation[];
    productName: string;
    selectedItem: SelectedItem;
    skuId: number;
    variations: any[];
}
interface QuickViewApi {
    id: string;
    isActive: boolean;
    createdAt: string;
    category: {
        id: string;
        name: string;
        children?: {
            id: string;
            name: string;
        }[];
    };
}
