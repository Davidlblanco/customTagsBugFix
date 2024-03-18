import { Item } from '../types/ProductComparator';

export const getMissingAndExistingItems = (arrays: Item[][]): Item[][] => {
    const largestArray = arrays.reduce((prev, current) => {
        return prev.length > current.length ? prev : current;
    }, []);

    const missingAndExistingItems: Item[][] = arrays.map(array => {
        const missing: Item[] = [];
        largestArray.forEach(largestItem => {
            const found = array.find(item => item.name === largestItem.name);
            if (found) {
                missing.push(found);
            } else {
                missing.push({ name: largestItem.name, values: [] });
            }
        });
        return missing;
    });

    return missingAndExistingItems;
}
