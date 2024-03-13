export const SlasTranslator = (text: string | undefined) => {
    if (!text) return "";

    const unitMap = {
        h: "hora",
        d: "día",
        w: "week",
        bd: "día",
        // Add more units as needed
    };

    const regex = /^(\d+)([hdw]|bd)$/;
    const match = regex.exec(text);

    if (match) {
        const quantity = match[1];
        const unit = match[2];

        const unitDescription = unitMap[unit];

        if (unitDescription) {
            const plural = quantity !== "1" ? "s" : "";
            const businessDay = unit === "bd" ? "hábile" : "";
            return `${quantity} ${unitDescription}${plural} ${businessDay}${
                businessDay !== "" ? plural : ""
            }`;
        }
    }

    return text;
};
