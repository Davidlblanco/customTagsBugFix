export interface InputOptions {
    value: string | number;
    label?: string;
}

export type KeyValue = {
    [key: string]: unknown | undefined;
};

export interface PaymentConfig {
    id?: string;
    paymentId: string;
    BankTypes: BankType[];
    conditions: PaymentMethodCondition[];
    sellerCondition: PaymentSellerCondition;
    tagCuotas: TagCuotasValues[];
}

export interface TagCuotasValues {
    id?: string;
    active: boolean;
    bank: BankValues;
    months: MonthsValues;
    tag: TagValues;
    deadlineTag?: DeadlineTagValues;
}

export type TagValues = {
    tagText?: string;
    tagDesign?: TagDesignValues;
    tagImage?: TagImageValues;
};

export type BankValues = {
    id?: string;
    value?: string;
    label?: string;
};

export type MonthsValues = {
    id: string;
    value: number;
    label: string;
};

export type TagImageValues = {
    name: string;
    url?: string;
};

export type DeadlineTagValues = {
    noEndDate: boolean;
    startDate: Date | string | undefined;
    endDate?: Date | string | undefined;
};

export type TagDesignValues = {
    [key: string]: string;
};

export interface PaymentMethodSettings {
    paymentType: PaymentMethodType;
    paymentId: string;
    name: string;
    renderAlongside?: string;
    paymentLabel?: string;
}

export type PaymentMethodType = "customForm" | "nativeForm" | "shortcutForm";

export interface PaymentConfigCondition {
    id?: string;
    installment: number;
    rules: PaymentConfigRule[];
    rulesOperator: RulesOperator;
    deadLine: boolean;
    noEndDate: boolean;
    startDate: Date | string | undefined;
    endDate: Date | string | undefined;
}

export interface PaymentSellerCondition {
    statements?: ConditionStatement[];
    operator?: RulesOperator;
}

export type RulesOperator = "all" | "any";
export type RuleOperatorValue = "=";

export interface PaymentConfigRule<T = unknown> {
    id: string;
    type: RuleType;
    operator: RuleOperatorValue;
    value: T;
}

export type RuleType = "minimum_price" | "sku_category" | "sku_brand" | "sku_id" | "simanpro" | "sku_collection";

export interface SellerInfo {
    SellerId: string;
    Name: string;
}

export interface ConditionStatement {
    subject: string;
    verb: "=" | "!=";
    object?: unknown;
    error?: string;
}

export interface BankType {
    id?: string;
    name?: string;
}

export interface TagsStyles {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
    color?: string;
    fontSize?: string;
}

interface GenericTagsApi {
    tagIsActive: boolean;
    tagsImgs: Array<{
        paymentId: string;
        id: string;
        value: string;
        path: string;
    }>;
    styles: Styles[];
    tagInformation: {
        id: string;
        value: string;
    };
}

type Styles = {
    id: string;
    value: string;
};

interface GenericTagsFront {
    tagIsActive: boolean;
    tagsImgs: Array<{
        paymentId: string;
        id: string;
        value: string;
        path: string;
    }>;
    styles: TagsStyles;
    tagInformation: {
        id: string;
        value: string;
    };
}
