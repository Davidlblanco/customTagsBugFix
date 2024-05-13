import React from "react";

import { calculateSizeLines } from "../utils/calculateSizeLines";

import style from "./styles.css";

interface DescriptionProps {
    title: string;
    content: string;
    showViewMore: boolean;
}

const Description = ({ title, content, showViewMore }: DescriptionProps) => {
    const containerSize: number = calculateSizeLines(content);

    return (
        <>
            {content && (
                <div className={`${style.containerDescription}`}>
                    <div className={style.wrapTitle}>
                        <h3 className={style.title}>{title}</h3>
                    </div>
                    <span
                        style={{
                            height: showViewMore ? containerSize + 72 : 72,
                        }}
                        className={`${style.description} ${
                            showViewMore ? style.descriptionMobile : ""
                        }`}
                    >
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </span>
                </div>
            )}
        </>
    );
};

export default Description;
