import React from "react";

import { ConfigGroupPromotions } from "../../../typings/config";

interface RenderTagsProps {
    tag: ConfigGroupPromotions;
}

const CustomTags = ({ tag }: RenderTagsProps) => {

    return (
        <>
            <div
                className={`flex items-center tag-${tag?.customTag?.tagPosition}`}
                style={{ gap: '6px' }}
            >
                {tag?.customTag?.tagImage?.active && tag?.customTag?.tagImage?.url ? (
                    <img
                        src={tag?.customTag?.tagImage?.url}
                        style={{ maxWidth: '25px', maxHeight: '25px' }}
                    />
                ) : (
                    <div className={`flex items-center ${tag?.customTag?.tagImage?.position == 'right' ? 'flex-row-reverse' : ''}`}
                        style={{ gap: '6px' }}
                    >
                        {tag?.customTag?.tagImage?.url && tag?.customTag?.tagImage?.url !== '' && (
                            <img
                                src={tag?.customTag?.tagImage?.url}
                                style={{ maxWidth: '25px', maxHeight: '25px' }}
                            />
                        )}
                        <span style={{
                            ...tag?.customTag?.tagDesign,
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            lineHeight: 1,
                            padding: '5px'
                        }}>
                            {tag?.totalCalculation}
                        </span>
                    </div>
                )}
            </div>
        </>
    )
};

export default CustomTags;