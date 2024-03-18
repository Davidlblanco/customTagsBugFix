import { Item, OrganizedProperties } from '../types/ProductComparator';
import { getMissingAndExistingItems } from './getMissingAndExistingItems';

export const reorganizeProperties = (data: Item[][]): OrganizedProperties => {
    const dataValues = getMissingAndExistingItems(data);
    const OrganizedProperties: OrganizedProperties = {};

    for (const product of dataValues) {
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