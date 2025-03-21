import React, { ComponentType, useState, useEffect } from "react";
import { MenuItem, MenuItemsProps } from "../Common/Components/MenuItem/menuItem";
import { useHeaderContext } from "../Context/headerContext";
import { ArrowLeftIcon } from "../assets/ArrowLeft";

import styles from "./styles.css";

interface FilterDateConfiguration {
    selection: "Activo" | "Programar fecha";
    startDate?: string;
    endDate?: string;
}
interface HeaderMobileProps {
    mobileImage: string;
    mobileImageEvent: string;
    logoUrl: string;
    logoUrlEvent: string;
    mobileImageDark: string;
    SearchBar: ComponentType<{ isFocus?: boolean }>;
    Minicart: ComponentType;
    MenuItems: MenuItemsProps[];
    MegaMenuMobile: ComponentType;
    filterDateConfiguration: FilterDateConfiguration
}

const HeaderMobile = ({
    mobileImage,
    mobileImageEvent,
    logoUrl,
    logoUrlEvent,
    mobileImageDark,
    SearchBar,
    Minicart,
    MegaMenuMobile,
    MenuItems,
    filterDateConfiguration
}: HeaderMobileProps) => {
    const { isDarkMode } = useHeaderContext();
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    const handleSearchBarFocus = () => {
        setIsSearchBarFocused(true);
    };

    const handleSearchBarReturn = () => {
        setIsSearchBarFocused(false);
    };

    const getBackGroundStyle = () => {
        return isDarkMode ? { backgroundColor: "#1F1F1F" } : { backgroundColor: "#a83338" };
    };

    let logoImgMobile = mobileImageEvent;
    const isWithinDateRange = (startDate, endDate) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return currentDate >= start && currentDate <= end;
    }
    if (filterDateConfiguration?.selection === "Programar fecha") {
        if (!isWithinDateRange(filterDateConfiguration.startDate, filterDateConfiguration.endDate)) {
            logoImgMobile = '';
        } else {
            logoImgMobile = mobileImageEvent;
        }
    }

    useEffect(() => {
        const fullUrl = window.location.href;
        const urlAfterCom = fullUrl.split('.com')[1] || '/'; // Si no hay nada después de .com, se usa "/"
        setCurrentUrl(urlAfterCom);
    }, []);
    let link = logoUrlEvent && (filterDateConfiguration?.selection === "Programar fecha") && isWithinDateRange(filterDateConfiguration.startDate, filterDateConfiguration.endDate) ? logoUrlEvent : logoUrl;



    return isSearchBarFocused ? (
        <div>
            <div className={styles.containerHeaderMobileFocus} style={getBackGroundStyle()}>
                <button className={styles.headerMobileReturnArrow} onClick={() => handleSearchBarReturn()}>
                    <ArrowLeftIcon />
                </button>
                <SearchBar />
            </div>
            <div className={styles.headerBottomMenuItemsMobile}>
                {MenuItems.map((item) => (
                    <MenuItem
                        key={item.href + item.text}
                        href={item.href}
                        image={item?.image}
                        text={item.text}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>
        </div>
    ) : (
        <div>
            <div className={styles.containerHeaderMobile} style={getBackGroundStyle()}>
                <div className={styles.headerMobileLeft}>
                    <MegaMenuMobile />
                    <a className={styles.headerSimanLogo} href={link == currentUrl ? '/' : link}>
                        <img
                            className={styles.headerSimanLogoImgMobile}
                            src={isDarkMode ? mobileImageDark : (logoImgMobile && (filterDateConfiguration?.selection === "Programar fecha") ? logoImgMobile : mobileImage)}

                            alt="Siman logo"
                        />
                    </a>
                </div>
                <div className={styles.headerMobileMiddle}>
                    <div className={styles.headerMobileMiddleSearch} onFocus={handleSearchBarFocus}>
                        <SearchBar />
                    </div>
                </div>

                <div className={styles.headerMobileRight}>
                    <Minicart />
                </div>
            </div>
            <div className={styles.headerBottomMenuItemsMobile}>
                {MenuItems.map((item) => (
                    <MenuItem
                        key={item.href + item.text}
                        href={item.href}
                        image={item?.image}
                        text={item.text}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>
        </div>
    );
};

export { HeaderMobile };
