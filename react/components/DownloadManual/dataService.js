export const fetchData = async (accountName, referenceValue) => {
    try {
        console.log("accountName dentro de fetchData:", accountName);
        console.log("referenceValue dentro de fetchData:", referenceValue);

        const url = `https://manual--simanqa.myvtex.com/_v1/documents/files/${encodeURIComponent(
            referenceValue
        )}`;
        console.log("url enviado", url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("La respuesta de la red no fue correcta");
        }

        const result = await response.json();

        console.log("JSON recibido:", result);

        const filteredFiles = result.files
            .filter((file) => file.displayName === referenceValue)
            .map((file, index) => {
                const manualNumber = (index + 1).toString().padStart(2, "0"); // Asegurar que el número tenga 2 dígitos
                return {
                    ...file,
                    displayName: `Manual ${manualNumber}`,
                };
            });

        const filteredResult = {
            files: filteredFiles,
        };

        console.log("JSON filtrado:", filteredResult);

        return filteredResult;
    } catch (error) {
        console.error("Error al consumir el servicio:", error);
        throw error;
    }
};
