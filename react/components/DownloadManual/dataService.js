export const fetchData = async (accountName, referenceValue) => {
    try {
        const BASE_PATH = `https://manual2025--${accountName}.myvtex.com/_v1/documents/files/`;

        const url = `${BASE_PATH}${encodeURIComponent(referenceValue)}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error("Error en la respuesta de la red:", response.status, response.statusText);
            return { files: [] };
        }

        const result = await response.json();

        const filteredFiles = result.files
            .filter((file) => file.displayName === referenceValue)
            .map((file, index) => {
                const manualNumber = (index + 1).toString().padStart(2, "0");
                return {
                    ...file,
                    displayName: `Manual ${manualNumber}`,
                };
            });

        const filteredResult = {
            files: filteredFiles,
        };

        return filteredResult;
    } catch (error) {
        console.error("Error al consumir el servicio:", error);
        return { files: [] };
    }
};
