import { Item, OrganizedProperties } from '../types/ProductComparator';

export const reorganizeProperties = (data: Item[][]): OrganizedProperties => {
    const OrganizedProperties: OrganizedProperties = {};

    for (const product of data) {
        for (const attribute of product) {
            const { name, values } = attribute;

            if (!(name in OrganizedProperties)) {
                OrganizedProperties[name] = [{ ...values }];
            } else {
                OrganizedProperties[name].push({ ...values });
            }
        }
    }

    return OrganizedProperties;
}