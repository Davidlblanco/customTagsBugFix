export const fetchData = async (accountName, referenceValue) => {
    try {
        console.log("accountName dentro de fetchData:", accountName);
        console.log("referenceValue dentro de fetchData:", referenceValue);

        const response = await fetch(`https://api-omstst.simanscs.com/consultas-janis/stock/${referenceValue}`);

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

        const filteredResult =
            accountName === "simanqa"
                ? {
                      ...result.body,
                      stock: result.body.stock.filter((item) => {
                          console.log("Verificando loc:", item.loc);
                          return item.loc.startsWith("1");
                      }),
                  }
                : result.body;

        console.log("Filtered stock:", filteredResult.stock);

        return filteredResult;
    } catch (error) {
        throw new Error(error.message);
    }
};
