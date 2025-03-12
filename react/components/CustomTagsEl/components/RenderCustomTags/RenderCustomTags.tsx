import React from "react";
import { ConfigGroup } from "../../../../typings/config";
import CustomTags from "./CustomTags";
import { checkVisibility } from "../../utils/checkVisibility";

interface RenderCustomTagsProps {
    tagArray: ConfigGroup[];
    visibility: 'pdp' | 'productSummary';
}

const RenderCustomTags = ({
    tagArray,
    visibility
}: RenderCustomTagsProps) => {

    return (
        <div className={`flex items-center`} style={{ gap: '10px', margin: '9px 0 9px 0' }}>
            {tagArray?.map((tag, index) => {
                if (!checkVisibility(tag, visibility)) return null;

                return (
                    <CustomTags key={index} tag={tag} />
                );
            })}
        </div>
    )
};

export default RenderCustomTags;
