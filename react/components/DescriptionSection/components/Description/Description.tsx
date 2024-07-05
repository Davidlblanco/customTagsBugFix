import React from "react";
import style from "./styles.css";

interface DescriptionProps {
    title: string;
    content?: string;
}

const Description = ({ title, content }: DescriptionProps) => {
    return (
        <>
            {content && (
                <div className={`${style.containerDescription}`}>
                    <div className={style.wrapTitle}>
                        <h3 className={style.title}>{title}</h3>
                    </div>
                    <span className={`${style.description}`}>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </span>
                </div>
            )}
        </>
    );
};

export default Description;
