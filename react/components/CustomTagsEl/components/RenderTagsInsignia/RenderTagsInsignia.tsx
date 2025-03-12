import React, { CSSProperties } from "react";

import { checkVisibility } from "../../utils/checkVisibility";

import { ConfigGroup } from "../../../../typings/config";

import style from './styles.css';

interface RenderTagsInsigniaProps {
    tagArray: ConfigGroup[];
    visibility: 'pdp' | 'productSummary';
}

const RenderTagsInsignia = ({
    tagArray,
    visibility
}: RenderTagsInsigniaProps) => {
    return (
        <>
            {tagArray?.map((tag, index) => {
                if (!checkVisibility(tag, visibility)) return null;

                const positioningStyle: CSSProperties = {
                    position: 'absolute',
                    zIndex: 2,
                    top: tag.tagInsignia?.tagPosition?.positionVertical === 'top' ? '0' : tag.tagInsignia?.tagPosition?.positionVertical === 'center' ? '50%' : 'auto',
                    bottom: tag.tagInsignia?.tagPosition?.positionVertical === 'bottom' ? '0' : 'auto',
                    left: tag.tagInsignia?.tagPosition?.horizontalPosition === 'left' ? '0' : tag.tagInsignia?.tagPosition?.horizontalPosition === 'center' ? '50%' : 'auto',
                    right: tag.tagInsignia?.tagPosition?.horizontalPosition === 'right' ? '0' : 'auto',
                    transform: (tag.tagInsignia?.tagPosition?.positionVertical === 'center' ? 'translateY(-50%)' : '') + (tag.tagInsignia?.tagPosition?.horizontalPosition === 'center' ? ' translateX(-50%)' : ''),
                };

                return (
                    <div
                        key={index}
                        style={positioningStyle}
                        className={`tag-${tag?.tagInsignia?.tagPosition?.horizontalPosition}-${tag?.tagInsignia?.tagPosition?.positionVertical}`}
                    >
                        {tag.tagInsignia?.tagImage?.url && (
                            <img
                                className={style.tagsInsignia}
                                src={tag.tagInsignia.tagImage.url}
                                alt="tag-insignia"
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default RenderTagsInsignia;
