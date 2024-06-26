import React from "react";
import useProductPayments from "../Cuotas/hooks/useProductPayments";
import { formatTags } from "./utils/formatTags";

import style from './styles.css'

const TagsCoutas = () => {
    const { bestPayment } = useProductPayments({
        paymentIds: [],
    });

    const formattedTags = formatTags(bestPayment?.tagsCuotas);

    return (
        <div className={style.containerTagsCuotas}>
            {formattedTags &&
                formattedTags?.map(({ tag, tagStyle }, index) => (
                    <div
                        key={index}
                        className={style.tagsCuotas}
                    >
                        {tag?.tagText && (
                            <div
                                className={style.tagStyle}
                                style={tagStyle}
                            >
                                {tag.tagText}
                            </div>
                        )}
                        {tag?.tagImage?.url && (
                            <img
                                src={tag.tagImage.url}
                                alt={'Tag cuotas'}
                                className={style.tagImg}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
};

export default TagsCoutas;