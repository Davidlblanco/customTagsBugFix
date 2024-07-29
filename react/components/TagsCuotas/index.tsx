import React from "react";
import useProductPayments from "../Cuotas/hooks/useProductPayments";
import formatTags from "./utils/formatTags";

import style from "./styles.css";
import { TagCuotasValues } from "../Cuotas/Types/PaymentCustom";

const TagsCuotas = () => {
    const { results } = useProductPayments({
        paymentIds: [],
    });

    const allValidTags = results
        .filter((payment) => payment.isValid)
        .flatMap((payment) => filterHighestBankTag(payment.tagsCuotas))
        .filter(
            (tagsCuotas) => tagsCuotas !== null && tagsCuotas !== undefined
        );

    const formattedTags = formatTags(allValidTags);

    return (
        <div className={style.containerTagsCuotas}>
            {formattedTags?.map(({ tag, tagStyle }, index) => (
                <div key={index} className={style.tagsCuotas}>
                    {tag?.tagText && (
                        <div className={style.tagStyle} style={tagStyle}>
                            {tag.tagText}
                        </div>
                    )}
                    {tag?.tagImage?.url && (
                        <img
                            src={tag.tagImage.url}
                            alt="Tag cuotas"
                            className={style.tagImg}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

function filterHighestBankTag(data?: TagCuotasValues[] | null) {
    if (!data) return [];
    const resp: TagCuotasValues[] = [];

    for (const item of data) {
        const bankId = item.bank.id;
        const itemInArrayIndex = resp.findIndex((x) => x.bank.id === bankId);

        if (itemInArrayIndex === -1) {
            resp.push(item);
            continue;
        }

        const months = item.months.value;
        const monthsInArray = resp[itemInArrayIndex].months.value;
        if (months > monthsInArray) {
            resp[itemInArrayIndex] = item;
        }
    }

    return resp;
}

export default TagsCuotas;
