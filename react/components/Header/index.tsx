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
    logoUrl: string;
    mobileImage: string;
    mobileImageDark: string;
    SearchBarAlgolia: ComponentType;
    WishList: ComponentType;
    Login: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
    MegaMenuMobile: ComponentType;
    menuItems: MenuItemsProps[];
    dropDownMenu: DropDownMenuProps;
}

const Header = ({
    desktopImage,
    logoUrl,
    mobileImage,
    mobileImageDark,
    SearchBarAlgolia,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    menuItems,
    MegaMenuMobile,
    dropDownMenu,
}: HeaderProps) => {
    const { isMobile } = useDevice();

    return (
        <HeaderContextProvider>
            <header className={styles.HeaderContainer}>
                {isMobile ? (
                    <HeaderMobile
                        mobileImage={mobileImage}
                        logoUrl={logoUrl}
                        mobileImageDark={mobileImageDark}
                        SearchBar={SearchBarAlgolia}
                        Minicart={Minicart}
                        MegaMenuMobile={MegaMenuMobile}
                    />
                ) : (
                    <HeaderDesktop
                        desktopImage={desktopImage}
                        logoUrl={logoUrl}
                        SearchBar={SearchBarAlgolia}
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
