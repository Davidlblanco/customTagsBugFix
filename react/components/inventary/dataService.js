export const fetchData = async (accountName, referenceValue) => {
    try {
        let urlprd = `https://api-omsprd.simanscs.com`;
        const response = await fetch(urlprd + `/consultas-janis/stock/${referenceValue}`);

        if (!response.ok) {
            throw new Error("La respuesta de la red no fue correcta");
        }
        const result = await response.json();
        if (!result || !result.body || !result.body.stock) {
            return { stock: [] };
        }

        let filteredResult = result.body;

        // Agregando el switch para diferentes cuentas
        switch (accountName) {
            case "simanqa":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("1");
                    }),
                };
                break;
            case "simanqagt":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("2");
                    }),
                };
                break;
            case "simanqacr":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("5");
                    }),
                };
                break;
            case "simanqanicor":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("4");
                    }),
                };
                break;
            case "siman":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("1");
                    }),
                };
                break;
            case "simanguatemala":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("2");
                    }),
                };
                break;
            case "simancrc":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("5");
                    }),
                };
                break;
            case "simannicor":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        return item.loc.startsWith("4");
                    }),
                };
                break;
            default:
                // Si no coincide con ninguna cuenta, se devuelve el stock tal como está
                filteredResult = result.body;
                break;
        }

        return filteredResult;
    } catch (error) {
        throw new Error(error.message);
    }
};
