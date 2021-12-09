export const GetProductInfo = async (id: string | null | undefined) => {
    const url = `/api/catalog_system/pub/products/search?fq=productId:${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    const fetchRequest = await fetch(url, options);
    return fetchRequest.json();
};
