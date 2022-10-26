import React, { FC, ReactNode, useState } from "react";
import { ArrowIcon } from "./svg/arrow";
import styles from "./Accordion.css";

interface AccordionProps {
    children: ReactNode;
    accordionTitle: string;
}

const Accordion: FC<AccordionProps> = ({
    children,
    accordionTitle
}: AccordionProps) => {
    const [open, setOpen] = useState(false);

    const modifyAccordionClass = () => {
        let className = `${styles.accordion}`;

        if (!open) {
            className = className + " " + styles.accordionClose;
        } else {
            className = className + " " + styles.accordionOpen;
        }

        return className;
    };

    const modifyClass = () => {
        let className = `${styles.arrowDown}`;

        if (open) {
            className = styles.arrowUp;
        }

        return className;
    };

    return (
        <div className={modifyAccordionClass()}>
            <div
                className={styles.accordionHeading}
                onClick={() => setOpen(!open)}
            >
                <h4 className={styles.mainLevel}>{accordionTitle}</h4>
                <div className={`${styles.filterArrow}`}>
                    <ArrowIcon className={modifyClass()} />
                </div>
            </div>
            <div className={styles.accordionItems}>{children}</div>
        </div>
    );
};

export { Accordion };
