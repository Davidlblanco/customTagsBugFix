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
            const pluralDia = quantity !== "1" ? "s" : "";
            const pluralPalabra = quantity !== "1" ? "es" : "";
            const businessDay = unit === "bd" ? "hábil" : "";
            return `${quantity} ${unitDescription}${pluralDia} ${businessDay}${
                businessDay !== "" ? pluralPalabra : ""
            }`;
        }
    }

    return text;
};
