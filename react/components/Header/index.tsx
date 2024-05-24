import React, { ComponentType } from "react";
import { HeaderDesktop } from "./Desktop";
import { useDevice } from "vtex.device-detector";
import { MenuItemsProps } from "./Common/Components/MenuItem/menuItem";
import { DropDownMenuProps } from "./Common/Components/DropDownMenu";
import { HeaderMobile } from "./Mobile";
import { HeaderContextProvider } from "./Context/headerContext";
import styles from "./styles.css";

interface HeaderProps {
    desktopImage: string;
    mobileImage: string;
    mobileImageDark: string;
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
    mobileImageDark,
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
        <HeaderContextProvider>
            <header className={styles.HeaderContainer}>
                {isMobile ? (
                    <HeaderMobile
                        mobileImage={mobileImage}
                        mobileImageDark={mobileImageDark}
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
        </HeaderContextProvider>
    );
};

export { Header };

Header.schema = {
    title: "Custom Header",
};
