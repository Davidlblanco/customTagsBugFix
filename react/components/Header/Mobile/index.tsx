import React, { ComponentType } from "react";
import { useHeaderContext } from "../Context/headerContext";
import styles from "./styles.css";

interface HeaderMobileProps {
    mobileImage: string;
    mobileImageDark: string;
    SearchBar: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
}

const HeaderMobile = ({
    mobileImage,
    mobileImageDark,
    SearchBar,
    Minicart,
    MegaMenu,
}: HeaderMobileProps) => {
    const { isDarkMode } = useHeaderContext();

    return (
        <div
            className={styles.containerHeaderMobile}
            style={
                isDarkMode
                    ? { backgroundColor: "#1F1F1F" }
                    : { backgroundColor: "#a83338" }
            }
        >
            <div className={styles.headerMobileLeft}>
                <MegaMenu />
                <a className={styles.headerSimanLogo} href="/">
                    <img
                        src={isDarkMode ? mobileImageDark : mobileImage}
                        alt="Siman logo"
                    />
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
