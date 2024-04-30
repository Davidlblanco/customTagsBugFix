import React, { ComponentType } from "react";
import { HeaderDesktop } from "./Desktop";
import { useDevice } from "vtex.device-detector";
import { MenuItemsProps } from "./Desktop/components/MenuItem/menuItem";
import { DropDownMenuProps } from "./Desktop/components/DropDownMenu";
import styles from "./styles.css";

interface HeaderProps {
    desktopImage: string;
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
                <div>mobile</div>
            ) : (
                <HeaderDesktop
                    desktopImage={desktopImage}
                    SearchBar={SearchBar}
                    WishList={WishList}
                    Login={Login}
                    Minicart={Minicart}
                    MegaMenu={MegaMenu}
                    headerItems={menuItems}
                    dropDownMenu={dropDownMenu}
                />
            )}
        </header>
    );
};

export { Header };

Header.schema = {
    title: "Custom Header",
};
