import React, { useState } from "react";
import { CloseIcon } from "./assets/CloseIcon";
import styles from "./StickyShelf.css";

const StickyShelf: StorefrontFunctionComponent = ({ children }) => {
    const [open, setOpen] = useState(false);

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
                    <img
                        src={require("./assets/siman_com.png")}
                        alt="logo siman"
                    />
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
                        <img
                            style={{ maxWidth: "130px" }}
                            src={require("./assets/siman_com.png")}
                            alt="logo siman"
                        />
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
