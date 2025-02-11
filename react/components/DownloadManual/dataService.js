export const fetchData = async (referenceValue) => {
    try {
        const BASE_PATH = `/_v1/documents/files/`;

        const url = `${BASE_PATH}${encodeURIComponent(referenceValue)}`;

        const response = await fetch(url);

        if (!response.ok) {
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
        return { files: [] };
    }
};
