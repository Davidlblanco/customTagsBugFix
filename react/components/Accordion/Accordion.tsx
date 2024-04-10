import React, { ReactNode, useState } from "react";
import { OpenIcon } from "./Assets/Open";
import { CloseIcon } from "./Assets/Close";
import styles from "./styles.css";

interface Props {
    blockClass?: string;
    title: string;
    openIcon?: ReactNode | string;
    closeIcon?: ReactNode | string;
    children: ReactNode;
}

const Accordion = ({
    blockClass,
    title,
    openIcon = <OpenIcon />,
    closeIcon = <CloseIcon />,
    children,
}: Props) => {
    const [open, setOpen] = useState(false);

    const renderIcon = (icon: ReactNode | string) => {
        if (typeof icon === "string") {
            return <img src={icon} alt="" />;
        }
        return icon;
    };

    return (
        <div
            className={
                blockClass ? styles[blockClass] : styles["accordionContainer"]
            }
        >
            <button
                className={styles.accordionTitle}
                onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
                {open ? renderIcon(closeIcon) : renderIcon(openIcon)}
            </button>
            {open && <div className={styles.accordionChildren}>{children}</div>}
        </div>
    );
};

export { Accordion };
