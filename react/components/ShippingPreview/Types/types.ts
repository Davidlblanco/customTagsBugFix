import React from "react";

export interface ShippingContainerProps {
    icon: React.ReactElement;
}

export interface EstimativeData {
    estimative: string | undefined;
    cost: number | undefined;
    friendlyName: string | undefined;
    id: string | undefined;
}

export interface ShippingItem {
    itemIndex: number;
    addressId: string | null;
    selectedSla: string | null;
    selectedDeliveryChannel: string | null;
    quantity: number;
    shipsTo: string[];
    slas: Sla[];
}

export interface ShippingQuery {
    shipping: ShippingData;
}

interface ShippingData {
    logisticsInfo: LogisticsInfo[];
}

interface LogisticsInfo {
    itemIndex: string;
    slas: ShippingSLA[];
}

interface ShippingSLA {
    id: string;
    friendlyName: string;
    price: number;
    shippingEstimate: string;
    shippingEstimateDate: null | string;
}

export type PickupPointFiltered = {
    postalCode: string;
    friendlyName: string;
    geoCoordinates: [number, number];
    country: string;
};

export type PickupPointItem = {
    distance: number;
    pickupPoint: PickupPoint;
};

type PickupPoint = {
    friendlyName: string;
    address: Address;
    additionalInfo: string | null;
    id: string;
    businessHours: BusinessHour[];
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
