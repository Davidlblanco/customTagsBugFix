import { useMemo } from "react";
import { useIntl, defineMessages } from "react-intl";

const messages = defineMessages({
    free: {
        id: "store/price.Free"
    },
    tbd: {
        id: "store/price.TBD"
    }
});

const useFormattedPrice = (
    value: number | null,
    Symbol: string | undefined
) => {
    const intl = useIntl();

    const formattedPrice = useMemo(() => {
        if (value == null) {
            return intl.formatMessage(messages.tbd);
        }
        if (value === 0) {
            return intl.formatMessage(messages.free);
        }

        return `${Symbol} ${(value / 100)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }, [intl, value]);

    return formattedPrice;
};

export default useFormattedPrice;
