import React, { ComponentType } from "react";
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

interface HeaderDesktopProps {
    desktopImage: string;
    logoUrl: string;
    SearchBar: ComponentType;
    WishList: ComponentType;
    Login: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
    MenuItems: MenuItemsProps[];
    DropDownMenuProps: DropDownMenuProps;
}

const HeaderDesktop = ({
    desktopImage,
    logoUrl,
    SearchBar,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    MenuItems,
    DropDownMenuProps,
}: HeaderDesktopProps) => {
    const { isDarkMode } = useHeaderContext();

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
                    <a className={styles.headerSimanLogo} href={logoUrl}>
                        <img
                            className={styles.headerSimanLogoImg}
                            src={desktopImage}
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
