export const SlasTranslator = (text: string) => {
    const unitMap = {
        h: "hora",
        d: "día",
        w: "week"
        // Add more units as needed
    };

    const regex = /^(\d+)([hdw])$/;
    const match = regex.exec(text);

    if (match) {
        const quantity = match[1];
        const unit = match[2];

        const unitDescription = unitMap[unit];

        if (unitDescription) {
            const plural = quantity !== "1" ? "s" : "";
            return `${quantity} ${unitDescription}${plural} hábile${plural}`;
        }
    }

    return text;
};
