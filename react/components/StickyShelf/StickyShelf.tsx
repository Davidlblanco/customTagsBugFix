import React, { useState } from "react";
import { CloseIcon } from "./svg/CloseIcon";
import styles from "./StickyShelf.css";

const StickyShelf: StorefrontFunctionComponent = ({ children }) => {
    const [open, setOpen] = useState(false);

    return open ? (
        <div className={styles.containerSticky} onClick={() => setOpen(!open)}>
            <CloseIcon />
            <CloseIcon />
        </div>
    ) : (
        <div className={styles.containerStickyShelf}>
            <div className={styles.containerHeader}>
                <CloseIcon />
            </div>
            {children}
        </div>
    );
};

export { StickyShelf };

StickyShelf.schema = {
    title: "StickyShelf"
};
