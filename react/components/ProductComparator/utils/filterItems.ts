import { Item } from '../types/ProductComparator';


export const filterItems = (propertiesProductSeen: Item[], items: Item[][]): Item[][] => {
    const filteredItems: Item[][] = [];

    for (const item of items) {
        let matched = true;
        let filteredItem: Item[] = [];

        for (const property of item) {
            if (propertiesProductSeen.find(prop => prop.name === property.name)) {
                filteredItem.push(property);
            }
        }

        for (const property of propertiesProductSeen) {
            if (!filteredItem.filter(prop => prop.name === property.name)) {
                matched = false;
                break;
            }
        }

        if (matched) {
            filteredItems.push(filteredItem);
        }
    }

    return filteredItems;
}