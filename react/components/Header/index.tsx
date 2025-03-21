import React, { ComponentType } from "react";
import { HeaderDesktop } from "./Desktop";
import { useDevice } from "vtex.device-detector";
import { MenuItemsProps } from "./Common/Components/MenuItem/menuItem";
import { DropDownMenuProps } from "./Common/Components/DropDownMenu";
import { HeaderMobile } from "./Mobile";
import { HeaderContextProvider } from "./Context/headerContext";
import styles from "./styles.css";

interface FilterDateConfiguration {
    selection: "Activo" | "Programar fecha";
    startDate?: string;
    endDate?: string;
}
interface HeaderProps {
    desktopImage: string;
    desktopImageEvent: string;
    logoUrl: string;
    logoUrlEvent: string;
    mobileImage: string;
    mobileImageEvent: string,
    mobileImageDark: string;
    SearchBarAlgolia: ComponentType;
    WishList: ComponentType;
    Login: ComponentType;
    Minicart: ComponentType;
    MegaMenu: ComponentType;
    MegaMenuMobile: ComponentType;
    menuItems: MenuItemsProps[];
    dropDownMenu: DropDownMenuProps;
    filterDateConfiguration: FilterDateConfiguration
}

const Header = ({
    desktopImage,
    desktopImageEvent,
    logoUrl,
    logoUrlEvent,
    mobileImage,
    mobileImageEvent,
    mobileImageDark,
    SearchBarAlgolia,
    WishList,
    Login,
    Minicart,
    MegaMenu,
    menuItems,
    MegaMenuMobile,
    dropDownMenu,
    filterDateConfiguration
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
                        MenuItems={menuItems}
                        MegaMenuMobile={MegaMenuMobile}
                        mobileImageEvent={mobileImageEvent}
                        filterDateConfiguration={filterDateConfiguration}
                        logoUrlEvent={logoUrlEvent}
                    />
                ) : (
                    <HeaderDesktop
                        desktopImage={desktopImage}
                        desktopImageEvent={desktopImageEvent}
                        logoUrl={logoUrl}
                        SearchBar={SearchBarAlgolia}
                        WishList={WishList}
                        Login={Login}
                        Minicart={Minicart}
                        MegaMenu={MegaMenu}
                        MenuItems={menuItems}
                        DropDownMenuProps={dropDownMenu}
                        filterDateConfiguration={filterDateConfiguration}
                        logoUrlEvent={logoUrlEvent}

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
