export const fetchData = async (accountName, referenceValue) => {
    try {
        let urlprd = `https://api-omsprd.simanscs.com`;
        console.log("accountName dentro de fetchData:", accountName);
        console.log("referenceValue dentro de fetchData:", referenceValue);

        const response = await fetch(urlprd + `/consultas-janis/stock/${referenceValue}`);

        if (!response.ok) {
            throw new Error("La respuesta de la red no fue correcta");
        }

        const result = await response.json();

        console.log("Verificando result:", result);
        console.log("Verificando result.body.stock:", result?.body?.stock);

        if (!result || !result.body || !result.body.stock) {
            console.log("Result después de ser filtrado (sin stock):", {
                stock: [],
            });
            return { stock: [] };
        }

        let filteredResult = result.body;

        // Agregando el switch para diferentes cuentas
        switch (accountName) {
            case "simanqa":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        console.log("Verificando loc para simanqa:", item.loc);
                        return item.loc.startsWith("1");
                    }),
                };
                break;
            case "simanqagt":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        console.log("Verificando loc para simanqagt:", item.loc);
                        return item.loc.startsWith("2");
                    }),
                };
                break;
            case "simanqacr":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        console.log("Verificando loc para simanqacr:", item.loc);
                        return item.loc.startsWith("5");
                    }),
                };
                break;
            case "simanqanicor":
                filteredResult = {
                    ...result.body,
                    stock: result.body.stock.filter((item) => {
                        console.log("Verificando loc para simanqanicor:", item.loc);
                        return item.loc.startsWith("4");
                    }),
                };
                break;
            default:
                // Si no coincide con ninguna cuenta, se devuelve el stock tal como está
                filteredResult = result.body;
                break;
        }

        console.log("Filtered stock:", filteredResult.stock);

        return filteredResult;
    } catch (error) {
        throw new Error(error.message);
    }
};
