import React, { useState, useEffect } from "react";
import { CloseIcon } from "./assets/CloseIcon";
import { ThunderBlack } from "./assets/ThunderIconBlack";
import { ThunderWhite } from "./assets/ThunderIconWhite";
import { canUseDOM } from "vtex.render-runtime";
import styles from "./StickyShelf.css";

const StickyShelf: StorefrontFunctionComponent = ({ children }: any) => {
    const pathName = canUseDOM ? window.location.pathname : "";
    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setOpen(pathName === "/" ? true : false);
        setShow(pathName.includes("orderPlaced") ? false : true);
    }, [pathName]);

    if (!canUseDOM) return <></>;

    return show ? (
        <div className={styles.containerStickyShelf}>
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
                    <ThunderBlack />
                    <h3 className={styles.closeText}>ON SALE</h3>
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
                        <ThunderWhite />
                        <h3 className={styles.openText}>ON SALE</h3>
                    </div>
                    <CloseIcon
                        onClick={() => setOpen(!open)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                {children}
            </div>
        </div>
    ) : (
        <></>
    );
};

export { StickyShelf };
