import React from "react";
import { usePageContext } from "../Context/PageContext";
import styles from "./BreadCrumb.css";

const BreadCrumb = () => {
    const { isInputPage, setPage } = usePageContext();

    return (
        <div className={styles.containerBreadCrumb}>
            <a href="/" className={styles.linkHome}>
                <img src="arquivos/house-icon-b.png" alt="" />
            </a>
            <span className={styles.arrowDivision}>&gt;</span>
            <span
                onClick={() => setPage("InputPage")}
                style={{ cursor: "pointer" }}
            >
                Orden
            </span>
            {isInputPage ? (
                <></>
            ) : (
                <>
                    <span className={styles.arrowDivision}>&gt;</span>
                    <span>Rastreo</span>
                </>
            )}
        </div>
    );
};

export { BreadCrumb };
