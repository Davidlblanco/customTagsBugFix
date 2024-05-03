import React, { ComponentType } from "react";
import { HeaderDesktop } from "./Desktop";
import { useDevice } from "vtex.device-detector";
import { MenuItemsProps } from "./Desktop/components/MenuItem/menuItem";
import { DropDownMenuProps } from "./Desktop/components/DropDownMenu";
import { HeaderMobile } from "./Mobile";
import styles from "./styles.css";

interface HeaderProps {
    desktopImage: string;
    mobileImage: string;
    SearchBar: ComponentType;
    WishList: ComponentType;
    Login: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
    menuItems: MenuItemsProps[];
    dropDownMenu: DropDownMenuProps;
}

const Header = ({
    desktopImage,
    mobileImage,
    SearchBar,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    menuItems,
    dropDownMenu,
}: HeaderProps) => {
    const { isMobile } = useDevice();

    return (
        <header className={styles.HeaderContainer}>
            {isMobile ? (
                <HeaderMobile
                    mobileImage={mobileImage}
                    SearchBar={SearchBar}
                    Minicart={Minicart}
                    MegaMenu={MegaMenu}
                />
            ) : (
                <HeaderDesktop
                    desktopImage={desktopImage}
                    SearchBar={SearchBar}
                    WishList={WishList}
                    Login={Login}
                    Minicart={Minicart}
                    MegaMenu={MegaMenu}
                    MenuItems={menuItems}
                    DropDownMenuProps={dropDownMenu}
                />
            )}
        </header>
    );
};

export { Header };

Header.schema = {
    title: "Custom Header",
};
