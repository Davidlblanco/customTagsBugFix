import React from "react";
import useProductPayments from "../Cuotas/hooks/useProductPayments";
import { formatTags } from "./utils/formatTags";

const TagsCoutas = () => {
    const { bestPayment } = useProductPayments({
        paymentIds: [],
    });

    const formattedTags = formatTags(bestPayment?.tagsCuotas);

    return (
        <div
            className="flex items-center flex-wrap pb3"
            style={{ gap: "6px" }}
        >
            {formattedTags &&
                formattedTags?.map(({ tag, tagStyle }, index) => (
                    <div
                        key={index}
                        className="flex items-center"
                        style={{ gap: "6px" }}
                    >
                        {tag?.tagText && (
                            <div style={tagStyle}>
                                {tag.tagText}
                            </div>
                        )}
                        {tag?.tagImage?.url && (
                            <img
                                src={tag.tagImage.url}
                                alt="Tag"
                                style={{
                                    maxWidth: "20px",
                                    maxHeight: "20px"
                                }}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
};

export default TagsCoutas;