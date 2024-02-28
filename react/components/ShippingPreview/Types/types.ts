export type PickupPointFiltered = {
    friendlyName: string;
    postalCode: string;
    geoCoordinates: [number, number];
    country: string;
};

export type DeliveryChildrenProps = {
    productId: string | undefined;
    simulateCart: Function;
    index: number;
};

export type PickUpCache = {
    pickUpPoint: string | undefined;
    shippingEstimate: string | undefined;
    isOptionSelected: boolean | undefined;
};

export type PickUpChildrenProps = {
    pickUpPoints: PickupPointFiltered[];
    productId: string | undefined;
    index: number;
    simulateCart: Function;
};

type Address = {
    addressType: string;
    receiverName: string | null;
    addressId: string;
    isDisposable: boolean;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    reference: string | null;
    geoCoordinates: [number, number];
};

type BusinessHour = {
    DayOfWeek: number;
    OpeningTime: string;
    ClosingTime: string;
};

type PickupPoint = {
    friendlyName: string;
    address: Address;
    additionalInfo: string | null;
    id: string;
    businessHours: BusinessHour[];
};

export type PickupPointItem = {
    distance: number;
    pickupPoint: PickupPoint;
};

interface DeliveryChannel {
    id: string;
}

export interface LogisticsInfo {
    itemIndex: number;
    addressId: string | null;
    selectedSla: string | null;
    selectedDeliveryChannel: string | null;
    quantity: number;
    shipsTo: string[];
    slas: any[]; // You can replace 'any' with a more specific type if needed
    deliveryChannels: DeliveryChannel[];
}

interface DeliveryId {
    courierId: string;
    warehouseId: string;
    dockId: string;
    courierName: string;
    quantity: number;
    kitItemDetails: any[];
}

interface PickupStoreInfo {
    isPickupStore: boolean;
    friendlyName: string;
    address: Address;
    additionalInfo: string;
    dockId: string;
}

export interface Sla {
    id: string;
    deliveryChannel: string;
    name: string;
    deliveryIds: DeliveryId[];
    shippingEstimate: string;
    shippingEstimateDate: null | string;
    lockTTL: null | string;
    availableDeliveryWindows: any[];
    deliveryWindow: null | string;
    price: number;
    listPrice: number;
    tax: number;
    pickupStoreInfo: PickupStoreInfo;
    pickupPointId: string;
    pickupDistance: number;
    polygonName: string;
    transitTime: string;
}
