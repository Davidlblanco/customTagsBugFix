import React, { ComponentType, useState } from "react";
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
    mobileImageDark,
    SearchBar,
    Minicart,
    MegaMenuMobile,
    MenuItems,
    filterDateConfiguration
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
    console.log('este: ' + mobileImageEvent);


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
                    <a className={styles.headerSimanLogo} href={logoUrl}>
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
