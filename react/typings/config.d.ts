export interface ConfigGroup {
    id?: string;
    name: string;
    active: boolean;
    tagTemplate: 'customTagTemplate' | 'tagInsigniaTemplate';
    activeTagVisibility: ActiveTagVisibility;
    tagIncluded: TagValue;
    tagNotIncluded: TagValue;
    deadlineTag: DeadlineTag;
    customTag?: CustomTagValues;
    tagInsignia?: TagInsigniaValues;
}

export interface ConfigGroupPromotions {
    id?: string;
    name: string;
    active: boolean;
    activeTagVisibility: ActiveTagVisibility;
    customTag?: CustomTagValues;
    interestRate: number;
    totalCalculation: any;
}


export interface ActiveTagVisibility {
    productSummaryVisibility: boolean;
    productVisibility: boolean;
}

export interface CustomTagValues {
    tagDesign: TagDesign;
    tagImage: TagImage;
    tagPosition: 'top' | 'center' | 'bottom';
}

export interface TagInsigniaValues {
    tagImage: TagImageValues;
    tagPosition: TagPosition;
}

export interface TagPosition {
    positionVertical: 'top' | 'center' | 'bottom';
    horizontalPosition: 'left' | 'center' | 'right';
}

export type DeadlineTag = {
    noEndDate: boolean;
    startDate: Date | string | undefined;
    endDate: Date | string | undefined;
}

export type TagValue = {
    category: ItemTagCategory;
    [key: string]: ItemTag;
}

export type ItemTag = {
    active: boolean;
    values: string[];
}
export type ItemTagCategory = {
    active: boolean;
    values: TagCategoryProps[];
}

export type TagCategoryProps = {
    value: string;
    name: string;
    label: string;
    childrensIds: string[];
}

export type TagDesignValues = {
    [key: string]: string;
}

export type TagImageValues = {
    url?: string;
    name: string;
    active?: boolean;
    position: 'right' | 'left';
}

export interface CategoryApiInfo {
    id: number;
    name: string;
    hasChildren: boolean;
    url: string;
    children: CategoryInfo[];
    Title: string;
    MetaTagDescription: string;
}

export type CollectionApiInfo = {
    cacheId: string;
    id: number;
    name: string;
    searchable: boolean;
    highlight: boolean;
    dateFrom: string;
    dateTo: string;
    hasExpirationDate: boolean;
    status: string;
    totalProducts: number;
    description: string;
    lastEditor: string;
    type: string;
}

export interface CategoryInfo extends CategoryApiInfo {
    level: number;
    fullPath: string;
}