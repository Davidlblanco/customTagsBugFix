import React from "react";

export type ShippingInfo = EstimativeData | Sla | undefined;

export interface ShippingContainerProps {
    icon: React.ReactElement;
    type: ShippingType;
    shippingData: ShippingInfo;
}

export enum ShippingType {
    "Retiro en Tienda" = "Retiro en Tienda",
    "Envío a domicilio" = "Envío a domicilio",
    "Entrega express" = "Entrega express",
    "Entrega programada" = "Entrega programada",
}

export interface EstimativeData {
    id: string;
    friendlyName: string;
    price: number;
    shippingEstimate: string;
    shippingEstimateDate: string | null;
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
