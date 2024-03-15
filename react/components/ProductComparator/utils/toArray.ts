export const toArray = (obj: object) => {
    if (typeof obj !== 'object' || obj === null) {
        return [];
    }
    return Object.values(obj);
}