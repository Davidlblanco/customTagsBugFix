import React from "react";
import useProductPayments from "../Cuotas/hooks/useProductPayments";
import formatTags from "./utils/formatTags";

import style from "./styles.css";

const TagsCuotas = () => {
    const { results } = useProductPayments({
        paymentIds: [],
    });

    const allValidTags = results
        .filter((payment) => payment.isValid)
        .flatMap(
            (payment) =>
                payment.tagsCuotas?.find(
                    (c) =>
                        c.months.value === payment.bestInstallment?.installment
                ) ?? []
        )
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

export default TagsCuotas;
