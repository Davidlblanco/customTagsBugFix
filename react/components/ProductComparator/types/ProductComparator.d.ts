export interface ConfigGroup {
    id?: string;
    category: Category;
    active: boolean;
}

export interface Category {
    id: number;
    name: string;
    Title: string;
}