import React, { ComponentType } from "react";
import styles from "./styles.css";

interface HeaderMobileProps {
    mobileImage: string;
    SearchBar: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
}

const HeaderMobile = ({
    mobileImage,
    SearchBar,
    Minicart,
    MegaMenu,
}: HeaderMobileProps) => {
    return (
        <div className={styles.containerHeaderMobile}>
            <div className={styles.headerMobileLeft}>
                <MegaMenu />
                <a className={styles.headerSimanLogo} href="/">
                    <img src={mobileImage} alt="Siman logo" />
                </a>
            </div>
            <div className={styles.headerMobileMiddle}>
                <SearchBar />
            </div>

            <div className={styles.headerMobileRight}>
                <Minicart />
            </div>
        </div>
    );
};

export { HeaderMobile };
