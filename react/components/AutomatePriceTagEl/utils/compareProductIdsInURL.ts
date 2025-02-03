export function compareProductIdsInURL(url1: string | undefined, url2: string | undefined) {
    const searchProductIdInURL = (text: string) => {
        const parts = text?.split('-');
        let lastPart = parts.slice(-1)[0];
        const regex = /(\d+)(?=\/p)/;
        const match = lastPart.match(regex);

        if (match) {
            const id = match[1];
            return id
        }

        return "";
    }

    const path1 = searchProductIdInURL(url1 ?? "");
    const path2 = searchProductIdInURL(url2 ?? "");

    return path1 === path2;
}