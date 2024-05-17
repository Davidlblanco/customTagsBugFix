import React, { ComponentType, useState } from "react";
import { useHeaderContext } from "../Context/headerContext";
import { ArrowLeftIcon } from "../assets/ArrowLeft";
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
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

    const handleSearchBarFocus = () => {
        setIsSearchBarFocused(true);
    };

    const handleSearchBarReturn = () => {
        setIsSearchBarFocused(false);
    };

    const getBackGroundStyle = () => {
        return isDarkMode
            ? { backgroundColor: "#1F1F1F" }
            : { backgroundColor: "#a83338" };
    };

    console.log(isSearchBarFocused);

    return isSearchBarFocused ? (
        <div
            className={styles.containerHeaderMobileFocus}
            style={getBackGroundStyle()}
        >
            <button
                className={styles.headerMobileReturnArrow}
                onClick={() => handleSearchBarReturn()}
            >
                <ArrowLeftIcon />
            </button>
            <SearchBar />
        </div>
    ) : (
        <div
            className={styles.containerHeaderMobile}
            style={getBackGroundStyle()}
        >
            <div className={styles.headerMobileLeft}>
                <MegaMenu />
                <a className={styles.headerSimanLogo} href="/">
                    <img
                        className={styles.headerSimanLogoImgMobile}
                        src={isDarkMode ? mobileImageDark : mobileImage}
                        alt="Siman logo"
                    />
                </a>
            </div>
            <div className={styles.headerMobileMiddle}>
                <div
                    className={styles.headerMobileMiddleSearch}
                    onFocus={handleSearchBarFocus}
                >
                    <SearchBar />
                </div>
            </div>

            <div className={styles.headerMobileRight}>
                <Minicart />
            </div>
        </div>
    );
};

export { HeaderMobile };
