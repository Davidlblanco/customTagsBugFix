import React, { ComponentType, useEffect, useState } from "react";
import {
    MenuItem,
    MenuItemsProps,
} from "../Common/Components/MenuItem/menuItem";
import {
    DropDownMenu,
    DropDownMenuProps,
} from "../Common/Components/DropDownMenu";
import { useHeaderContext } from "../Context/headerContext";
import styles from "./styles.css";



interface FilterDateConfiguration {
    selection: "Activo" | "Programar fecha";
    startDate?: string;
    endDate?: string;
}
interface HeaderDesktopProps {
    desktopImage: string;
    desktopImageEvent: string
    logoUrl: string;
    logoUrlEvent: string;
    SearchBar: ComponentType;
    WishList: ComponentType;
    Login: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
    MenuItems: MenuItemsProps[];
    DropDownMenuProps: DropDownMenuProps;
    filterDateConfiguration: FilterDateConfiguration
}

const HeaderDesktop = ({
    desktopImage,
    desktopImageEvent,
    logoUrl,
    logoUrlEvent,
    SearchBar,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    MenuItems,
    DropDownMenuProps,
    filterDateConfiguration
}: HeaderDesktopProps) => {
    const { isDarkMode } = useHeaderContext();
    let logoImg = desktopImageEvent;

    const [currentUrl, setCurrentUrl] = useState('');

    const isWithinDateRange = (startDate, endDate) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return currentDate >= start && currentDate <= end;
    }
    if (filterDateConfiguration?.selection === "Programar fecha") {
        if (!isWithinDateRange(filterDateConfiguration.startDate, filterDateConfiguration.endDate)) {
            logoImg = ''
        } else {
            logoImg = desktopImageEvent;
        }
    }
    useEffect(() => {
        const fullUrl = window.location.href;
        const urlAfterCom = fullUrl.split('.com')[1] || '/'; // Si no hay nada después de .com, se usa "/"
        setCurrentUrl(urlAfterCom);
    }, []);


    let link = logoUrlEvent && (filterDateConfiguration?.selection === "Programar fecha") && isWithinDateRange(filterDateConfiguration.startDate, filterDateConfiguration.endDate) ? logoUrlEvent : logoUrl;




    return (
        <div className={styles.containerHeaderDesktop}>
            <div
                className={styles.headerTop}
                style={
                    isDarkMode
                        ? { backgroundColor: "#1F1F1F" }
                        : { backgroundColor: "#a83338" }
                }
            >
                <div className={styles.headerTopLeft}>
                    <a className={styles.headerSimanLogo} href={link == currentUrl ? '/' : link}>
                        <img
                            className={styles.headerSimanLogoImg}
                            src={logoImg && (filterDateConfiguration?.selection === "Programar fecha") ? logoImg : desktopImage}
                            alt="Siman logo"
                        />
                    </a>
                </div>
                <div className={styles.headerTopMiddle}>
                    <SearchBar />
                </div>
                <div className={styles.headerTopRight}>
                    <WishList />
                    <Login />
                    <Minicart />
                </div>
            </div>
            <div
                className={styles.headerBottom}
                style={
                    isDarkMode
                        ? { backgroundColor: "#4D4D4D" }
                        : { backgroundColor: "#f1f1f1" }
                }
            >
                <div className={styles.headerBottomLeft}>
                    <MegaMenu />
                    <DropDownMenu
                        menuImageDark={DropDownMenuProps.menuImageDark}
                        text={DropDownMenuProps.text}
                        menuImage={DropDownMenuProps.menuImage}
                        items={DropDownMenuProps.items}
                    />
                </div>
                <div
                    className={styles.headerBottomMiddle}
                    style={
                        isDarkMode ? { color: "#f1f1f1" } : { color: "#000000" }
                    }
                >
                    |
                </div>
                <div className={styles.headerBottomMenuItems}>
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
        </div>
    );
};

export { HeaderDesktop };
