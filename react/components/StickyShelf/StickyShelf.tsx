import React, { useState } from "react";
import { CloseIcon } from "./assets/CloseIcon";
import { Logo } from "./assets/siman_com";
import styles from "./StickyShelf.css";

const StickyShelf: StorefrontFunctionComponent = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <div
                className={styles.containerStickyShelfClose}
                onClick={() => setOpen(!open)}
                style={
                    open
                        ? { opacity: 0, visibility: "hidden" }
                        : {
                              opacity: 1,
                              visibility: "visible"
                          }
                }
            >
                <div className={styles.containerLogo}>
                    <Logo />
                </div>
            </div>

            <div
                className={styles.containerStickyShelfOpen}
                style={
                    open
                        ? {
                              opacity: 1,
                              visibility: "visible"
                          }
                        : { opacity: 0, visibility: "hidden" }
                }
            >
                <div className={styles.containerHeader}>
                    <div className={styles.containerHeaderLogo}>
                        <Logo />
                    </div>
                    <CloseIcon
                        onClick={() => setOpen(!open)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                {children}
            </div>
        </>
    );
};

export { StickyShelf };
