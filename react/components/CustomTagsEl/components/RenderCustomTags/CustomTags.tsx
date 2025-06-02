import React from "react";
import { ConfigGroup } from "../../../../typings/config";

interface RenderTagsProps {
    tag: ConfigGroup;
}

const CustomTags = ({ tag }: RenderTagsProps) => {
    return (
        <>
            <div className={`flex items-center tag-${tag?.customTag?.tagPosition}`} style={{ gap: "6px" }}>
                {tag?.customTag?.tagImage?.active && tag?.customTag?.tagImage?.url ? (
                    <img src={tag?.customTag?.tagImage?.url} style={{ maxWidth: "20px", maxHeight: "20px" }} />
                ) : (
                    <div
                        className={`flex items-center ${
                            tag?.customTag?.tagImage?.position == "right" ? "flex-row-reverse" : ""
                        }`}
                        style={{ gap: "6px" }}
                    >
                        {tag?.customTag?.tagImage?.url && tag?.customTag?.tagImage?.url !== "" && (
                            <img src={tag?.customTag?.tagImage?.url} style={{ maxWidth: "20px", maxHeight: "20px" }} />
                        )}
                        {tag?.name && tag?.name !== "" && (
                            <span
                                style={{
                                    ...tag?.customTag?.tagDesign,
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                                    lineHeight: 0,
                                    padding: "10px",
                                }}
                            >
                                {tag?.name}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomTags;
